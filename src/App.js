import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Login from './Login';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useStateValue } from './StateProvider';


function App() {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    //BEM naming convention
    <div className="App">
      {!user ? (
        <Login />
      ): (
        <div className="app__body">
          <Router>
            <Switch>
                <Route path="/rooms/:roomId">
                  <Sidebar />           {/* Sidebar Component*/}    
                  <Chat />              {/* Chat Component*/}
                </Route>
                <Route path="/">
                </Route>
            </Switch>
          </Router>                
        </div>
      )}
      </div> 
  );
}

export default App;
