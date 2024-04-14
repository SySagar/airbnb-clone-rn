import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Listings from './Listings';

interface Props {
    listings: any[];
    category: string;
  }
  

const ListingsBottomSheet = ({listings, category }:Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = React.useMemo(() => ['10%','100%'],[]);

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{flex:1}}>
        <Listings listings={listings} category={category} />
        </View>
    </BottomSheet>
  )
}

export default ListingsBottomSheet