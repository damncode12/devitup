import React from 'react'
import Usercard from "../UserCard/Usercard";
import { useContext } from "react";
import FetchContext from "../../context/FetchContext";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { View, Text, Image , ActivityIndicator} from "react-native";
import styles from './UserComp.style';

const UserComp = () => {
    
const { acesstoken, authtoken } = useContext(FetchContext);
const { data, isLoading, error, setdata, seterror, setisLoading } = useFetch(
  authtoken,    
  "me/top/tracks"
);
useEffect(() => {
  console.log(authtoken);
  console.log(data?.items);
}, [acesstoken]);

return (
    <View style={{ marginTop: 20 }}>
        <Text style={styles.maintext}>Recently played</Text>
        <View style={{flexDirection :"row" , flexWrap : "wrap" ,  justifyContent : "center"}}>
          {isLoading?(<ActivityIndicator/>):(
            data?.items?.map((item)=>(
                <Usercard item = {item} key={item?.id}/>
            ))
          )}
        </View>
    </View>
  )
}

export default UserComp
