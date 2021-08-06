import React,{useState,useEffect} from 'react';
import { View,Text, StyleSheet,Dimensions,FlatList, SafeAreaView,TouchableOpacity,StatusBar, ActivityIndicator } from 'react-native';
import gstyle from "../../style"
import { Empty, ProptyBox } from '../../components'
import Api from '../../api';
import { ListingNavigation } from '../../navigation/type';
import { ListingType } from '../type';

 const { width, height } = Dimensions.get('window')




export default function Listing(navigation:ListingNavigation) {

  const [listing, setListing] = React.useState([]); 
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
  

  const renderItem = ({ item }:any) => (
    <ProptyBox list={item} navigation={navigation} />
  );

  return (
     <SafeAreaView style={styles.container}>
      {
        loading
        ?
        <ActivityIndicator size="large" color='grey' style={{justifyContent:'center',alignItems:'center',flex:1
      }} /> 
      : listing.length < 1 ? (
        <Empty text="Empty Listings" />
      ) :
        <FlatList
        data={listing}
        renderItem={renderItem}
        keyExtractor={(item:ListingType) => item.id.toString()}
      />
      }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
})