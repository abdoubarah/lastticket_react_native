import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, TextInput, Alert } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Axios from 'axios'
import qs from 'qs'
import AsyncStorage from '@react-native-community/async-storage';

const ChangePassword = ({navigation}) => {

    // const [textUser, setTextUser] = useState('');
    const [textOldPass, setTextOldPass] = useState('');
    const [textOldPassColor, setTextOldPassColor] = useState('black');
    const [textPass, setTextPass] = useState('');
    const [textPassColor, setTextPassColor] = useState('black');
    const [textPassConfirm, setTextPassConfirm] = useState('');
    const [textPassConfirmColor, setTextPassConfirmColor] = useState('black');
    const _checkOldPass = () => {
        if (textOldPass == "") {
            setTextOldPassColor("orange")
        } else {
            setTextOldPassColor("black")
        }
    }
    const _checkNewPass = () => {
        if (textPass == "") {
            setTextPassColor("orange")
        }
        if (textPassConfirm == "") {
            setTextPassConfirmColor("orange")
        }
        if (textPassConfirm != textPass) {
            setTextPassColor("red")
            setTextPassConfirmColor("red")
        } else if(textPassConfirm == textPass && textPass != "") {
            setTextPassColor("green")
            setTextPassConfirmColor("green")
        }
    }


    const _changePassword = async() => {
        _checkNewPass()
        _checkOldPass()
        console.log("_changePassword function ")
        if (textOldPass != "" && textPass != "" && textPass == textPassConfirm) {
        console.log("_changePassword GGGGG ")
            Axios({
                method: "post",
                url: "https://lastticketforyou.ch/api.html?action=changer_pass&target=restfulapi",
                data: qs.stringify({
                    "token": await AsyncStorage.getItem('token'),
                    "old_pass": textOldPass,
                    "pass": textPassConfirm
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
                }
            }).then((response) => {
                console.log("ChangePassword")
                console.log(response.data)
                if (response.data.status == 1) {
                    setTextOldPass("")
                    setTextPass("")
                    setTextPassConfirm("")
                    Alert.alert(
                        '',
                        'Changé avec succès',
                        [
                            {
                                text: 'Ok',
                                onPress: () => console.log(),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                }
                else if (response.data.status == 2) {
                    setTextOldPassColor("red")
                    Alert.alert(
                        '',
                        'Le mot de passe saisi est incorrect',
                        [
                            {
                                text: 'Ok',
                                onPress: () => console.log(),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                }else if (response.data.status == 0) {
                    setTextOldPassColor("red")
                    navigation.replace('Signin');
                } else {
                    Alert.alert(
                        '',
                        'we have a problem please contact support',
                        [
                            {
                                text: 'Ok',
                                onPress: () => console.log(),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                }


            }).catch((err) => {

                alert("We have problem please contact support")
            })
        } else {
            _checkNewPass()
            _checkOldPass()
        }

    }


 return (
        <View style={{ flex: 1, backgroundColor: "#d5dae5" }}>
            <View style={{ flex: 0.8, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    style={{ flex: 0.8, flexDirection: "row", alignItems: "center" }}
                    onPress={() => { goBack() }}
                >
                    <AntDesign
                        name={"arrowleft"}
                        size={20}
                        color={"black"}
                    />
                    <Text style={{ marginLeft: 10 }}>Changer le mot de passe</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
                {/* <Image
                    source={require("../images/icon/change_password_icon.png")}
                    style={{ width: 100, height: 100, borderRadius: 50, }}
                /> */}
                <Text style={{
                    // fontFamily: "Corbel-bold",
                    // fontFamily: Fonts.Corbel, 
                    // fontFamily: "Roboto-Bold",
                    fontWeight: "bold",
                    fontSize: 15,
                }}>Changer le mot de passe</Text>
                <Text style={{
                    fontSize: 13,
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    maxWidth: "90%",
                    marginVertical: 20
                }}>Entrez votre ancien mot de passe et votre nouveau mot de passe ci-dessous. nous sommes juste plus sûrs</Text>
            </View>
            <View style={{ flex: 6, flexDeriction: "column", marginTop: 20, }}>
                <View style={{
                    backgroundColor: "white",
                    marginBottom: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 15,

                    borderBottomWidth: 1,
                    borderBottomColor: 'whitesmoke',
                }}>
                    <View style={{
                        backgroundColor: "white",
                        flexDirection: 'row',
                        alignItems: "center"
                    }}
                    >
                        <Text style={{ color: "#6b6b6b" }}>Ancien mot de passe</Text>
                        <TextInput style={{
                            paddingRight: 10, left: "50%", position: "absolute", textAlign: 'right', height: 50, backgroundColor: 'rgba(0,0,0,0)', width: "55%", borderBottomWidth: 1, borderBottomColor: textOldPassColor, borderWidth: 0, backgroundColor: 'white',
                        }}
                            onChangeText={(txt) => setTextOldPass(txt)}
                            value={textOldPass}
                            placeholder={"e.g: 123456"}
                            secureTextEntry={true}
                            onBlur={_checkOldPass}
                        />
                    </View>
                </View>
                <View style={{
                    backgroundColor: "white",
                    marginBottom: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 15,

                    borderBottomWidth: 1,
                    borderBottomColor: 'whitesmoke',
                }}>
                    <View style={{
                        backgroundColor: "white",
                        flexDirection: 'row',
                        alignItems: "center"
                    }}
                    >
                        <Text style={{ color: "#6b6b6b" }}>Nouveau mot de passe</Text>
                        <TextInput style={{
                            paddingRight: 10, left: "50%", position: "absolute", textAlign: 'right', height: 50, backgroundColor: 'rgba(0,0,0,0)', width: "55%", borderBottomWidth: 1, borderBottomColor: textPassConfirmColor, borderWidth: 0, backgroundColor: 'white',
                        }}
                            onChangeText={(txt) => setTextPass(txt)}
                            value={textPass}
                            placeholder={"e.g: LastTicket123"}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={{
                    backgroundColor: "white",
                    marginBottom: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 15,

                    borderBottomWidth: 1,
                    borderBottomColor: 'whitesmoke',
                }}>
                    <View style={{
                        backgroundColor: "white",
                        flexDirection: 'row',
                        alignItems: "center"
                    }}
                    >
                        <Text style={{ color: "#6b6b6b" }}>Confirmez le mot de passe</Text>
                        <TextInput style={{
                            paddingRight: 10, left: "50%", position: "absolute", textAlign: 'right', height: 50, backgroundColor: 'rgba(0,0,0,0)', width: "55%", borderBottomWidth: 1, borderBottomColor: textPassConfirmColor, borderWidth: 0, backgroundColor: 'white',
                        }}
                            onChangeText={(txt) => setTextPassConfirm(txt)}
                            value={textPassConfirm}
                            placeholder={"e.g: LastTicket123"}
                            secureTextEntry={true}
                            onBlur={_checkNewPass}
                        />
                    </View>
                </View>

                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{ backgroundColor: "black", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 }}
                        onPress={_changePassword}
                    >
                        <Text style={{ color: "white" }}>Validate</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

ChangePassword.navigationOptions = {
    // title: "ChangePassword",
    headerShown: false
}

export { ChangePassword }