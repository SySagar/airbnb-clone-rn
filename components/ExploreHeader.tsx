import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import { useRef } from "react";
import { useState } from "react";
import * as Haptics from 'expo-haptics';

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];

  interface Props {
    onCategoryChanged: (category: string) => void;
  }

const ExploreHeader = ({ onCategoryChanged }: Props) => {

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
  
    const selectCategory = (index: number) => {
      const selected = itemsRef.current[index];
      setActiveIndex(index);
      selected?.measure((x) => {
        scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
      });

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onCategoryChanged(categories[index].name);
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name="search" size={20} color="black" />
                <View>
                <Text
                style={{fontSize: 15,fontWeight:'bold', fontFamily:'mon'}}
                >Where to?</Text>
                <Text
                 style={{fontSize: 13,fontWeight:'700', fontFamily:'mon', color:Colors.light.grey}}
                >Anywhere Any week</Text>
                </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>

        </View>
        
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 16,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
              onPress={() => selectCategory(index)}>
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? '#000' : Colors.light.grey}
              />
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 130,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    color: "black",
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
  searchBtn:{
    backgroundColor: '#fff',
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: 300,
    padding: 8,
    borderRadius: 30,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon',
    color: Colors.light.grey,
    fontWeight: '700',
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon',
    fontWeight: 'bold',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
