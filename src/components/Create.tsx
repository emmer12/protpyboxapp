import * as React from 'react';
import { View, StyleSheet,Animated,TouchableOpacity } from 'react-native';
import {Add} from "../icons"



interface CreateI {
      color:string
    }
const Create=({color}:CreateI)=>{
   
  const had=()=>{
      alert()
  }
  
   return (
    <TouchableOpacity style={styles.container} onPress={had}>
      <Add color={color} />
   </TouchableOpacity>
   )
}

const styles=StyleSheet.create({
   container:{
       zIndex:99
   },
  
})


export default Create;
