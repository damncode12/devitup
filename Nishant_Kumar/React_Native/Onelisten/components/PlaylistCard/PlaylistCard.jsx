import React from 'react'
import {View , Text ,Image , TouchableOpacity} from "react-native"
import poster from "../../asset/images/poster.jpg"
import styles from './PlaylistCard.style'
import { useRouter } from 'expo-router'

const PlaylistCard = ({item , handlepress}) => {

  const router = useRouter();

  return (
    <View>
        <TouchableOpacity style={styles.cardcontainer} onPress={()=>router.push(`/Playlists/${item?.id}`)}>
          <Image
            source={{uri : item?.images?.[0]?.url}}
            style={styles.cardImg}
          />
        </TouchableOpacity>
        <Text style = {{fontFamily:"DMMedium"  , marginHorizontal : 5}} numberOfLines={2}>{item?.name.slice(0,15)}..</Text>
    </View>
  )
}

export default PlaylistCard ;