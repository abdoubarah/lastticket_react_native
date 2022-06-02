import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions,TouchableOpacity  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationService} from 'navigation'
import { useNavigation } from '@react-navigation/native';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16) - 50;
const imageWidth = Math.round(dimensions.width / 2) -7;
const URLImage = "https://last-ticket.cste.ch/wcm/files_perso/categories/"
const LOGO = "https://lastticketforyou.ch/Templates/images/logo.png"

let CardCategory = ({item}) => {
// console.log("item ######---#####CardCategory", item)
  const navigation = useNavigation();

  return (
    <View style={{ width: imageWidth, 
    marginHorizontal: 3,
    marginVertical: 5,
    backgroundColor: "#00000014",}}>
      <TouchableOpacity style={styles.container} onPress={()=> {
          navigation.navigate("EventsCategory", {categoryId: item.id_categorie})
        }
      }>    
        <Text style={styles.paragraph}>
          {item.titre}{"\n"}
        </Text>
        <Text style={styles.paragraph2}>
          {item.count} Events
        </Text>
        {item.image !== "empty"
          ? <Image style={styles.logo} source={{uri: URLImage+item.image}} resizeMode="cover"/>
          : <Image style={styles.logo} source={{uri: LOGO}} resizeMode="contain"/>
        }
        
      <View style={{backgroundColor: "#00000052",
      height: imageHeight,
      width: imageWidth, zIndex: -1, 
      borderRadius: 10,
      position: "absolute"
      }}>

      </View>
      </TouchableOpacity >
    </View>
  );
}

export { CardCategory }

const styles = StyleSheet.create({
  container: {
    width: imageWidth,
    height: imageHeight,
     backgroundColor:'rgba(56, 172, 236, 0.3)',
    borderWidth:0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#00000014",
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
    position: 'absolute',
    bottom: 5
  },
  paragraph2: {
    marginTop: 15,
    fontSize: 16,
    color: "white",
    textAlign: 'center',
    position: 'absolute',
    bottom: 5
  },
  logo: {
    position: "absolute",
    borderRadius: 10,
    height: imageHeight,
    width: imageWidth,
    zIndex: -2,
  },
  image: {
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
