import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cardtext : {
        fontFamily : "DMMedium",
        color : "black",
        fontSize : 20,
        width : 240
    },
    arttext : {
        fontFamily : "DMMedium",
        color : "black",
        fontSize : 15,
        width : 240
    },
    cardcontainer : {
        marginTop : 10,
        height : 100,
        borderRadius : 9,
        flexDirection : "row",
        alignItems : "center",
        gap : 20 , 
        backgroundColor : "#E5E4E2",
        paddingHorizontal : 20
    },
    cardImg :{
        height : 80,
        width : 80 , 
        borderRadius : 9
    }
})

export default styles ;