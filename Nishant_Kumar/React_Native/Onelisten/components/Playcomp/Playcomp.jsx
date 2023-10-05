import React from 'react'
import {View , Text , TouchableOpacity , Image , SafeAreaView , FlatList , ActivityIndicator} from "react-native"
import styles from './Playcomp.style';
import poster from "../../asset/images/poster.jpg";
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import FetchContext from '../../context/FetchContext';

const Playcomp = ({item}) => {

  const {acesstoken} = useContext(FetchContext);
    const {data ,isLoading , error , setdata , seterror , setisLoading} = useFetch(acesstoken , 'browse/featured-playlists?country=in')
  return (
        <View >
        <Text style={styles.headtext}>Featured Playlists</Text>
        {isLoading ? (
          <ActivityIndicator size="large"></ActivityIndicator>
        ) : (
          <SafeAreaView>
              <FlatList
                data={data?.playlists?.items}
                renderItem={({ item }) => <PlaylistCard item={item}/>}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{ columnGap: 20 }}
                showsHorizontalScrollIndicator = {false}
                horizontal
              />
            </SafeAreaView>
        )}
      </View>
  )
}

export default Playcomp;