import './styles/App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './components/Homepage/HomePage';
import { FeedPage } from './components/Feedpage/FeedPage';

import { ethers } from 'ethers';


function App() {
  const [feed, setFeed] = useState([]);
  const [feedObj, setFeedObj] = useState({});

  // contract functions
  const infuraProvider = new ethers.providers.InfuraProvider("homestead", "ef55027300574b6a9949149b26c16759");

  const ABI = [
    'function latestAnswer() view returns (int256)',
    'function latestTimestamp() view returns (uint256)',
  ]



  useEffect(() => {
    // make API call to retrieve feed data
    (async() => {
      const getData = await fetch("https://weiwatchers.com/feeds-mainnet.json", {
        method: "get",
      })
      if (getData.ok) {
        const feedData = await getData.json();

        let arr = [];
        let obj = {};

        // for (let i = 0; i < feedData.length; i++) {
        for (let i = 0; i < 25; i++) {
          let specificFeed = feedData[i];

          let contract = new ethers.Contract(specificFeed.contractAddress, ABI, infuraProvider);
          let value = await contract.latestAnswer();
          let str = value.toString();
          let multLength = specificFeed.multiply.length;
          if (str.length <= multLength - 1) {
            while (str.length < multLength - 1) {
              str = "0" + str;
            }
            str = "." + str;
          } else {
            let decimalSpot = str.length - (multLength - 1);
            str = str.slice(0, decimalSpot) + "." + str.slice(decimalSpot);
          }

          let price;
          let float = parseFloat(str);
          if (float < 1) {
            price = parseFloat(str).toFixed(6);
          } else if (float < 100) {
            price = parseFloat(str).toFixed(4);
          } else {
            price = parseFloat(str).toFixed(2);
          }

          let timestamp = await contract.latestTimestamp() * 1000;
          let date = new Date(timestamp);

          let valuePrefix = specificFeed.valuePrefix;
          let lastName = specificFeed.name.slice(specificFeed.name.length - 3)
          if (lastName === "USD") {
            valuePrefix = "$"
          } else if (lastName === "ETH") {
            valuePrefix = "Ξ"
          }

          let dataObj = {
            "id": i,
            "name": specificFeed.name,
            "price": price,
            "threshold": specificFeed.threshold,
            "heartbeat": specificFeed.heartbeat,
            "lastUpdate": date,
            "valuePrefix": valuePrefix,
          }
          obj[i] = dataObj;
          arr.push(dataObj);
        }
        setFeed(arr);
        setFeedObj(obj);
      }
    })()
  }, []);
  if (feed.length === 0) return null;

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
