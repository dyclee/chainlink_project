import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";

import App from "./App";
import { HomePage } from "./components/Homepage/HomePage";
import { FeedPage } from "./components/Feedpage/FeedPage";
import { FeedBox } from "./components/Homepage/FeedBox";

import { getRandomFeed } from "./setupTests";

describe("Home page", () => {
  test("renders HomePage component", () => {
    render(<HomePage feed={[]} />);
    const priceFeeds = screen.getByText("Price Feeds");
    expect(priceFeeds).toBeInTheDocument();
  });

  test("renders FeedBox component with correct data inputs", async () => {
    const testFeed = await getRandomFeed();

    render(
      <BrowserRouter>
        <FeedBox info={testFeed} />
      </BrowserRouter>
    );
    expect(await screen.findByText(`${testFeed.name}`)).toBeInTheDocument();
    expect(
      await screen.findByText(`${testFeed.valuePrefix} ${testFeed.price}`)
    ).toBeInTheDocument();
  });
});

describe("Feed page", () => {
  test("renders FeedPage component with correct data inputs", async () => {
    const testFeed = await getRandomFeed();
    const testObj = {};
    testObj[testFeed.id] = testFeed;

    render(
      <MemoryRouter initialEntries={[`/feed/${testFeed.id}`]}>
        <Route path={`/feed/:id`} exact={true}>
          <FeedPage feedObj={testObj} />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText("Heartbeat")).toBeInTheDocument();
    expect(screen.getByText("Threshold")).toBeInTheDocument();
    expect(screen.getByText("Last update")).toBeInTheDocument();
    expect(screen.getByText("Latest answer")).toBeInTheDocument();
    expect(screen.getByText(testFeed.name)).toBeInTheDocument();
    expect(screen.getByText(testFeed.threshold)).toBeInTheDocument();
    expect(
      screen.getByText(testFeed.lastUpdate.toDateString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(testFeed.lastUpdate.toLocaleTimeString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${testFeed.valuePrefix} ${testFeed.price}`)
    ).toBeInTheDocument();
  });
});

describe("Loading page", () => {
  test("renders LoadingPage component", () => {
    render(<App />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
