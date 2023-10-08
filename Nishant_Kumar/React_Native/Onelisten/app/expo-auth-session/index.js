import React from "react";
import { View, Text, SafeAreaView, ScrollView , Button } from "react-native";
import { Stack } from "expo-router";
import Headerbtn from "../../components/headerbtn/Headerbtn";
import search from "../../asset/icons/newsear.png";
import menu from "../../asset/icons/menu.png";
import Playlist from "../../components/Playlist/Playlist";
import Category from "../../components/Category/Category";
import Yourtrack from "../../components/YourTrack/Yourtrack";
import Artist from "../../components/Artists/Artist";
import { useRouter } from "expo-router";
import Profilebtn from "../../components/Profilebtn/Profilebtn";
import Playcomp from "../../components/Playcomp/Playcomp";

const index = () => {
  const router = useRouter();
  return (
    <View style={{ backgroundColor: "#FFFFF0", height: "100%" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFFFF0" },
          headerRight: () => (
            <Headerbtn
              source={search}
              handlepress={() => {
                router.push("/Searchpage");
              }}
            />
          ),
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Profilebtn
              handlepress={() => {
                router.push("/User");
              }}
            />
          ),
        }}
      />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: 20, gap: 20 }}>
            <Playlist />
            <Category />
            <Yourtrack />
            <Artist />
            <Playcomp/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default index;
