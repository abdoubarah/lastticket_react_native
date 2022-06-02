import React, {useEffect} from 'react';
import {NavigationContainer , CommonActions } from '@react-navigation/native';
import {Image, View,Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import { 
  Home, 
  Setting, 
  Favorite, 
  Profile,
  SplashScreen,
  Event,
  Signin,
  Signup,
  MoreEvent,
  EventDetail,
  Maps,
  EventsCategory,
  ChangePassword,
  } from 'screen';
  // import Maps from '../screen/Maps'

const HomeStack = createStackNavigator();
const TabBar = createBottomTabNavigator();

const HomeStackScreen = ({navigation, route}) => {
 
  return (
      <>    
        <TabBar.Navigator
            initialRouteName="Home"
            tabBarOptions={{
            showIcon: true,
            style: styles.navigator,
            tabStyle: {
                backgroundColor: "white"
            },
            activeTintColor: "#e86c60",
            inactiveTintColor: "gray"
            }}>
            <TabBar.Screen name="Home" component={Home} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={25} />
                ),
                
            }}/>
            {/* <TabBar.Screen name="Event" component={Event}
            options={{
                tabBarLabel: 'Event',
                tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="event" color={color} size={25} />
                ),
            }}/>  */}
            <TabBar.Screen name="Maps" component={Maps}
            // listeners={{
            //   tabPress: e => {
            //     // Prevent default action
            //     e.preventDefault();
            //   },
            // }}
            options={{
                tabBarLabel: 'Maps',
                tabBarIcon: ({ color, size }) => (
                <Foundation name="map" color={color} size={25} />
                ),
            }}/> 
            <TabBar.Screen name="Favorite" component={Favorite}
            options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="favorite" color={color} size={25} />
                ),
            }}/> 
            <TabBar.Screen name="Setting" component={Setting}
            options={{
                tabBarLabel: 'Setting',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={25} />
                ),
            }}/> 
        </TabBar.Navigator>
      </>

  );
};

const AppNavigation  = ()=>{
  
   return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="SplashScreen">
        <HomeStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="Home"
          component={HomeStackScreen}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="MoreEvent"
          component={MoreEvent}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="Event"
          component={Event}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="EventsCategory"
          component={EventsCategory}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <HomeStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false, tabBarVisible: false}}
        />
      </HomeStack.Navigator>
    </NavigationContainer>

  );
}

export {
  AppNavigation
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34
  }
});