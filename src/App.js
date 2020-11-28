import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './App.scss'

import HomeScreen from './screens/home'
import MatchesScreen from './screens/matches'
import StatsScreen from './screens/stats'
import ReportScreen from './screens/report'
import MatchScreen from './screens/match'
import PlayerScreen from './screens/player'
import TopScorersScreen from './screens/top-scorers'
import TopAssistsScreen from './screens/top-assists'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Redirect from="/" to="/home" />
        <Switch>
          <Route
            path="/home"
            component={HomeScreen}
          />
          <Route
            path="/matches"
            component={MatchesScreen}
          />
          <Route
            path="/stats"
            component={StatsScreen}
          />
          <Route
            path="/report/:id"
            component={ReportScreen}
          />
          <Route
            path="/match/:id"
            component={MatchScreen}
          />
          <Route
            path="/player/:id"
            component={PlayerScreen}
          />
          <Route
            path="/top-scorers"
            component={TopScorersScreen}
          />
          <Route
            path="/top-assists"
            component={TopAssistsScreen}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
