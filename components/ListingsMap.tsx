import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {memo} from 'react';
// import MapView from 'react-native-map-clustering';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Colors from '@/constants/Colors';

interface Props {
    listings: any;
  }
  
  const INITIAL_REGION = {
    latitude: 21.5044,
    longitude: 83.8707,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };
  
const ListingsMap = memo(({ listings }: Props) => {

    const router = useRouter();
    const mapRef = useRef<any>(null);
  
    // When the component mounts, locate the user
    useEffect(() => {
      onLocateMe();
    }, []);

    const onMarkerSelected = (event: any) => {
        router.push(`/listing/${event.properties.id}`);
      };

      const onLocateMe = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        const region = {
          latitude: 21.5044 || location.coords.latitude,
          longitude: 83.8707 || location.coords.longitude,
          latitudeDelta: 7,
          longitudeDelta: 7,
        };
    
        mapRef.current?.animateToRegion(region);
      };

      // const renderCluster = (cluster: any) => {
      //   const { id, geometry, onPress, properties } = cluster;
    
      //   const points = properties.point_count;
      //   console.log("gemo",geometry);
      //   return (
      //     <Marker
      //       key={`cluster-${id}`}
      //       coordinate={{
      //         longitude: geometry.coordinates[0] as number,
      //         latitude: geometry.coordinates[1] as number,
      //       }}
      //       onPress={onPress}>
      //       <View style={styles.marker}>
      //         <Text
      //           style={{
      //             color: '#000',
      //             textAlign: 'center',
      //             fontFamily: 'mon',
      //           }}>
      //           {points}
      //         </Text>
      //       </View>
      //     </Marker>
      //   );
      // };
  

  return (
    <View style={defaultStyles.container}>
    <MapView
      ref={mapRef}
      // animationEnabled={false}
      style={StyleSheet.absoluteFillObject}
      initialRegion={INITIAL_REGION}
      // clusterColor="#fff"
      // clusterTextColor="#000"
      // renderCluster={renderCluster}
      >
      {/* Render all our marker as usual */}
      {listings.features.map((item: any) => (
        <Marker
          coordinate={{
            latitude: +item.properties.latitude,
            longitude: +item.properties.longitude,
          }}
          key={item.properties.id}
          onPress={() => onMarkerSelected(item)}>
          <View style={styles.marker}>
            <Text style={styles.markerText}>₹ {item.properties.price}</Text>
          </View>
        </Marker>
      ))}
    </MapView>
    <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
      <Ionicons name="navigate" size={24} color={Colors.light.primary} />
    </TouchableOpacity>
  </View>
  )
})


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon',
      fontWeight: 'bold',
    },
    locateBtn: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
  });
  
export default ListingsMap