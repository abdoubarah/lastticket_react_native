import React, { useEffect } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { NavigationService } from 'navigation'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import qs from "qs";

let SplashScreen = ({navigation}) => {
    useEffect(()=>{
        setTimeout(()=>{ 
            // navigation.navigate('Home', {screen: 'Signin'}); 
            // navigation.dispatch(StackActions.replace('Signin')); 
            navigation.replace('Signin');
            // navigation.replace('Profile');
        }, 1000);
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../images/logo.png")} style={{width: 300, height: 80 }} />
            </View>
            <View
                style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '85%',
                    marginBottom: 30

                }}>
                {/* <View style={{

                    alignItems: 'flex-start',
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Corbel',
                        // textAlign: 'center',
                        marginBottom: 8
                    }}>Powered by </Text>
                </View>
                <View
                    style={{
                        //  width: 250, height: 200, backgroundColor: 'red',
                        alignItems: 'center'
                    }}>
                    <Image
                        source={require("../images/logo-AZ-performence.png")}
                        style={{ width: 120, height: 33, }}
                    />
                </View> */}
            </View>
        </View>
    )
}

export { SplashScreen }