import React from 'react'
import {View , Text , TouchableOpacity , Image} from "react-native"
import styles from './Playcard.style'
import poster from "../../asset/images/poster.jpg";
import { useRouter } from 'expo-router';

const Playcard = ({item}) => {

  const router = useRouter();

  return (
    <TouchableOpacity style={styles.song} onPress={()=>router.push(`/Player/${item?.track?.id}`)}>
          <View style = {{flexDirection : "row" , alignItems : "center"}}>
          <View>
            <Image
              source={{uri : item?.track?.album?.images?.[0]?.url}}
              resizeMode="contain"
              style={styles.songImg}
            />
          </View>
          <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
            <Text style={styles.text1}>{item?.track?.album?.name.slice(0,15)}..</Text>
            <Text style={styles.text2}>{item?.track?.album?.artists?.[0]?.name}</Text>
          </View>
          </View>
          <Text style = {styles.text2}>{Math.floor((item?.track?.duration_ms)/216000)} : {String(((item?.track?.duration_ms)/216000)).slice(2,4)}</Text>
    </TouchableOpacity>
  )
}

export default Playcard