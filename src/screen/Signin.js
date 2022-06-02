import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, StyleSheet, Image, TextInput, Alert, Button, TouchableOpacity } from 'react-native'
import Axios from 'axios';
import qs from 'qs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

let Signin = ({navigation}) => {

    const [textEmail, setTextEmail] = useState("client@cste.ch");
    const [textPass, setTextPass] = useState("admin123");
    const [textToken, setTextToken] = useState("");

    let _Signin = () =>{
         if (textEmail == "") {
            Alert.alert(
                '',
                'Email est obligatoire',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log(),
                        style: 'Annuler',
                    },
                ],
                { cancelable: false },
            );
        } else if (textPass == "") {
            Alert.alert(
                '',
                'Mot de passeest obligatoire',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log(),
                        style: 'Annuler',
                    },
                ],
                { cancelable: false },
            );
        } else {
            Axios({
                method: 'post',
                // url: 'https://last-ticket.cste.ch/ticket_api/v1/login-api.php',
                url: 'https://lastticketforyou.ch/api.html?action=login&target=restfulapi',
                data: qs.stringify({
                    'email': textEmail,
                    'password': textPass,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
                }
            }).then(async (response) => {                
                console.log("#######################response",response.data.token)
                if (response.data.status == 1) {      
                    // setTextToken(response.data.token)
                    setTimeout(async() => {   
                        if(response.data.token) {                      
                            const user = await _getUserFromAPI(response.data.token)
                            navigation.push('Home', {screen: 'Home'});
                        }
                    }, 1000);
                } else {
                    Alert.alert(
                        '',
                        'email ou/est Mot de passe ne pas correcte',
                        [
                            {
                                text: 'Ok',
                                onPress: () => console.log(),
                                style: 'Annuler',
                            },
                        ],
                        { cancelable: false },
                    );
                }

            }).catch(err => {
                console.log("########### err signin ", err, err.response)

                if (err.PERMISSION_DENIED == 1) {
                    alert('vous devez accepter l\'autorisation de localisation pour vous connecter')
                } else
                    alert("Nous avons un problème, veuillez contacter le support: API", err)

            })
        }
    }
    
    const _getUserFromAPI = async (token) => {
        // console.log("_getUserFromAPI : token", token)
            
        return new Promise((resolve, reject) => {
            
            Axios({
                    method: 'post',
                    // url: 'https://last-ticket.cste.ch/ticket_api/v1/getUser.php',
                    url: 'https://lastticketforyou.ch/api.html?action=get_user&target=restfulapi',
                    data: qs.stringify({
                        'token': token,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
                    }
                }).then(async (response) => {    
                    // console.log("response.data user",response.data, token)            
                    if (response.data.status == 0) {
                        console.log("Token not found")
                    }  else if (response.data.status == 1) {
                        console.log("response.data USER",response.data)
                        const res = await _storeData(response.data.client, token);
                        resolve(res);                   
                    } else {
                        console.log("response.data USER",response.data)
                        alert("Nous avons un problème, veuillez contacter le support: API")
                    }
                
                }).catch(err => {
                    console.log("########### err getUser ", err, err.response)
                    reject(err)
                })        
        });
    }

    let _storeData = async (data, token) => {
        
            // console.log("_storeData", data, "token",token)
            let user = {  
                lastName: data.nom,
                firstName: data.prenom,
                email: data.email,
                phone: data.telephone,
            } 
            try {
                // console.log("AsyncStorage",await AsyncStorage.getAllKeys())
                try {
                    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
                } catch (error) {console.log("multiRemove", error)}

                await AsyncStorage.setItem('user',JSON.stringify(user));
                // console.log("tokken", token)
                await AsyncStorage.setItem("token", token)
            } catch (error) {console.log("email not save ", error)}
    };

    return (        
        <SafeAreaView style={{flex: 1,}}>
        <ScrollView style={{flex: 1,}}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',
            alignItems: 'center' }}>

            <View
                style={{

                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: 20
                }}>
                <View>
                    <Text style={{
                        fontSize: 25,
                        // fontWeight: 'bold',
                        fontFamily: 'serif',
                        textAlign: 'center',
                    }}>Se connecter</Text>

                </View>
            </View>
            <View
                style={{

                    flex: 2,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: 20
                }}>                
                <Image source={require("../images/logo.png")}
                    style={{width: 180, height: 50}} />
            </View>
            <View style={[styles.signupBlock2, {
                marginStart: 5,
                flex: 6.5
            }]}>
                <View
                    style={styles.signupDiv}>
                    <TextInput
                        style={styles.signupInput}
                        placeholder="Entrez votre Email"
                        onChangeText={text => setTextEmail(text)}
                        value={textEmail}

                    />
                    <MaterialIcons name={"email"} color={"gray"} size={25} style={styles.signupIcon}/>
                </View>

                <View
                    style={styles.signupDiv}>
                    <TextInput
                        style={styles.signupInput}
                        placeholder="Entrez votre mot de passe"
                        onChangeText={text => setTextPass(text)}
                        value={textPass}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    /> 
                    <FontAwesome name={"lock"} color={"gray"} size={25} style={styles.signupIcon}/>
                </View>


                <View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 25,
                            backgroundColor: 'black', paddingBottom: 10, paddingTop: 8, paddingRight: 15,
                            paddingStart: 15,
                            marginTop: 25,
                        }}
                        onPress={_Signin}
                    >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>S'identifier</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{

                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: 10
                }}>
                <View>
                    <TouchableOpacity
                        style={styles.signinBlockIcon,{flexDirection: "row"}}
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text>vous n'avez pas de compte! </Text>
                        <Text style={{fontWeight: "bold"}}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>

            </View>
           
        </ScrollView>
        </SafeAreaView>
    );
}

export { Signin }

const styles = StyleSheet.create({
    account: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    accountImg: {
        alignItems: "center",
        borderRadius: 50 / 2,
        flex: 1
    },
    accountName: {
        flex: 2
    },
    auth: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    bannerImage: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    blockNews: {
        bottom: 0,
        flex: 3,
        height: undefined,
        left: 0,
        left: 0,
        position: "relative",
        top: 0,
        width: undefined
    },
    signupContainer: {

        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#d5dae5',
    },
    signupBlock1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#d5dae5',
    },
    signupBlock2: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
    },
    signupDiv: {
        width: "100%",
        marginBottom: 20
    },
    signupInput: {

        height: 40,
        width: "100%",
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingStart: 40
    },
    signupIcon: {

        width: 25,
        height: 25,
        position: "absolute",
        bottom: 6,
        left: 8
    },
    signinBlockIcon: {
        alignItems: 'center',
        marginBottom: 15
    },
    signinIcon: {
        width: 50,
        height: 50,
    }
});