import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import BottomSheet,  { BottomSheetView }  from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface Props {
    listings: any[];
    category: string;
  }
  

const ListingsBottomSheet = ({listings, category }:Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = React.useMemo(() => ['20%','100%'],[]);
    const [refresh, setRefresh] = useState<number>(0);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
      };
    

  return (
    <BottomSheet
     ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: Colors.light.tint}}
      enablePanDownToClose={false}
      index={1}
      style={styles.sheetContainer}
      >
        <View  style={styles.contentContainer}>
        <Listings listings={listings} category={category} refresh={refresh} />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: 'mon', fontWeight:'bold', color: '#fff' }}>Map</Text>
            <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
          </TouchableOpacity>
        </View>
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    absoluteView: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      alignItems: 'center',
    },
    btn: {
      backgroundColor: Colors.light.tint,
      padding: 14,
      height: 50,
      borderRadius: 30,
      flexDirection: 'row',
      marginHorizontal: 'auto',
      alignItems: 'center',
    },
    sheetContainer: {
      backgroundColor: '#fff',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
  });

export default ListingsBottomSheet