import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        // padding:10,
        paddingTop:25,
        backgroundColor: '#EEF4FF',
    },

    input:{
        backgroundColor:'#EEF4FF',
        color:'#444'
    },
    formControl:{
        marginVertical:10,
    },
    details:{
        // flex:1,
        flexDirection:'row',
        paddingVertical:15

    },
    right:{
        width:'40%',
        alignItems: 'flex-end',
        justifyContent:'flex-end',
        flexDirection:'row',
        
    },
    left:{
        width:'60%',
    },
    row:{
        flexDirection:'row',
        padding:10,
        paddingVertical:15,
    },

    rowTint:{
        backgroundColor:"#EEF4FF"
    },
    p50:{
        width:'50%'
    }
})