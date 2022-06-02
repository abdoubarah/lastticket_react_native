import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, FlatList, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from 'config'
import {CardEvent, CardCategory} from 'component'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import qs from 'qs';
import { useFocusEffect } from '@react-navigation/native';

let Home = ({navigation}) => {
    const [dataCategory, setDataCategory] = useState([])
    const [dataEvent, setDataEvent] = useState([])
    useFocusEffect(
        React.useCallback(() => {        
        console.log("Load HomeScreen"),
            _getListEvent()
            _getListCategory()
        }, [])
    );
    // useEffect(()=>{      
    //   console.log("Load HomeScreen"),
    //   (async()=>{            
    //     await _getListEvent()
    //     await _getListCategory()
    //   })();
    // },[])
    useEffect(()=>{
      (async()=>{
         const user = await AsyncStorage.getItem('user');
         console.log("HOmeuser", JSON.parse(user))
         const token = await AsyncStorage.getItem('token');
         console.log("Hometoken", token)
      })();    
    },[])

    let _getListEvent = async() => {
    Axios({
          method: 'get',
          // url: 'https://last-ticket.cste.ch/ticket_api/v1/list-events.php',
          url: 'https://lastticketforyou.ch/api.html?action=evenements&target=restfulapi&limit=20&token='+ await AsyncStorage.getItem('token'),
          // data: qs.stringify({
          //   'action': "evenements",
          //   'target': "restfulapi",
          //   'limit': "2",
          // }),
          headers: {
              'Accept': await AsyncStorage.getItem('token'),
          }
      }).then(async (response) => {                
          // console.log("response Event",response.data)
          setDataEvent(response.data)
          
      }).catch(err => {
          console.log("########### err signin ", err, err.response)

      })
    }

    let _getListCategory = async() => {
    Axios({
          method: 'get',
        //   url: 'https://last-ticket.cste.ch/ticket_api/v1/list-categories.php',
          url: 'https://lastticketforyou.ch/api.html?action=categories&target=restfulapi',
          // data: qs.stringify({
          //     'limit': "20",
          // }),
          headers: {
              'Accept': await AsyncStorage.getItem('token'),
          }
      }).then(async (response) => {                
          // console.log("response Category",response.data)
          setDataCategory(response.data)
          
      }).catch(err => {
          console.log("########### err signin ", err, err.response)

      })
    }
    return (
        <View style={{ flex: 1}}>
        <ScrollView>
           <View style={{ }}>
                <View style={{ flexDirection: "row", marginTop: 20}}>
                    <TouchableHighlight
                    style={{position: "absolute", left: 5}}>
                        <Text style={{fontSize: 15}}>Upcoming events</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    onPress={()=>{
                      navigation.navigate("MoreEvent")
                    }}
                    style={{position: "absolute", right: 5}}>
                        <Text style={{fontSize: 15}}>More</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ hieght: 20, marginTop: 30 }}>
                    <FlatList
                        data={dataEvent}
                        keyExtractor={(item, index) => {
                          return item.id;
                        }}
                        renderItem={({ item }) => <CardEvent item={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
           </View>
           <View style={{ }}>
                <View style={{ flexDirection: "row", marginTop: 20}}>
                    <TouchableHighlight
                    style={{position: "absolute", left: 5}}>
                        <Text style={{fontSize: 15}}>Categories</Text>
                    </TouchableHighlight>
                </View>

                <View style={{ 
                    hieght: 20, margin: 0, padding: 0, marginTop: 30, 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    }}>
                    {
                    //dataCategory &&
                        dataCategory.map((item, index)=>{
                            return (
                                <CardCategory key={index} item={item} />
                            )
                        })
                    }
                </View>
           </View>
           
           </ScrollView>
        </View>
    );
}

export { Home }

const styles = StyleSheet.create({

})