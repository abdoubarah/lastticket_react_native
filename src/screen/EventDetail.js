import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { CardEvent2 } from 'component';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import qs from 'qs';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.height / 5) * 2);
const detailHeight = Math.round((dimensions.height / 5) * 3);
const screenWidth = dimensions.width;
var DATAEvent 
const URLImage = 'https://lastticketforyou.ch/files_perso/evenements/'

let EventDetail = ({ route, navigation }) => {
  
  const { eventId } = route.params;
  
 const [dataEvent, setDataEvent] = useState();
 const [eventTitle, setEventTitle] = useState();
 const [eventCity, setEventCity] = useState();
 const [eventKm, setEventKm] = useState();
 const [eventDay, setEventDay] = useState();
 const [eventMonth, setEventMonth] = useState();
 const [eventLocation, setEventLocation] = useState();
 const [eventDateStart, setEventDateStart] = useState();
 const [eventDateEnd, setEventDateEnd] = useState();
 const [eventPrice, setEventPrice] = useState();
 const [eventDescription, setEventDescription] = useState();
 const [eventTimeStart, setEventTimeStart] = useState();
 const [eventTimeEnd, setEventTimeEnd] = useState();
 const [eventImage, setEventImage] = useState();
 const [loading, setLoading] = useState(false);

    useEffect(()=>{      
      console.log("eventId", eventId),
      (async()=>{            
        await _getEvent()
      })();
    },[])
  useEffect(() => {
    setDataEvent(DATAEvent)
    console.log("dataEvent",dataEvent)
  }, [DATAEvent]);

  let _getEvent = async() => {
    Axios({
          method: 'get',
          // url: 'https://last-ticket.cste.ch/ticket_api/v1/list-events.php',
          url: 'https://lastticketforyou.ch/api.html?action=evenements&target=restfulapi&id_evenement='+ eventId,
          // data: qs.stringify({
          //   'action': "evenements",
          //   'target': "restfulapi",
          //   'limit': "2",
          // }),
          headers: {
              'Accept': await AsyncStorage.getItem('token'),
          }
      }).then(async (response) => {                
          console.log("response Event",response.data[0])
          // console.log("response Event",response.data.alias)
          setDataEvent(response.data[0].titre)
          setEventTitle(response.data[0].titre)
          setEventCity(response.data[0].nom_ville)
          setEventLocation(response.data[0].localisation)
          setEventDay(response.data[0].jour)
          setEventMonth(response.data[0].mois)
          setEventKm(response.data[0].localisation)
          setEventPrice(response.data[0].prix)
          setEventDateStart(response.data[0].date_debut)
          setEventDateEnd(response.data[0].date_fin)
          setEventTimeStart(response.data[0].heure_debut)
          setEventTimeEnd(response.data[0].heure_fin)
          setEventDescription(response.data[0].description)
          setEventImage(response.data[0].image)
          // DATAEvent = response.data[0]
          // setLoading(!loading)
          
      }).catch(err => {
          console.log("########### err signin ", err, err.response)

      })
    }
  return (
    <View style={{flex:1}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#cccccc',
            width: screenWidth,
            height: imageHeight,
          }}>
          <Image
            style={{
              position: 'absolute',
              height: imageHeight,
              width: screenWidth,
              zIndex: -2,
            }}
            source={{
              uri:
                URLImage +eventImage,
            }}
            resizeMode="cover"
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#00000052',
              width: screenWidth,
              height: imageHeight / 3,
              position: 'absolute',
              bottom: 1,
            }}>
            <Text
              style={{
                // marginTop: 15,
                // marginBottom: 15,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                // textAlign: 'center',
                position: 'absolute',
                left: 10,
                maxWidth: screenWidth - 90,
                // backgroundColor: "red"
              }}>
              {eventTitle} 
            </Text>
            <View style={{ marginTop: 25, marginLeft: 5, flex: 1 }}>
              <View style={styles.blockIcon}>
                <FontAwesome name="location-arrow" color={'white'} size={20} />
                <Text style={{ marginLeft: 5, fontSize: 16, color: 'white' }}>
                  {eventCity}
                </Text>
              </View>
              <View style={styles.blockIcon}>
                <Ionicons name="location-outline" color={'white'} size={20} />
                <Text style={{ marginLeft: 5, fontSize: 16, color: 'white' }}>
                  {eventLocation} km
                </Text>
              </View>
            </View>
            <View
              style={{
                marginRight: 5,
                backgroundColor: '#fcc40b',
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 65,
                borderRadius: 12,
              }}>
              <Text style={{ fontSize: 35, color: 'white' }}>{eventDay}</Text>
              <Text style={{ fontSize: 20, color: 'white', bottom: 2 }}>
                {eventMonth}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            // marginBottom: 15,
            bottom: 20,
            height: detailHeight + 20,
            // borderRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginBottom: 20,
          }}>
            <View style={{ marginTop: 25, marginLeft: 5 }}>
              <View style={styles.blockIcon2}>
                <Fontisto name="date" color={'black'} size={20} />
                <Text style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>
                  {eventDateStart}
                </Text>
              </View>
              <View style={styles.blockIcon2}>
                <Fontisto name="date" color={'black'} size={20} />
                <Text style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>
                  {eventDateEnd}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.blockIcon2}>
                  <AntDesign name="clockcircleo" color={'black'} size={20} />
                  <Text style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>
                    {eventTimeStart}
                  </Text>
                </View>
                <View style={styles.blockIcon2}>
                  <AntDesign
                    style={{ marginLeft: 10 }}
                    name="clockcircleo"
                    color={'black'}
                    size={20}
                  />
                  <Text style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>
                    {eventTimeEnd}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.blockIcon2}>
                        <Ionicons name="location-outline" color={"black"} size={22} />
                        <Text style={{marginLeft: 5, fontSize: 16, color: "black"}}>25638 km</Text>
                    </View>
                    <View style={styles.blockIcon2}>
                        <Ionicons name="location-outline" color={"black"} size={22} />
                        <Text style={{marginLeft: 5, fontSize: 16, color: "black"}}>25638 km</Text>
                    </View> */}
              <View style={styles.blockIcon2}>
                {/* <FontAwesome name="dollar" color={'black'} size={20} /> */}
                <Text style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>
                  {eventPrice} CHF
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10, padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Desxription :{' '}
              </Text>
              <Text>
                {eventDescription}
              </Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { EventDetail };

const styles = StyleSheet.create({
  blockIcon: {
    flexDirection: 'row',
    left: 0,
    // marginTop: 3,
    maxWidth: 230,
  },
  blockIcon2: {
    flexDirection: 'row',
    left: 0,
    marginTop: 5,
    maxWidth: 230,
  },
});
