import React, { useState, useEffect } from 'react'
import { LogBox, View, Text, StyleSheet, Image, TouchableHighlight, FlatList, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CardEvent2} from 'component'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import qs from 'qs';
import { useFocusEffect } from '@react-navigation/native';

let EventsCategory = ({route, navigation}) => {

  const { categoryId } = route.params;
    // {JSON.stringify(categoryId)} // haka kata9rah
    // useEffect(() => {
    //     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // }, [])
    // const [dataCategory, setDataCategory] = useState([])
    const [dataEvent, setDataEvent] = useState([])
    useFocusEffect(
      React.useCallback(() => {
        console.log("Load EventsCategory", JSON.stringify(categoryId))
        _getListEvent()
      }, [])
    );
    // useEffect(()=>{      
    //   console.log("Load MoreEventScreen", JSON.stringify(categoryId)),
    //   (async()=>{            
    //     await _getListEvent()
    //   })();
    // },[])
    
    let _getListEvent = async() => {
    Axios({
          method: 'get',
          // url: 'https://last-ticket.cste.ch/ticket_api/v1/list-events.php',
          url: 'https://lastticketforyou.ch/api.html?action=evenements&target=restfulapi&categorie='+ categoryId + '&token=' + await AsyncStorage.getItem('token'),
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

    return (
        <View style={{ flex: 1}}>
           <View style={{ }}>
                <View style={{ flexDirection: "row", marginTop: 20}}>
                    <TouchableHighlight
                    style={{position: "absolute", left: 5}}>
                        <Text style={{fontSize: 15}}>The best events</Text>
                    </TouchableHighlight>
                    {/* <TouchableHighlight
                    style={{position: "absolute", right: 5}}>
                        <Text style={{fontSize: 15}}>More</Text>
                    </TouchableHighlight> */}
                </View>
                {/* <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 25}}>
                    <TouchableHighlight
                    style={{hieght: 20, paddingHorizontal: 10, paddingVertical: 3,
                    backgroundColor: "#cccccc80",
                    borderWidth: 0.5,
                    borderRadius: 12,
                    borderColor: "white"
                    }}>
                        <Text style={{fontSize: 15, color: "black", }}>Today</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={{hieght: 20, paddingHorizontal: 10, paddingVertical: 3, borderColor: "black", 
                    backgroundColor: "#14b8c7",
                    borderWidth: 0.5,
                    borderRadius: 12,
                    borderColor: "white"
                    }}>
                        <Text style={{fontSize: 15, color: "white"}}>Tomorrow</Text>
                    </TouchableHighlight>
                   <TouchableHighlight
                    style={{hieght: 20, paddingHorizontal: 10, paddingVertical: 3, borderColor: "black", 
                    backgroundColor: "#13eafe",
                    borderWidth: 0.5,
                    borderRadius: 12,
                    borderColor: "white"
                    }}>
                        <Text style={{fontSize: 15, color: "black"}}>this Week</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={{hieght: 20, paddingHorizontal: 10, paddingVertical: 3, borderColor: "black", 
                    backgroundColor: "#0a3ea0",
                    borderWidth: 0.5,
                    borderRadius: 12,
                    }}>
                        <Text style={{fontSize: 15, color: "white"}}>this Month</Text>
                    </TouchableHighlight>
                </View> */}
                <View style={{ hieght: 20, marginTop: 25 }}>
                    <FlatList
                        data={dataEvent}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <CardEvent2 item={item} />}
                        showsHorizontalScrollIndicator={false}
                            
                        // ListFooterComponent={()=>{ 
                        //     return (
                        //         <View><Text>ListHeaderComponent</Text></View>)
                        //     } }
                        // stickyHeaderIndices={[0]} 
                    />
                </View>
           </View>           
        </View>
    );
}

export { EventsCategory }

const styles = StyleSheet.create({

})