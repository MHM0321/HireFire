import React from 'react';
import {Tabs} from "expo-router";
import {AntDesign, Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {SimpleLineIcons} from "@expo/vector-icons";
import {Fontisto} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Layout = () => {

  return (
    <Tabs
      screenOptions={{
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: '#000000',
        tabBarActiveBackgroundColor: '#F5EDEE',
        tabBarInactiveTintColor: '#000000',
        tabBarInactiveBackgroundColor: '#FFFFFF',
      }}>

        <Tabs.Screen
            name="index"
            options={{title: "", headerShown: false, tabBarIcon: ({color}) => <Ionicons name="home-outline" size={24} color={color} /> }}
        />

        <Tabs.Screen
            name="chat"
            options={{title: "", headerShown: false, tabBarIcon: ({color}) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} /> }}
        />

        <Tabs.Screen
            name="rewind"
            options={{title: "", headerShown: false, tabBarIcon: ({color}) => <MaterialIcons name="access-time" size={24} color={color} /> }}
        />

        <Tabs.Screen
            name="settings"
            options={{title: "", headerShown: false, tabBarIcon: ({color}) => <Ionicons name="settings-outline" size={24} color={color} /> }}
        />

        <Tabs.Screen
            name="hidden/customerToWorker1"
            options={{headerShown: false, href: null}}
        />

    </Tabs>
  );
}
export default Layout;
