import React, { useState, useEffect } from 'react'
import { View, Dimensions, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { Marker } from 'react-native-maps';
// // import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';
import { ClusterMap } from 'react-native-cluster-map';
import MapView from 'react-native-maps';

var { screenWidth, screenHeight } = Dimensions.get('window')
let Maps = (props) => {
    const [latitudeClusterMap, setLatitudeClusterMap] = useState(46.761415)
    const [longitudeClusterMap, setLongitudeClusterMap] = useState(8.0060997)
    const [latitudeDeltaClusterMap, setLatitudeDeltaClusterMap] = useState(0.5)
    const [longitudeDeltaClusterMap, setLongitudeDeltaClusterMap] = useState(0.5)
    
    return (
        <View style={styles.container}>
            {/* <MapView
                style={{width: "100%", height: "100%"}}
                initialRegion={{
                latitude: 46.761415,
                longitude: 8.0060997,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                onPress={e => console.log(e.nativeEvent)}
                onRegionChange={e => console.log(e)}
            >
                <Marker coordinate={{ latitude: 46.761415, longitude: 8.280139 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 46.9476359, longitude: 8.0060997 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 46.9880116, longitude: 8.1228033 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 47.3559126, longitude: 8.6228903 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 46.3559126, longitude: 8.0228903 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 47.115528, longitude: 9.559921 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 47.1205726, longitude: 9.7764533 }} title={"title"} description={"description"} /> 
                <Marker coordinate={{ latitude: 33.996952, longitude: -6.871214 }} title={"title"} description={"description"} />
                <Marker coordinate={{ latitude: 45.488070, longitude: 9.164058 }} title={"title"} description={"description"} />
                
            </MapView> */}
            <ClusterMap
            region={{
                latitude: latitudeClusterMap,
                longitude: longitudeClusterMap,
                latitudeDelta: latitudeDeltaClusterMap,
                longitudeDelta: longitudeDeltaClusterMap,
            }}
                onRegionChange={(e) =>{ 
                    // console.log(e)
                setLatitudeDeltaClusterMap(latitudeDeltaClusterMap)
                setLatitudeClusterMap(latitudeClusterMap)
                setLongitudeClusterMap(longitudeClusterMap)
                setLongitudeDeltaClusterMap(longitudeDeltaClusterMap)
                }}
            >
                <Marker coordinate={{ latitude: 46.761415, longitude: 8.280139 }} />
                <Marker coordinate={{ latitude: 46.9476359, longitude: 8.0060997 }} />
                <Marker coordinate={{ latitude: 46.9880116, longitude: 8.1228033 }} />
                <Marker coordinate={{ latitude: 47.3559126, longitude: 8.6228903 }} />
                <Marker coordinate={{ latitude: 46.3559126, longitude: 8.0228903 }} />
                <Marker coordinate={{ latitude: 47.115528, longitude: 9.559921 }} />
                <Marker coordinate={{ latitude: 47.1205726, longitude: 9.7764533 }} /> 
                <Marker coordinate={{ latitude: 33.996952, longitude: -6.871214 }} />
                <Marker coordinate={{ latitude: 45.488070, longitude: 9.164058 }} />
                <Marker coordinate={{ latitude: 45.458279039440725, longitude: 9.182092119008303 }} />
                <Marker coordinate={{ latitude: latitudeClusterMap, longitude: longitudeClusterMap }} />
                <Marker coordinate={{ latitude: latitudeClusterMap, longitude: longitudeClusterMap }} />
                <Marker coordinate={{ latitude: latitudeClusterMap, longitude: longitudeClusterMap }} />
                <Marker coordinate={{ latitude: latitudeClusterMap, longitude: longitudeClusterMap }} />
            </ClusterMap> 
        </View>
    );
}

export { Maps }

const styles = StyleSheet.create({
    container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
    },
    map: {
    ...StyleSheet.absoluteFillObject,
    },
});