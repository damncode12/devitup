import React from "react";
import { View, Text, Image , ActivityIndicator} from "react-native";
import poster from "../../asset/images/poster.jpg";
import styles from "./UserScreen.style";
import UserComp from "../UserScreencomp/UserComp";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
const UserScreen = () => {
    const { acesstoken, authtoken } = useContext(FetchContext);
    const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(
      authtoken,
      "me/"
    );
  
    useEffect(() => {
      console.log(authtoken);
      console.log(data);
    }, [acesstoken]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.profileCont}>
          <Image source={poster} style={styles.profileImg} />
        </View>
        <Text style={styles.text}>{data?.display_name}</Text>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            margin: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.text1}>{data?.followers?.total}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
      </View>
      <UserComp/>
    </View>
  );
};

export default UserScreen;
