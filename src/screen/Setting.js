import React, { useState, useEffect } from 'react'
import { View, ScrollView , Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-community/async-storage';

let Setting = ({navigation}) => {    
    const [username, setUsername] = useState("")

    const _logout = async () => {
        console.log("logout")
        try {
            await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
        navigation.replace('Signin');
        } catch (error) {console.log("multiRemove", error)}

    }

    const LoadPicture = (type) => {
        return (
            <Image
                source={{ uri: "http://www.ujuke.fr/PlayTheNextAPI/getUserPhoto.php?Type=" + Date.now() + "&gender=Male&ClientName=ClientName&Key=kalinkamaya&Nickname=" + username, cache: 'only-if-cached' }}
                style={{ width: 100, height: 100, borderRadius: 50, }}
            />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#d5dae5" }}>
            <View style={{ flex: 0.8, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    style={{ flex: 0.8, flexDirection: "row", alignItems: "center" }}
                    onPress={() => { navigation.goBack() }}
                >
                    <AntDesign
                        name={"arrowleft"}
                        size={20}
                        color={"black"}
                    />
                    <Text style={{ marginLeft: 10 }}>Settings</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <LoadPicture />
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 15,
                }}>{username}</Text>
            </View>
            <View style={{ flex: 6, flexDeriction: "column", }}>
                <ScrollView>
                    <View style={{
                        backgroundColor: "white",
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "white",
                            flexDirection: 'row',
                            alignItems: "center"
                        }}
                            onPress={() => {
                                navigation.navigate("Profile")
                            }}>
                            <MaterialCommunityIcons
                                style={{ paddingHorizontal: 5 }}
                                name={"account-outline"}
                                size={20}
                                color={"black"} />
                            <Text>Profil</Text>
                            <AntDesign
                                style={{ right: 5, position: "absolute" }}
                                name={"arrowright"}
                                size={15}
                                color={"black"} />

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "white",
                            flexDirection: 'row',
                            alignItems: "center"
                        }}
                            onPress={() => {
                                navigation.navigate("ChangePassword")
                            }}>
                            <Fontisto
                                style={{ paddingHorizontal: 5 }}
                                name={"key"}
                                size={20}
                                color={"black"} />
                            <Text>Changer le mot de passe</Text>
                            <AntDesign
                                style={{ right: 5, position: "absolute" }}
                                name={"arrowright"}
                                size={15}
                                color={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "white",
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <Fontisto
                                style={{ paddingHorizontal: 5 }}
                                name={"favorite"}
                                size={20}
                                color={"black"} />
                            <Text>Mes réservations</Text>
                            <AntDesign
                                style={{ right: 5, position: "absolute" }}
                                name={"arrowright"}
                                size={15}
                                color={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "white",
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <AntDesign
                                style={{ paddingHorizontal: 5 }}
                                name={"save"}
                                size={18}
                                color={"black"} />
                            <Text>Mes enregistrements</Text>
                            <AntDesign
                                style={{ right: 5, position: "absolute" }}
                                name={"arrowright"}
                                size={15}
                                color={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        marginBottom: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: 'whitesmoke',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "white",
                            flexDirection: 'row',
                            alignItems: "center"
                        }}
                            onPress={_logout}>
                            <MaterialCommunityIcons
                                style={{ paddingHorizontal: 5 }}
                                name={"logout"}
                                size={20}
                                color={"black"} />
                            <Text>Logout</Text>
                            <AntDesign
                                style={{ right: 5, position: "absolute" }}
                                name={"arrowright"}
                                size={15}
                                color={"black"} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}

export { Setting }

const styles = StyleSheet.create({

})