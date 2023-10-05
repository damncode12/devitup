import React, { useEffect } from "react";
import { View, Text, ActivityIndicator , SafeAreaView , FlatList } from "react-native";
import styles from "./Yourtrack.style";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import useFetch from "../../hooks/useFetch";
import RecommCard from "../RecommCard/RecommCard";
import { useRouter } from "expo-router";

const Yourtrack = () => {
  const { authtoken } = useContext(FetchContext);
  const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(authtoken,
    "me/top/tracks/");
  useEffect(()=>{
    console.log(authtoken);
    console.log(data?.items?.[0]?.id);
  })
  return (
    <View >
      <Text style={styles.headtext}>Your Tracks</Text>
      {isLoading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <SafeAreaView>
            <FlatList
              data={data?.items}
              renderItem={({ item }) => <RecommCard item={item}/>}
              keyExtractor={(item) => item?.id}
              contentContainerStyle={{ columnGap: 20 }}
              showsHorizontalScrollIndicator = {false}
              horizontal
            />
          </SafeAreaView>
      )}
    </View>
  );
};

export default Yourtrack;
