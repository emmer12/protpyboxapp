import React,{useState} from 'react';
import { View,Text, StyleSheet,Dimensions } from 'react-native';
import gstyle from "../../style"
import {  Button } from 'react-native-paper';


 const { width, height } = Dimensions.get('window')

export default function Create({navigation}:any) {

  return (
    <View style={styles.con}>
         <View style={styles.box}>
            <Button  theme={{ roundness: 3 }} onPress={()=>navigation.navigate('CreateListing') } mode="contained">List</Button>   
        </View>

        <View style={styles.box}>
            <Button  theme={{ roundness: 3 }} onPress={()=>navigation.navigate('CreateRequest') } mode="contained" >Request</Button>   
        </View>      
    </View>
  );
}


const styles=StyleSheet.create({
  con:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  box:{
    padding:10,

  }
})