import React, { useState, useEffect } from 'react';
import { FeedBox } from './FeedBox';

export function HomePage({feed}) {
    // const [feeds, setFeeds] = useState([]);

    // useEffect(() => {
    //     // get feeds
    // })
    return (<>
        <div className="homepage_container">
            <div className="homepage_title">
                Price Feeds
            </div>
            <div className="homepage_feed_container">
                {feed.map((info) => {
                    <FeedBox info={info} />
                })}
            </div>
        </div>
    </>)
}
