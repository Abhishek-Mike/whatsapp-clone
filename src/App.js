import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Login from './Login';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);
  
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
                  <h1>Testing Home screen</h1>
                  <Chat />
                </Route>
            </Switch>
          </Router>                
        </div>
      )}
      </div> 
  );
}

export default App;
