import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import styles from "./Profilebtn.style";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import ArtCard from "../ArtCard/ArtCard";
import poster from "../../asset/images/poster.jpg"

const Profilebtn = ({handlepress}) => {
  const { acesstoken, authtoken } = useContext(FetchContext);
  const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(
    authtoken,
    "me"
  );

  useEffect(() => {
    console.log(authtoken);
    console.log(data);
  }, [acesstoken]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <>
          <View style={styles.newcont}>
            <TouchableOpacity style={styles.cardcontainer} onPress={handlepress}>
              <Image
                source={(!data?.images?.[0])?(poster):{uri : data?.images?.[0]?.url}}
                style={styles.cardImg}
              />
            </TouchableOpacity>
            <Text
              style={{ fontFamily: "DMBold", marginHorizontal: 5 }}
              numberOfLines={2}
            >
              {data?.display_name}
            </Text>
          </View>
        </>
      )}
    </>
  );
};

export default Profilebtn;
