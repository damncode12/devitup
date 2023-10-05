import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headtext : {
        fontFamily : "DMBold",
        fontSize : 35
    },
    styletext : {
        fontFamily : "DMBold",
        color : "#6741FF",
        fontSize : 35
    },
    cardtext : {
        fontFamily : "DMMedium",
        color : "white",
        fontSize : 30,
        width : 230
    },
    cardcontainer : {
        marginTop : 10,
        height : 150,
        borderRadius : 9,
        flexDirection : "row",
        alignItems : "center",
        gap : 20 , 
        backgroundColor : "black",
        paddingHorizontal : 20
    },
    cardImg :{
        height : 100,
        width : 100 , 
        borderRadius : 9
    }
})

export default styles ;