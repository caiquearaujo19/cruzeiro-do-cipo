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
import TopGoalkeepersScreen from './screens/top-goalkeepers'
import RegisterScreen from './screens/register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home"/>}
          />

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
          <Route
            path="/goalkeepers"
            component={TopGoalkeepersScreen}
          />
          <Route
            path="/register"
            component={RegisterScreen}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
