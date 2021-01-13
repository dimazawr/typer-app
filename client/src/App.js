import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chat from './components/Chat';
import { JoinChat } from "./components/JoinChat";
import { useSelector } from 'react-redux';


function App() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
  return (

        <Switch>
            <Route exact path="/chat">
                {!isLoggedIn ? <Redirect to={"/"} /> : <Chat />}
            </Route>
            <Route exact path="/">
                <JoinChat />
            </Route>
            <Redirect to="/" />
        </Switch>


  );
}

export default App;
