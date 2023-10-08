import React, { useEffect } from "react";
import { View, Text, ActivityIndicator , SafeAreaView , FlatList } from "react-native";
import styles from "./Category.style";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import useFetch from "../../hooks/useFetch";
import RecommCard from "../RecommCard/RecommCard";

const Category = () => {
  const { acesstoken } = useContext(FetchContext);
  const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(
    acesstoken,
    "recommendations?seed_genres=indian+%2C+hard-rock&seed_tracks=6IMSEuBlYCq516sYSj71uA"
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headtext}>Recommended</Text>
      {isLoading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <SafeAreaView>
            <FlatList
              data={data?.tracks}
              renderItem={({ item }) => <RecommCard item={item} />}
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

export default Category;
