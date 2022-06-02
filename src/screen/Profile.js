import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput, Picker, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Axios from 'axios';
import qs from 'qs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import ImagePicker from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

let Profile = ({navigation}) => {
    
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [typePicture, setTypePicture] = useState(0)

     useFocusEffect(
        React.useCallback(() => {        
        console.log("Load Profile"),
        (async()=>{
         const user = await AsyncStorage.getItem('user');
         console.log("Profileuser", JSON.parse(user))
        //  const token = await AsyncStorage.getItem('token');
        //  console.log("Profiletoken", token)
         setEmail(JSON.parse(user).email)
         setFirstname(JSON.parse(user).firstName)
         setLastname(JSON.parse(user).lastName)
         setPhone(JSON.parse(user).phone)
         setDescription(JSON.parse(user).description)
      })(); 
        }, [])
    );

    const _editProfile = async () => {
        console.log('nom', lastname,'prenom', firstname,'tel', phone, "description", description )
        Axios({
            method: 'post',
            url: 'https://lastticketforyou.ch/api.html?action=profil&target=restfulapi',
            data: qs.stringify({
                'token': await AsyncStorage.getItem('token'),
                'nom': lastname,
                'prenom': firstname,
                'tel': phone,
                'description': description,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
            }
        }).then(async (response) => {    
            console.log("response.data user",response.data.status )            
            if (response.data.status == 0) {
                navigation.replace('Signin');
            }  else if (response.data.status == 1) {
                console.log("response.data USER",response.data)
                const res = await _storeData(lastname, firstname, phone, description);
                Alert.alert(
                    '',
                    'Votre profil a été modifié avec succès',
                    [
                        {
                            text: 'Ok',
                            onPress: () => console.log(),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
            }  else if (response.data.status == 3) {
                console.log("response.data USER",response.data)
                alert("Problem de data Champ invalide")                                   
            } else {
                console.log("response.data USER",response.data)
                alert("Nous avons un problème, veuillez contacter le support: API")
            }
        
        }).catch(err => {
            console.log("########### err getUser ", err, err.response)
        }) 
    }
    
    // const _getUserFromAPI = async (token) => {
    //     // console.log("_getUserFromAPI : token", token)
            
    //     return new Promise((resolve, reject) => {
            
    //         Axios({
    //                 method: 'post',
    //                 // url: 'https://last-ticket.cste.ch/ticket_api/v1/getUser.php',
    //                 url: 'https://lastticketforyou.ch/api.html?action=get_user&target=restfulapi',
    //                 data: qs.stringify({
    //                     'token': token,
    //                 }),
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
    //                 }
    //             }).then(async (response) => {    
    //                 // console.log("response.data user",response.data, token)            
    //                 if (response.data.status == 0) {
    //                     console.log("Token not found")
    //                 }  else if (response.data.status == 1) {
    //                     console.log("response.data USER",response.data)
    //                     const res = await _storeData(response.data.client, token);
    //                     resolve(res);                   
    //                 } else {
    //                     console.log("response.data USER",response.data)
    //                     alert("Nous avons un problème, veuillez contacter le support: API")
    //                 }
                
    //             }).catch(err => {
    //                 console.log("########### err getUser ", err, err.response)
    //                 reject(err)
    //             })        
    //     });
    // }

    let _storeData = async (lastname, firstname, phone, description) => {
        
            console.log("_storeData",lastname, firstname, phone, description)
            let user = {  
                lastName: lastname,
                firstName: firstname,
                email: email,
                phone: phone,
                description: description,
            } 
            try {
                // console.log("AsyncStorage",await AsyncStorage.getAllKeys())
                // try {
                //     await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
                // } catch (error) {console.log("multiRemove", error)}


                await AsyncStorage.setItem('user',JSON.stringify(user));
            } catch (error) {console.log("user not save ", error)}
            
        user = await AsyncStorage.getItem('user');
         console.log("Profileuser Change", JSON.parse(user))
         setEmail(JSON.parse(user).email)
         setFirstname(JSON.parse(user).firstName)
         setLastname(JSON.parse(user).lastName)
         setDescription(JSON.parse(user).description)
    };

    const _changePicture = async () => {
        ImagePicker.showImagePicker(options, async (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                await _changePictureFromAPI(response)
            }
        });
    }
    const LoadPicture = (type) => {

        return (
            <Image
                source={{ uri: "http://www.ujuke.fr/PlayTheNextAPI/getUserPhoto.php?Type=" + Date.now() + "&gender=Male&ClientName=ClientName&Key=kalinkamaya&Nickname=" + "username", cache: 'only-if-cached' }}
                style={{ width: 100, height: 100, borderRadius: 50, }}
            />
        )
    }
    return (
         <View style={{ flex: 1, backgroundColor: "#d5dae5", paddingVertical: 20 }}>
            <View style={{ flex: 0.8, flexDirection: "row", }}>
                <TouchableOpacity
                    style={{ flex: 0.8, flexDirection: "row", }}
                    onPress={() => { navigation.goBack() }}
                >
                    <AntDesign
                        name={"arrowleft"}
                        size={20}
                        color={"black"}
                    />
                    <Text style={{ marginLeft: 10 }}>Account info</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 30 }}>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <LoadPicture />
                    <View>
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                width: 25,
                                height: 25,
                                marginTop: -30,
                                marginLeft: 30,
                                backgroundColor: "white",
                                borderRadius: 50,
                                zIndex: 1000
                            }}
                            onPress={_changePicture}>
                            {/* <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                width: 25,
                                height: 25,
                                marginTop: -30,
                                marginLeft: 30,
                                backgroundColor: "white",
                                borderRadius: 50,
                                zIndex: 1000
                            }}> */}
                            <MaterialIcons
                                style={{
                                    // position: "absolute",
                                }}
                                name={"add-a-photo"}
                                size={18}
                                color={"black"}
                            />
                            {/* </View> */}
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        // fontFamily: "Corbel-bold",
                        // fontFamily: Fonts.Corbel, 
                        // fontFamily: "Roboto-Bold",
                        fontWeight: "bold",
                        fontSize: 15,
                    }}>{username}</Text>
                </View>
                <View style={{ flex: 6, flexDeriction: "column", marginTop: 20, }}>
                    <View style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TextInput style={{}}
                            onChangeText={(txt) => setEmail(txt)}
                            value={email}
                            editable={false}
                            placeholder={"Email"} />
                    </View>
                    <View style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TextInput style={{}}
                            onChangeText={(txt) => setFirstname(txt)}
                            value={firstname}
                            // editable={false}
                            placeholder={"Prénom"} />
                    </View>
                    <View style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TextInput style={{}}
                            onChangeText={(txt) => setLastname(txt)}
                            value={lastname}
                            // editable={false}
                            placeholder={"Nom"} />
                    </View>
                    <View style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TextInput style={{}}
                            onChangeText={(txt) => setPhone(txt)}
                            value={phone}
                            keyboardType="phone-pad"
                            placeholder={"Telephone"} />
                    </View>
                    <View style={{
                        width: "100%",
                        height: 100,
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TextInput style={{}}e
                            onChangeText={(txt) => setDescription(txt)}
                            value={description}
                            // editable={false}
                            placeholder={"Description"} />
                    </View>
                </View>

                <View style={{ flex: 2, marginTop: 25, paddingBottom: 10, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{ alignItems: "center", flex: 1, backgroundColor: "black", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 }}
                        onPress={_editProfile}
                    >
                        <Text style={{ color: "white" }}>EDIT PROFILE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
}

export { Profile }

const styles = StyleSheet.create({

})