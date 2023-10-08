import React from "react";
import search from "../../asset/icons/search.png";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./Search.style";
import SearchCard from "../SearchCard/SearchCard";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [data, setdata] = useState("");
  const [qwery, setqwery] = useState("");

  const { acesstoken } = useContext(FetchContext);

  const handlepress = async () => {
    console.log(qwery);
    console.log(acesstoken);
    setisLoading(true);
    const api_url = `https://api.spotify.com/v1/search?q=${qwery}a&type=track`;

    const options = {
      headers: {
        Authorization: `Bearer ${acesstoken}`,
      },
    };

    try {
      seterror(false);
      const response = await axios.request(api_url, options);
      console.log(response.data?.tracks?.items?.[0]?.album?.images?.[0]?.url);
      setdata(response.data?.tracks);
      setisLoading(false);
    } catch (error) {
      seterror(true);
      console.log("Something went wrong");
    }
  };
  return (
    <>
      <View
        style={{
          backgroundColor: "#B2BEB5",
          borderRadius: 10,
          height: 70,
          padding: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <TextInput
          style={{
            height: 60,
            width: 300,
            fontFamily: "DMMedium",
          }}
          onChangeText={(newtext) => setqwery(newtext)}
          placeholder="Search here"
        />
        <TouchableOpacity
          style={{ width: 25, height: 25 }}
          onPress={() => handlepress()}
        >
          <Image source={search} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
      {/* Search Component */}

      {/* Search Results */}

      <View style={styles.container}>
        <Text style={styles.headtext}>Search Results</Text>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data ? (
          data?.items?.map((item) => <SearchCard key={item?.id} item={item} />)
        ) : ( <View style = {{justifyContent : "center" , alignItems : "center" , height : 100}}>
          <Text style={styles.headtext}>Nothing to show</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Search;
