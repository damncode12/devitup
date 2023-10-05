import { StyleSheet } from "react-native";

const styles  = StyleSheet.create({
    maincont :{
        justifyContent : 'center',
        alignItems : 'center',
    },
    cardImg :{
        height : 180,
        width : 350,
        borderRadius : 9,
    },
    playImg :{
        height : 20,
        width : 20,
        borderRadius : 9,
    },
    songImg :{
        height : 50,
        width : 50,
        borderRadius : 9,
    },
    text :{
        fontFamily : "DMBold",
        fontSize : 15,
        color : "white",
        margin : 10
    },
    text1 :{
        fontFamily : "DMBold",
        fontSize : 20,
        color : "black",
    },
    text2 :{
        fontFamily : "DMBold",
        fontSize : 12,
        color : "black",
    },
    play : {
        backgroundColor : "#FA8713",
        width : 80,
        height : 50,
        borderRadius : 9,
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "row"
    },
    song : {
        height : 80,
        borderRadius : 9,
        alignItems : "center",
        flexDirection : "row",
        justifyContent : "space-between"
    },
    play1 : {
        width : 80,
        height : 50,
        borderRadius : 9,
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "row"
    }
})

export default styles