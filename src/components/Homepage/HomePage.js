import React from "react";
import { FeedBox } from "./FeedBox";

import "../../styles/homepage.css";

export function HomePage({ feed }) {
  return (
    <>
      <div className="homepage_container">
        <div className="homepage_title">Price Feeds</div>
        <div className="homepage_feed_container">
          <div className="feed_grid">
            {feed.map((info) => {
              return (
                <>
                  <FeedBox info={info} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
