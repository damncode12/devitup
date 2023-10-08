import React from "react";
import { View, Text, Image, ActivityIndicator , TouchableOpacity } from "react-native";
import styles from "./Playlist.style";
import useFetch from "../../hooks/useFetch";
import poster from "../../asset/images/poster.jpg";
import { useEffect } from "react";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import { useRouter } from "expo-router";

const Playlist = () => {

    const {acesstoken} = useContext(FetchContext);
    const {data ,isLoading , error , setdata , seterror , setisLoading} = useFetch(acesstoken , 'browse/featured-playlists?country=in')

//   const { data, isLoading, error, setdata, seterror, setisLoading } =
//     useFetch(token);

    const router = useRouter();

useEffect(() => {
  console.log(data?.name);
}, [acesstoken]);

  const random = Math.floor(Math.random() * 10);

  return (
    <View style={styles.container}>
      <Text style={styles.headtext}>Listen Your</Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={styles.headtext}>Favorite</Text>
        <Text style={styles.styletext}>Playlist</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.cardcontainer} onPress={()=>{router.push(`/Playlists/${data?.playlists?.items?.[random]?.id}`)}}>
          <Image
            source={{uri : data?.playlists?.items?.[random]?.images?.[0]?.url}}
            style={styles.cardImg}
          />
          <Text style={styles.cardtext} >{data?.playlists?.items?.[random]?.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Playlist;
