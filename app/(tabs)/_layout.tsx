import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarLabelStyle: {
          fontFamily: "mon",
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: "Trips",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="airballoon"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
