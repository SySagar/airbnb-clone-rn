import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingData from "@/assets/data/airbnb-listings.json";

const Page = () => {

  const [category, setCategory] = React.useState<string>("Tiny Homes" as string);
  const items = useMemo(() => listingData as any,[])
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
      <Listings 
      listings={items}
      category={category}
      />
    </View>
  );
};

export default Page;
