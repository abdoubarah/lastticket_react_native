import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions,TouchableOpacity  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import qs from 'qs';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16) - 50;
const imageWidth = dimensions.width - 30;
const URLImage = "https://lastticketforyou.ch/files_perso/evenements/"

let CardEvent2 = ({item}) => {
// console.log("item", item)
  const navigation = useNavigation();

 const [favorite, setFavorite] = useState(false);
 const [firstLoad, setFirstLoad] = useState(false);
 
  useEffect(()=>{
    
    console.log("##itemEvent this", item.id_evenement, item.favoris_count, favorite)
    // console.log("##favorite", favorite)
  },[firstLoad])


 let _Favorite = async() => {
    setFavorite(!favorite)
    console.log("itemEvent this", item.id_evenement)
    Axios({
          method: 'post',
          url: 'https://lastticketforyou.ch/api.html?target=restfulapi&action=favoris',
          data: qs.stringify({
            'id_evenement': item.id_evenement,
            'token': await AsyncStorage.getItem('token'),
            // 'limit': "2",
          }),
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
          }
      }).then(async (response) => {
          console.log("response CardEvent2",response.data)
          
      }).catch(err => {
          console.log("########### err CardEvent2", err, err.response)

      })
 }
  return (
    <View >
      <TouchableOpacity style={styles.container} onPress={()=> {
          navigation.navigate("EventDetail", {eventId: item.id_evenement})
        }
      }>    
      
        <TouchableOpacity style={{position: "absolute", zIndex: 2, right: 10, top: 10}} onPress={()=> {
            setFirstLoad(true)
            _Favorite() 
          }
        }>
         {favorite == false && item.favoris_count==0 && firstLoad == false
          ? <MaterialIcons name="favorite-border" color={"red"} size={35} style={{}} />
          : favorite == false && item.favoris_count==1 && firstLoad == false
          ? <MaterialIcons name="favorite" color={"red"} size={35} style={{}} />
          : favorite == true && firstLoad == true && item.favoris_count==0
          ? <MaterialIcons name="favorite" color={"red"} size={35} style={{}} />
          : favorite == true && firstLoad == true && item.favoris_count==1
          ? <MaterialIcons name="favorite-border" color={"red"} size={35} style={{}} />
          : favorite == false && firstLoad == true && item.favoris_count==0
          ? <MaterialIcons name="favorite-border" color={"red"} size={35} style={{}} />
          : <MaterialIcons name="favorite" color={"red"} size={35} style={{}} />          
        }        
        </TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'row',}}>
          <View style={{backgroundColor: "red", flex: 1,  
        borderWidth: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "black"}}> 
            <Image style={{
              position: "absolute",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              height: imageHeight,
              width: "100%",
              zIndex: -2,
            }} source={{uri: URLImage+item.image}} resizeMode="cover"/>

          </View>
          <View style={{
             flex: 2, 
            paddingLeft: 10,
            borderWidth: 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,}}>
            <Text numberOfLines={1} style={styles.paragraph}>
          {item.titre}
            </Text>
            <View style={{marginTop: 35}}>              
              <View style={styles.blockIcon}>
                <FontAwesome name="location-arrow" color={"black"} size={20} />
                <Text numberOfLines={1} style={{marginLeft: 5, fontSize: 16, maxWidth: 180}}>{item.nom_ville}</Text>
              </View>
              <View style={styles.blockIcon}>
                <Ionicons name="location-outline" color={"black"} size={20} />
                <Text numberOfLines={1} style={{marginLeft: 5, fontSize: 16, maxWidth: 180}}>{item.localisation}</Text>
              </View>
            </View>
            {item.contient_billets == 0
              ?<Text style={{position: "absolute", right: 20, bottom: 10, fontSize: 22, fontWeight: "bold", color: "red"}}>Gratuit</Text>
              :<Text style={{position: "absolute", right: 20, bottom: 10, fontSize: 22, fontWeight: "bold", color: "red"}}>{item.prix} CHF</Text>
            }
            
            
            <View style={{flex: 1, flexDirection: 'row',}}>
              <View style={{backgroundColor: "#fcc40b", marginTop: 5, justifyContent: "center", alignItems: "center", width: 75, height: 70, borderRadius: 12}}>
                <Text style={{fontSize: 35, color: "white"}}>{item.jour}</Text>
                <Text style={{fontSize: 20, color: "white"}}>{item.mois}</Text>

              </View>
              <View style={{ marginTop: 25, width: 100, height: 60, marginLeft: 10}}>
                <View style={styles.blockIcon}>
                  <Ionicons name="time-outline" color={"black"} size={20} />
                  <Text style={{marginLeft: 5, fontSize: 16}}>{item.heure_debut}</Text>
                </View>
              </View>
            </View>
          </View>
      </View>
      </TouchableOpacity >
    </View>
  );
}

export { CardEvent2 }

const styles = StyleSheet.create({
  container: {
    width: imageWidth,
    height: imageHeight,
     backgroundColor:'rgba(56, 172, 236, 0.3)',
    borderWidth:0,
    borderRadius:20,
    // padding: 10,
    backgroundColor: "#00000014",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  paragraph: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    // textAlign: 'center',
    position: 'absolute',
    left: 10,
    maxWidth: 190,
    // backgroundColor: "red"
  },
  logo: {
    position: "absolute",
    borderRadius:20,
    height: imageHeight,
    width: imageWidth,
    zIndex: -2,
  },
  image: {
    // flex: 1,
    // resizeMode: "cover",
    resizeMode: "contain",
    justifyContent: "center"
  },
  blockIcon: {
    flexDirection: "row", 
    left: 0, 
    // marginTop: 1, 
    maxWidth: 230,
  }
});
