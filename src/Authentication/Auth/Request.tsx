import React,{useState} from 'react';
import { View,Text, StyleSheet,Dimensions ,Image,FlatList} from 'react-native';
import gstyle from "../../style"
import { RequestCard,Banner } from './../../components'


 const { width, height } = Dimensions.get('window')

export default function Request() {
  const [requests, setRequest] = React.useState([1,2,3,4,5]); 

  const requestItem = ({ item }:any) => (
    <RequestCard request={item} from="request" />
 );


  return (
    <View>
      <FlatList
          snapToInterval={width}
          data={requests}
          renderItem={requestItem}
          keyExtractor={(item) => item.toString()}
         />       
    </View>
  );
}
