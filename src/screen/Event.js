import React, { useState, useEffect } from 'react'
import { LogBox, View, Text, StyleSheet, Image, TouchableHighlight, FlatList, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CardEvent2} from 'component'



const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'AKINA MCKENZIE',
    month: 'Oct',
    day: '31',
    hour: '18:00',
    location: 'Granges',
    km: '2280 Km',
    price: '30$',
    image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-18556013.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Concert live Billy Aydan',
    month: 'Jan',
    day: '03',
    hour: '18:00',
    location: 'Sion',
    km: '2589 Km',
    price: '30$',
    image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1357597942.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'La Dèr',
    month: 'Oct',
    day: '18',
    hour: '18:00',
    location: 'Bulle',
    km: '2115 Km',
    price: '30$',
    image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1714563308.jpg',
  },{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab968b8',
    title: 'AKINA MCKENZIE',
    month: 'Oct',
    day: '18',
    hour: '21:45',
    location: 'Granges',
    km: '2280 Km',
    price: '30$',
    image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-18556013.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa95699',
    title: 'Concert live Billy Aydan',
    month: 'Oct',
    day: '18',
    hour: '20:30',
    location: 'Sion',
    km: '2589 Km',
    price: '30$',
    image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1357597942.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571154d75',
    title: 'La Dèr',
    month: 'Oct',
    day: '18',
    hour: '19:00',
    location: 'Bulle',
    km: '2115 Km',
    price: '30$',
    image: 'https://lastticketforyou.ch/files_perso/evenements/evenement-1714563308.jpg',
  },
];

let Event = ({navigation}) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    return (
        <View style={{ flex: 1}}>
        {/* <ScrollView > */}
           <View style={{ }}>
                
                <View style={{ hieght: 20, marginTop: 10 }}>
                    <FlatList
                        data={DATA}
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
           {/* </ScrollView> */}
        </View>
    );
}

export { Event }

const styles = StyleSheet.create({

})