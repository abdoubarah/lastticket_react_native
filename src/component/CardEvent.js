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
const imageWidth = dimensions.width - 80;
const URLImage = "https://lastticketforyou.ch/files_perso/evenements/"
const LOGO = "https://lastticketforyou.ch/Templates/images/logo.png"

let CardEvent = ({item}) => {
// console.log("itemEvent", item)
  const navigation = useNavigation();
 const [favorite, setFavorite] = useState(false);
 const [firstLoad, setFirstLoad] = useState(false);

  useEffect(()=>{
    
    console.log("##itemEvent this", item.id_evenement, item.favoris_count, favorite)
    // console.log("##favorite", favorite)
  },[firstLoad])


 let _Favorite = async() => {
    setFavorite(!favorite)
    // setFirstLoad(true)
    console.log("itemEvent this", item.id_evenement, item.favoris_count, favorite)
    // console.log("favorite", favorite)
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
        <TouchableOpacity style={{position: "absolute", right: 0, width: 50, height: 50, justifyContent: "center", alignItems: "center", zIndex: 5,}} 
          onPress={()=> {
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
        <Text style={styles.paragraph}>
          {item.titre}
        </Text>
        <View style={{marginTop: 45}}>
          <View style={styles.blockIcon}>
            <Ionicons name="time-outline" color={"black"} size={20} />
            <Text style={{marginLeft: 5, fontSize: 16}}>{item.date_debut}</Text>
          </View>
          <View style={styles.blockIcon}>
            <FontAwesome name="location-arrow" color={"black"} size={20} />
            <Text style={{marginLeft: 5, fontSize: 16}}>{item.nom_ville}</Text>
          </View>
          <View style={styles.blockIcon}>
            <Ionicons name="location-outline" color={"black"} size={20} />
            <Text style={{marginLeft: 5, fontSize: 16}}>{item.localisation}</Text>
          </View>
        </View>
        {item.contient_billets == 0
          ?<Text style={{position: "absolute", right: 20, bottom: 10, fontSize: 22, fontWeight: "bold", color: "red"}}>Gratuit</Text>
          :<Text style={{position: "absolute", right: 20, bottom: 10, fontSize: 22, fontWeight: "bold", color: "red"}}>{item.prix} CHF</Text>
        }
        
        <Image style={styles.logo} source={{uri: URLImage + item.image}} resizeMode="cover"/>
      
      <View style={{backgroundColor: "#ffffff52",
      height: imageHeight,
      width: imageWidth, zIndex: -1, 
      position: "absolute"
      }}>

      </View>
      </TouchableOpacity >
    </View>
  );
}

export { CardEvent }

const styles = StyleSheet.create({
  container: {
    width: imageWidth,
    height: imageHeight,
     backgroundColor:'rgba(56, 172, 236, 0.3)',
    borderWidth:0,
    borderRadius:20,
    padding: 24,
    backgroundColor: "#00000014",
    marginHorizontal: 15,
  },
  paragraph: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 20
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
    marginTop: 5, 
    maxWidth: 300
  }
});
