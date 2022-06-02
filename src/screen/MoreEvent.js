import React, { useState, useEffect } from 'react'
import { LogBox, View, Text, StyleSheet, Image, TouchableHighlight, FlatList, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CardEvent2} from 'component'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import qs from 'qs';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'AKINA MCKENZIE',
//     month: 'Oct',
//     day: '31',
//     hour: '18:00',
//     location: 'Granges',
//     km: '2280 Km',
//     price: '30$',
//     image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-18556013.jpg',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Concert live Billy Aydan',
//     month: 'Jan',
//     day: '03',
//     hour: '18:00',
//     location: 'Sion',
//     km: '2589 Km',
//     price: '30$',
//     image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1357597942.jpg',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'La Dèr',
//     month: 'Oct',
//     day: '18',
//     hour: '18:00',
//     location: 'Bulle',
//     km: '2115 Km',
//     price: '30$',
//     image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1714563308.jpg',
//   },{
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab968b8',
//     title: 'AKINA MCKENZIE',
//     month: 'Oct',
//     day: '18',
//     hour: '21:45',
//     location: 'Granges',
//     km: '2280 Km',
//     price: '30$',
//     image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-18556013.jpg',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa95699',
//     title: 'Concert live Billy Aydan',
//     month: 'Oct',
//     day: '18',
//     hour: '20:30',
//     location: 'Sion',
//     km: '2589 Km',
//     price: '30$',
//     image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1357597942.jpg',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571154d75',
//     title: 'La Dèr',
//     month: 'Oct',
//     day: '18',
//     hour: '19:00',
//     location: 'Bulle',
//     km: '2115 Km',
//     price: '30$',
//     image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1714563308.jpg',
//   },
// ];

let MoreEvent = ({navigation}) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    // const [dataCategory, setDataCategory] = useState([])
    const [dataEvent, setDataEvent] = useState([])

    useEffect(()=>{      
      console.log("Load MoreEventScreen"),
      (async()=>{            
        await _getListEvent()
      })();
    },[])
    
    let _getListEvent = async() => {
    Axios({
          method: 'get',
          // url: 'https://last-ticket.cste.ch/ticket_api/v1/list-events.php',
          url: 'https://lastticketforyou.ch/api.html?action=evenements&target=restfulapi&limit=2',
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

export { MoreEvent }

const styles = StyleSheet.create({

})