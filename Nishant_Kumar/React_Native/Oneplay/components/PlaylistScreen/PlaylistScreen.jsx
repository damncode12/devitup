import React from "react";
import { View, Text, Image, TouchableOpacity , ActivityIndicator } from "react-native";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import styles from "./PlaylistScreen.style";
import play from "../../asset/icons/play-button.png";
import shuffle from "../../asset/icons/shuffle.png";
import plus from "../../asset/icons/plus.png";
import Playcard from "../Playcard/Playcard";

const PlaylistScreen = ({ id }) => {
  const token = id;

  const { acesstoken } = useContext(FetchContext);
  const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(
    acesstoken,
    `playlists/${token}`
  );

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <View style={styles.maincont}>
        <View style={styles.cardcontainer}>
          <Image
            style={styles.cardImg}
            resizeMode="contain"
            source={{ uri: data?.images?.[0]?.url }}
          ></Image>
        </View>
        {/* <Text style = {styles.text}>{data?.name}</Text> */}
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={styles.play}>
          <View>
            <Image source={play} resizeMode="contain" style={styles.playImg} />
          </View>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.play1}>
          <View>
            <Image
              source={shuffle}
              resizeMode="contain"
              style={styles.playImg}
            />
          </View>
          <Text style={styles.text1}>Shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.play1}>
          <View>
            <Image source={plus} resizeMode="contain" style={styles.playImg} />
          </View>
          <Text style={styles.text1}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        {isLoading ? (<ActivityIndicator/>) : (
          data?.tracks?.items.map((item)=>(
            <Playcard item = {item}  key = {item?.track?.id}/>
          ))
        )}
      </View>
    </>
  );
};

export default PlaylistScreen;
