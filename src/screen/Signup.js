import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, Text, StyleSheet, Image, TextInput, Alert, Button, TouchableOpacity } from 'react-native'
import Axios from 'axios';
import qs from 'qs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AsyncStorage from '@react-native-community/async-storage';

let Signup = ({navigation}) => {

    const [textFirstName, setTextFirstName] = useState("");
    const [textLastName, setTextLastName] = useState("");
    const [textEmail, setTextEmail] = useState("");
    const [textPhone, setTextPhone] = useState("");
    const [textPass, setTextPass] = useState("");
    const [textPassConfirm, setTextPassConfirm] = useState("");
    const [textToken, setTextToken] = useState("");
    const [colorPassword, setColorPassword] = useState('black');
    const [colorPasswordConfirm, setColorPasswordConfirm] = useState('black');

    const _checkPassword = () => {
        if (textPass == "")
            setColorPassword("orange")
        if (textPassConfirm == "")
            setColorPasswordConfirm("orange")
        if (textPass == "")
            setColorPassword("orange")
        if (textPass == textPassConfirm && textPassConfirm != "" && textPass != "")
            setColorPassword("green"), setColorPasswordConfirm("green")
        if (textPass != textPassConfirm && textPassConfirm != "" && textPass != "")
            setColorPassword("red"), setColorPasswordConfirm("red")
    }

    let _storeData = async (lastName, firstName, phone, email, token) => {
        
        let user = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            phone: phone,
        } 
        try {
            try {
                await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
            } catch (error) {console.log("multiRemove", error)}

            await AsyncStorage.setItem('user',JSON.stringify(user));
            console.log("tokken", token)
            await AsyncStorage.setItem("token", token)
        } catch (error) {console.log("email not save ", error)}
    };

    let _Signup = () =>{
         if (textFirstName == "") {
            Alert.alert(
                '',
                'Nom est obligatoire',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log(),
                        style: 'Annuler',
                    },
                ],
                { cancelable: false },
            );
        } else if (textLastName == "") {
            Alert.alert(
                '',
                'Prénom est obligatoire',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log(),
                        style: 'Annuler',
                    },
                ],
                { cancelable: false },
            );
        } else if (textEmail == "") {
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
        }else if (textPhone == "") {
            Alert.alert(
                '',
                'Télephone est obligatoire',
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
            setColorPassword("green"), setColorPasswordConfirm("green")
            Axios({
                method: 'post',
                // url: 'http://last-ticket.cste.ch/ticket_api/v1/create-membre-api.php',
                url: 'https://lastticketforyou.ch/api.html?action=inscription&target=restfulapi',
                data: qs.stringify({
                    'nom':textLastName,
                    'prenom':textFirstName,
                    'tel':textPhone,
                    // 'type': "1",
                    'email': textEmail,
                    'password': textPass,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
                }
            }).then(async (response) => {                
                console.log("#####################Signup # response ",response.data)
                if (response.data.status == 1) {
                    await _storeData(textLastName, textFirstName, textPhone, textEmail, response.data.token)
                    navigation.navigate('Home', {screen: 'Home'});
                } else if (response.data.status == 3) {
                    Alert.alert(
                        '',
                        'email déjà existe',
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
                    Alert.alert(
                        '',
                        'Nous avons un problème, veuillez contacter le support: API',
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

    return (        
        <SafeAreaView style={{

            flex: 1,

        }}>
        <ScrollView style={{

            flex: 1,

        }}
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
                    }}>Devenir Client</Text>

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
                        placeholder="Entrez votre Prénom"
                        onChangeText={text => setTextFirstName(text)}
                        value={textFirstName}

                    />
                    <FontAwesome name={"user"} color={"gray"} size={25} style={styles.signupIcon}/>
                </View>
                <View
                    style={styles.signupDiv}>
                    <TextInput
                        style={styles.signupInput}
                        placeholder="Entrez votre Nom"
                        onChangeText={text => setTextLastName(text)}
                        value={textLastName}

                    />
                    <FontAwesome name={"user"} color={"gray"} size={25} style={styles.signupIcon}/>
                </View>
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
                        placeholder="Entrez votre numéro de téléphone"
                        onChangeText={text => setTextPhone(text)}
                        value={textPhone}

                    />
                    <Foundation name={"telephone"} color={"gray"} size={28} style={styles.signupIcon}/>
                </View>
                <View
                    style={styles.signupDiv}>
                    <TextInput
                        style={[styles.signupInput,{borderBottomColor: colorPassword}]}
                        placeholder="Entrez votre mot de passe"
                        onChangeText={text => setTextPass(text)}
                        value={textPass}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onBlur={_checkPassword}
                    /> 
                    <FontAwesome name={"lock"} color={"gray"} size={25} style={styles.signupIcon}/>
                </View>

                <View
                    style={styles.signupDiv}>
                    <TextInput
                        style={[styles.signupInput,{borderBottomColor: colorPasswordConfirm}]}
                        placeholder="Entrez à nouveau votre mot de passe"
                        onChangeText={text => setTextPassConfirm(text)}
                        value={textPassConfirm}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onBlur={_checkPassword}
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
                        onPress={_Signup}
                    >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>S'inscrire</Text>
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
                        onPress={() => navigation.navigate("Signin")}
                    >
                        <Text>avez déjà un compte! </Text>
                        <Text style={{fontWeight: "bold"}}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

export { Signup }



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