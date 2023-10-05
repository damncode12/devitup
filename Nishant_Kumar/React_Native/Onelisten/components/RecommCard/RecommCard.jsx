import React from 'react'
import {View , Text ,Image , TouchableOpacity} from "react-native"
import poster from "../../asset/images/poster.jpg"
import styles from './RecommCard.style'
import { useRouter } from 'expo-router'

const RecommCard = ({item , handlepress}) => {

  const router = useRouter();

  return (
    <View>
        <TouchableOpacity style={styles.cardcontainer} onPress={()=>router.push(`/Player/${item?.id}`)}>
          <Image
            source={{uri : item?.album?.images?.[0]?.url}}
            style={styles.cardImg}
          />
        </TouchableOpacity>
        <Text style = {{fontFamily:"DMMedium"  , marginHorizontal : 5}} numberOfLines={2}>{item?.album?.name.slice(0,15)}..</Text>
    </View>
  )
}

export default RecommCard