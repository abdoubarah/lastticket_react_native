import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView , FlatList, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import {CardEvent2} from 'component'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import qs from 'qs';
import { useFocusEffect } from '@react-navigation/native';

let Favorite = ({navigation}) => {
    const [dataEvent, setDataEvent] = useState([])
    
    useFocusEffect(
        React.useCallback(() => {
        // alert('Screen was focused');
        
         _getListEvent()
        // Do something when the screen is focused
        // return () => {
        //     alert('Screen was unfocused');
        //     // Do something when the screen is unfocused
        //     // Useful for cleanup functions
        // };
        }, [])
    );
    
    
    let _getListEvent = async() => {
    Axios({
          method: 'get',
          // url: 'https://last-ticket.cste.ch/ticket_api/v1/list-events.php',
          url: 'https://lastticketforyou.ch/api.html?target=restfulapi&action=liste_favoris&token='+ await AsyncStorage.getItem('token'),
        //   data: qs.stringify({
        //     'token': await AsyncStorage.getItem('token'),
        //   }),
          headers: {
              'Accept': await AsyncStorage.getItem('token'),
          }
      }).then(async (response) => {                
          // console.log("response Event",response.data)
          setDataEvent(response.data)
          
      }).catch(err => {
          console.log("########### err Favorite ", err, err.response)

      })
    }

    return (
        // <View style={{ flex: 1}}>
        <ScrollView>

           <View style={{ }}>
                <View style={{ flexDirection: "row", marginTop: 20}}>
                    <TouchableHighlight
                    style={{position: "absolute", left: 5}}>
                        <Text style={{fontSize: 15}}>The best events</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flex:1, hieght: 20, marginTop: 25 }}>
                    <FlatList
                        // LisHeaderComponent={<></>}
                        data={dataEvent}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <CardEvent2 item={item} />}
                        showsHorizontalScrollIndicator={false}                  
                    />
                </View>
           </View>  
        </ScrollView>  
        // </View>
    );
}

export { Favorite }

const styles = StyleSheet.create({

})