import React from 'react'
import {View , Text ,Image ,  TouchableOpacity} from "react-native"
import styles from './Header.style'

const Headerbtn = ({source , handlepress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlepress}>
        <Image source={source} style = {styles.btnImg} />
    </TouchableOpacity>
  )
}

export default Headerbtn