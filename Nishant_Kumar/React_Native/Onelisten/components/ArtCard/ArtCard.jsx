import React from 'react'
import {View , Text ,Image , TouchableOpacity} from "react-native"
import poster from "../../asset/images/poster.jpg"
import styles from './Art.style'

const ArtCard = ({item}) => {
  return (
    <View style = {styles.newcont}>
        <TouchableOpacity style={styles.cardcontainer}>
          <Image
            source={{uri : item?.images?.[0]?.url}}
            style={styles.cardImg}
          />
        </TouchableOpacity>
        <Text style = {{fontFamily:"DMMedium"  , marginHorizontal : 5}} numberOfLines={2}>{item?.name}</Text>
    </View>
  )
}

export default ArtCard ;