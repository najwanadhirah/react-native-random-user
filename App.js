import React, { Component } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import login from './src/login';
import dashboard from './src/dashboard';
import friends from './src/friends';
import friendProfile from './src/friendProfile';

export default class App extends Component {
  render() {
    return (
      <Router>

        <Scene key="root" headerTintColor="#FFF" navigationBarStyle={{ backgroundColor: "#212121", }} titleStyle={{ color: "#FFF", fontSize: 16 }}>
       
          <Scene
            key="login"
            component={login}
            hideNavBar={true}
            initial={true}
          />

          <Scene
            key="dashboard"
            component={dashboard}
            hideNavBar={true}
          />
          
        <Scene
            key="friends"
            component={friends}
            hideNavBar={true}
          />

        <Scene
            key="friendProfile"
            component={friendProfile}
            hideNavBar={true}
          />

        </Scene>
      </Router>

);
}
}