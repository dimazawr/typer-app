import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chat from './components/Chat';
import JoinRoom from "./components/JoinRoom";
import { useSelector } from 'react-redux';


function App() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
  return (

        <Switch>
            <Route exact path="/chat">
                {!isLoggedIn ? <Redirect to={"/"} /> : <Chat />}
            </Route>
            <Route exact path="/">
                <JoinRoom />
            </Route>
            <Redirect to="/" />
        </Switch>


  );
}

export default App;
