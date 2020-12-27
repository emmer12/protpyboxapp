import React,{useState} from 'react';
import { View,Text, StyleSheet,Dimensions ,Image} from 'react-native';
import gstyle from "../../style"


 const { width, height } = Dimensions.get('window')

export default function Request() {

  return (
    <View>
      <Text>Welcome Request</Text> 
      <Image
      style={{ width, height: height * 0.5 }}
      source={require('./../../../assets/1.jpg')}
    />        
    </View>
  );
}
