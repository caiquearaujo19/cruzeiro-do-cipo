import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './App.scss'

import HomeScreen from './pages/home'
import MatchesScreen from './pages/matches'
import StatsScreen from './pages/stats'
import MatchScreen from './pages/match'
import PlayerScreen from './pages/player'
import TopScorersScreen from './pages/top-scorers'
import TopAssistsScreen from './pages/top-assists'
import MostMatchesScreen from './pages/most-matches'
import TopGoalkeepersScreen from './pages/top-goalkeepers'
import RegisterScreen from './pages/register'
import RegisterNextMatch from './pages/register/register-next-match'
import RegisterPlayer from './pages/register/register-player'

function App() {

  const routes = [
    {path: "/home", component: HomeScreen},
    {path: "/matches", component: MatchesScreen},
    {path: "/stats", component: StatsScreen},
    {path: "/match/:id", component: MatchScreen},
    {path: "/player/:id", component: PlayerScreen},
    {path: "/top-scorers", component: TopScorersScreen},
    {path: "/top-assists", component: TopAssistsScreen},
    {path: "/most-matches", component: MostMatchesScreen},
    {path: "/goalkeepers", component: TopGoalkeepersScreen},
    {path: "/register", component: RegisterScreen},
    {path: "/r/next-match", component: RegisterNextMatch},
    {path: "/r/player", component: RegisterPlayer},
  ]

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home"/>}
          />
          {
            routes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            )
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
