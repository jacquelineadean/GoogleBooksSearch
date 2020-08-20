import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Search from './pages/Search';
import Saved from './pages/Saved';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Header/>
        <Switch>
          <Route exact path={['/', '/search']}>
            <Search/>
          </Route>
          <Route exact path='/saved'>
            <Saved/>
          </Route>
          <Route>
            <Search/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
