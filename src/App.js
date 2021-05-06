import "./styles/App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { HomePage } from "./components/Homepage/HomePage";
import { FeedPage } from "./components/Feedpage/FeedPage";
import LoadingPage from "./components/Loadingpage/LoadingPage";

import { ethers } from "ethers";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [feed, setFeed] = useState([]);
  const [feedObj, setFeedObj] = useState({});

  // contract functions
  const infuraProvider = new ethers.providers.InfuraProvider(
    "homestead",
    "ef55027300574b6a9949149b26c16759"
  );

  const ABI = [
    "function latestAnswer() view returns (int256)",
    "function latestTimestamp() view returns (uint256)",
  ];

  useEffect(() => {
    // make API call to retrieve feed data
    (async () => {
      const getData = await fetch(
        "https://weiwatchers.com/feeds-mainnet.json",
        {
          method: "get",
        }
      );
      if (getData.ok) {
        const feedData = await getData.json();
        let pricePromises = [];
        let timePromises = [];
        let homeFeeds = [];
        let feeds = {};

        for (let i = 0; i < feedData.length; i++) {
          let specificFeed = feedData[i];
          let contract = new ethers.Contract(
            specificFeed.contractAddress,
            ABI,
            infuraProvider
          );
          pricePromises.push(contract.latestAnswer());
          timePromises.push(contract.latestTimestamp());
        }
        let prices = await Promise.all(pricePromises);
        let times = await Promise.all(timePromises);

        for (let i = 0; i < prices.length; i++) {
          let priceString = prices[i].toString();
          let multLength = feedData[i].multiply.length;
          if (priceString.length <= multLength - 1) {
            while (priceString.length < multLength - 1) {
              priceString = "0" + priceString;
            }
            priceString = "." + priceString;
          } else {
            let decimalSpot = priceString.length - (multLength - 1);
            priceString =
              priceString.slice(0, decimalSpot) +
              "." +
              priceString.slice(decimalSpot);
          }

          let price;
          let float = parseFloat(priceString);
          if (float < 1) {
            price = parseFloat(priceString).toFixed(6);
          } else if (float < 100) {
            price = parseFloat(priceString).toFixed(4);
          } else {
            price = parseFloat(priceString).toFixed(2);
          }

          let date = new Date(times[i] * 1000); // multiply by 1000

          let valuePrefix = feedData[i].valuePrefix;
          let lastName = feedData[i].name.slice(feedData[i].name.length - 3);
          if (lastName === "USD") {
            valuePrefix = "$";
          } else if (lastName === "ETH") {
            valuePrefix = "Ξ";
          }

          let data = {
            id: i,
            name: feedData[i].name,
            price: price,
            threshold: feedData[i].threshold,
            heartbeat: feedData[i].heartbeat,
            lastUpdate: date,
            valuePrefix: valuePrefix,
          };
          feeds[i] = data;
          homeFeeds.push(data);
        }
        console.log(homeFeeds);
        setFeed(homeFeeds);
        setFeedObj(feeds);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return <LoadingPage />;

  return (
    <BrowserRouter>
      <Route path="/" exact={true}>
        <HomePage feed={feed} />
      </Route>
      <Route path="/feed/:id" exact={true}>
        <FeedPage feedObj={feedObj} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
