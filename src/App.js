import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './components/Homepage/HomePage';
import { FeedPage } from './components/Feedpage/FeedPage';

function App() {
  const [feed, setFeed] = useState([]);
  const [feedObj, setFeedObj] = useState({});

  useEffect(() => {
    // mape API call to retrieve feed data
  })

  if (feed.length === 0) return;
  return (
    <BrowserRouter>
      <Route path="/" exact={true}>
        <HomePage feed={feed} />
      </Route>
      <Route path="/:id" exact={true}>
        <FeedPage feedObj={feedObj} />
      </Route>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
