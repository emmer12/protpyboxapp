import * as React from 'react';
import { View, StyleSheet,Animated,TouchableOpacity,Text,Dimensions } from 'react-native';
import {Add,Chat} from "../icons"


const {width}=Dimensions.get('window')


interface CreateI {
      color:string,
      open:boolean
    }
const Create=({color,open}:CreateI)=>{
   

  
   return (
    <View style={styles.container}>
      <View style={styles.item}>
          <Text>List</Text> 
      </View>
      <Add color={color} /> 
   </View>
   )
}

const styles=StyleSheet.create({
   container:{
       position:'absolute',
       alignItems:'center'
   },
   item:{
     position:'absolute',
     backgroundColor:'red',
     padding:10,
     bottom:0,
     height:width,
     width,
     zIndex:999
     
   }
  
})


export default Create;
