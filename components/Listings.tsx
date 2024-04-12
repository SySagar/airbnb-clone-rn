import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {FadeInRight,FadeOutLeft} from 'react-native-reanimated';

interface Props {
    listings: any[];
    category: string;
}

const Listings = ({listings:items,category}:Props) => {

  const [loading,setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

    useEffect(()=>{
        console.log("reload listing",items.length);
        setLoading(true);

        setTimeout(()=>{
          setLoading(false);
        },200)
    },[category]);

    const renderRow: ListRenderItem<any> = ({item})=>(
      <Link
      asChild
      href={`/listing/${item.id}`}
      >

        <TouchableOpacity>
          <Animated.View style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
          >
          <Image
          style={styles.image}
          source={{uri:item.medium_url}}
          />
          <TouchableOpacity
          style={{
            position:'absolute',
            top:30,
            right:30,
            backgroundColor:'white',
            padding:5,
            borderRadius:20
          }}
          >
            <Ionicons name="heart" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection:'row',
              position:'relative',
              justifyContent:'space-between',
            }}
            >
              <Text>{item.name}</Text>
              <View
              style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:1,
              }}
              >
                <Ionicons name="star" size={14} color="black" />
                <Text
                style={{
                  fontFamily:'mon',
                  color:'#000',
                  fontWeight:'700'
                }}
                >
            {item.review_scores_rating/20}
            </Text>
              </View>
            </View>

            <Text>{item.room_type}</Text>

            <View
            style={{
              flexDirection:'row',
              gap:4,
            }}
            >
              <Text style={{fontFamily:'mon',fontWeight:'bold'}}>₹ {item.price}</Text>
              <Text>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

      </Link>
    )

  return (
    <View style={defaultStyles.container}>
      <FlatList
      renderItem={renderRow}
      ref={listRef}
        data={loading?[]:items}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing:{
    padding:16,
    paddingHorizontal:10,
    paddingVertical:10,
    gap:5,
  },
  image:{
    width:'100%',
    height:300,
    borderRadius:10
  }
})

export default Listings