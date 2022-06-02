
import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { 
  Home, 
  Setting, 
  Favorite, 
  Profile
  } from 'screen';
  import { 
  AppNavigation
  } from 'navigation';

function App() {
  return (
    <View style={{flex : 1}}>
      <AppNavigation/>
    </View>
  );
}

export default App;