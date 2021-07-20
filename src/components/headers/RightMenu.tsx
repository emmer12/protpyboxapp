import * as React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { Text,Title,Searchbar,Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


const Right=()=>{
  
   return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
         <Ionicons name="md-notifications" size={26} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
        <Ionicons name="md-search" size={26} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} >
        <Ionicons name="md-list" size={26} color="grey" />
        </TouchableOpacity>
   </View>
   )
}

const styles=StyleSheet.create({
    container:{
       flex: 1,
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'

    },
    item:{
        color:'red',
        backgroundColor:'#f6f8f9',
        borderRadius:10,
        marginHorizontal:3,
        textAlign:'center',
        alignSelf:'center',
        padding:5,
        

    }
   
 })



export default Right;
