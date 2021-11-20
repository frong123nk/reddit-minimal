import React from 'react';
import { Header } from './features/header/Header';
import {Home} from './features/Home/Home'
import {Subreddit} from './features/Subreddit/Subreddit'
import './App.css';


function App() {
  return (
    <div id = 'app-container'>
      <Header/>
      <main>
        <Home/>
      </main>
      <aside>
      <Subreddit/>
      </aside>
    </div>
  );
}

export default App;
