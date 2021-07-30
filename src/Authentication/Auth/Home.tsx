import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView,SafeAreaView,FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import gstyle from "./../../style"
import { ProptyBox,RequestCard,Banner } from './../../components'
import Api from '../../api';


const { width, height } = Dimensions.get('window')

export default function Home({navigation}:any) {


  const [listing, setListing] = React.useState([]); 
  const [requests, setRequest] = React.useState([{id:1},{id:2},{id:3}]); 
  const [loading, setLoading] = React.useState(false); 

  useEffect(() => {
    getListing()
}, [])



const getListing=()=>{
  setLoading(true)
  Api.get('/all-listing-for-guest?page=1').then(res=>{
  setLoading(false) 
    setListing(res.data.data)
  })
}



const renderItem = ({ item }:{item:{id:number}}) => (
  <ProptyBox list={item} navigation={navigation} />
);
const requestItem = ({ item }:any) => (
   <RequestCard from="home" request={item} />
);


  return (
    <SafeAreaView>
    <ScrollView>
      <View>
          <Banner search={true} text="Find a useful space in 24 hours" />


        <View style={styles.requestCon}>
        <FlatList
          snapToInterval={width-30}
          horizontal={true}         
          data={requests}
          renderItem={requestItem}
          keyExtractor={(item) => `request-${item.id?.toString()}`}
         />  
        </View>

        <View>
          <FlatList
          data={listing}
          renderItem={renderItem}
          keyExtractor={(item) => `listing-${item.id?.toString()}`}
         />
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5895F9',
    padding: 10,
  },
  requestCon: {

  },

  text: {
    color:'#fff',
  },
  req:{
    height:200,
    width:300,
    backgroundColor:'#ddd',
    borderRadius:20,
    margin:10

  }
})