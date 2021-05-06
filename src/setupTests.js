// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { ethers } from "ethers";

// contract functions

export const getRandomFeed = async () => {
  const infuraProvider = new ethers.providers.InfuraProvider(
    "homestead",
    "ef55027300574b6a9949149b26c16759"
  );

  const ABI = [
    "function latestAnswer() view returns (int256)",
    "function latestTimestamp() view returns (uint256)",
  ];

  const getData = await fetch("https://weiwatchers.com/feeds-mainnet.json", {
    method: "get",
  });
  if (getData.ok) {
    const feedData = await getData.json();

    let randomIdx = Math.floor(Math.random() * (feedData.length - 1));
    let specificFeed = feedData[randomIdx];
    let contract = new ethers.Contract(
      specificFeed.contractAddress,
      ABI,
      infuraProvider
    );
    let priceResponse = await contract.latestAnswer();
    let time = await contract.latestTimestamp();

    let priceString = priceResponse.toString();
    let multLength = feedData[randomIdx].multiply.length;
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

    let date = new Date(time * 1000); // multiply by 1000

    let valuePrefix = feedData[randomIdx].valuePrefix;
    let lastName = feedData[randomIdx].name.slice(
      feedData[randomIdx].name.length - 3
    );
    if (lastName === "USD") {
      valuePrefix = "$";
    } else if (lastName === "ETH") {
      valuePrefix = "Ξ";
    }

    let data = {
      id: randomIdx,
      name: feedData[randomIdx].name,
      price: price,
      threshold: feedData[randomIdx].threshold,
      heartbeat: feedData[randomIdx].heartbeat,
      lastUpdate: date,
      valuePrefix: valuePrefix,
    };
    return {
      ...data,
    };
  }
};
