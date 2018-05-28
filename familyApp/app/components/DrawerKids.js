
import React from 'react';

import { View, StyleSheet,Text,Image } from 'react-native';

import { createDrawerNavigator } from 'react-navigation'

import Tasks from './Tasks';
import UserInfo from './UserInfo';
//import Bar from './Bar';

import Shortage from './Shortage';
import TasksDisplay from './TasksDisplay';
import ShortageNote from './ShortageNote'
import Login from './Login';

const KidsDrawer=createDrawerNavigator(
  {
    TasksDisplay:{
      screen:TasksDisplay,
    },
    // Tasks:{
    //  screen:Tasks,
    // },
    // 'User Information':{
    //  screen:UserInfo,
    // },
    Shortage:{
     screen:Shortage,
    },
     Logout:{
      screen:Login,
    },
    
    // ShortageNote:{
    //   screen:ShortageNote,
    // }
  },
  {
    initialRouteName:'TasksDisplay',
    drawerPosition:'left',
    drawerWidth:200,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions:{
    activeTintColor:'green',
     
    },
  }
);

export default class DrawerKids extends React.Component{

  static router = KidsDrawer.router;
  
  render() {
    return (
      <View style={styles.allPage}>
      
        <KidsDrawer navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom:25,
  },
});
