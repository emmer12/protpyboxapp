import React,{useState,useContext} from 'react';
import { View,Text, StyleSheet,Dimensions } from 'react-native';
import gstyle from "../../style"
import {  Button } from 'react-native-paper';
import {AlertContext} from '../../context/GlobalAlert'
import AuthContext from '../../store/context';



 const { width, height } = Dimensions.get('window')

export default function Create({navigation}:any) {

  const { signOut } = React.useContext(AuthContext);
//   onPress={()=>
//     navigation.navigate({
//         name: 'UploadImage',
//         params:{
//         list:{
//            id:66,
//          }
//    },
//  })}
  return (
    
    <View style={styles.con}>
         <View style={styles.box}>
            <Button  theme={{ roundness: 3 }} onPress={()=>navigation.navigate('CreateListing')} mode="contained">List</Button>   
        </View>

        <View style={styles.box}>
            <Button  theme={{ roundness: 3 }} onPress={()=>navigation.navigate('CreateRequest') } mode="contained" >Request</Button>   
        </View>  

        <View style={styles.box}>
            <Button  theme={{ roundness: 3 }} color="red" onPress={signOut} mode="contained" >Logout</Button>   
        </View>     
    </View>
  );
}
// 

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