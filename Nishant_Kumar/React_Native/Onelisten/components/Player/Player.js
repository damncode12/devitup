import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import FetchContext from "../../context/FetchContext";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useSearchParams } from "expo-router";
import poster from "../../asset/images/headphones.jpg";
import styles from "./Playercomp.style";
import replay from "../../asset/icons/replay.png"
import shuffle from "../../asset/icons/shuffle.png"
import backward from "../../asset/icons/backward-arrows-couple.png"
import forward from "../../asset/icons/next-button.png"
import play from "../../asset/icons/play-button.png";

const Player = () => {
  const params = useSearchParams();
  const { acesstoken, authtoken } = useContext(FetchContext);
  const [playing, setPlaying] = useState(true);
  const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(
    acesstoken,
    `tracks/${params.id}`
  );
  const playTrack = async (accessToken, trackUri) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      });
  
      if (response.ok) {
        console.log('Track playback started successfully');
      } else {
        console.error('Failed to start track playback:', response.status);
      }
    } catch (error) {
      console.error('Failed to start track playback:', error);
    }
  };


  useEffect(() => {
    console.log(data?.uri);
  }, []);

  return (
    <View style = {{alignItems:"center" , padding : 20}}>
      <View style = {styles.cardcontainer}>
        <Image source={{uri : data?.album?.images?.[0]?.url}} resizeMode="contain" style = {styles.cardImg}/>
      </View>
      <Text style = {styles.maintext}>{data?.album?.name.slice(0,20)}..</Text>
      <Text style = {styles.typetext}>{data?.album?.release_date}</Text>
      <View style = {{flexDirection : "row" ,marginTop:20 , justifyContent : "space-between",width:300, alignItems:"center" }}>
        <TouchableOpacity style = {{height:30 , width : 30}}><Image source={replay} resizeMode="contain"  style={{height:30 , width : 30}}/></TouchableOpacity>
        <View style = {{flexDirection:"row" , alignItems:"center" ,gap:9}}>
        <TouchableOpacity style = {{height:30 , width : 30}}>
        <Image source={backward}  resizeMode="contain"  style={{height:30 , width : 30}}/>
        </TouchableOpacity>
        <TouchableOpacity style = {{height:60 , width : 60}} onPress={()=>{playTrack(authtoken , data?.uri)}}>
        <Image source={play}  resizeMode="contain"  style={{height:60 , width : 60}}/>
        </TouchableOpacity>
        <TouchableOpacity style = {{height:30 , width : 30}}>
        <Image source={forward}  resizeMode="contain"  style={{height:30 , width : 30}}/>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style = {{height:30 , width : 30}}><Image source={shuffle}  resizeMode="contain"  style={{height:30 , width : 30}}/></TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;