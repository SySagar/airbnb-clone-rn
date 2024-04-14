import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Page = () => {

  const [category, setCategory] = React.useState<string>("Tiny Homes" as string);
  const items = useMemo(() => listingData as any,[])
  const getoItems = useMemo(() => listingDataGeo, []);
  const onDataChanged = (category:string)=>{
    setCategory(category);
  }

  return (
    <View style={{flex:1,marginTop:140}}>
      <Stack.Screen 
      options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
      }}
      />
      <ListingsMap listings={getoItems} />
      {/* <ListingsBottomSheet listings={items} category={category} /> */}
    </View>
  );
};

export default Page;
