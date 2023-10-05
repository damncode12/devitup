import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import poster from "../../asset/images/headphones.jpg";
import styles from "./User.style";
import { useRouter } from "expo-router";

const Usercard = ({ item, handlepress }) => {
  const router = useRouter();

  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity
        style={styles.cardcontainer}
        onPress={() => router.push(`/Player/${item?.id}`)}
      >
        <Image
          source={{ uri: item?.album?.images?.[0]?.url }}
          style={styles.cardImg}
        />
      </TouchableOpacity>
      <Text
        style={{ fontFamily: "DMMedium", marginHorizontal: 5 }}
        numberOfLines={2}
      >
        {item?.album?.name.slice(0, 15)}..
      </Text>
    </View>
  );
};

export default Usercard;
