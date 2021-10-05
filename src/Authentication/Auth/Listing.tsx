import React,{useState,useEffect} from 'react';
import { View,Text, StyleSheet,Dimensions,FlatList, SafeAreaView,TouchableOpacity,StatusBar, ActivityIndicator } from 'react-native';
import gstyle from "../../style"
import { Banner, Empty, ProptyBox } from '../../components'
import Api from '../../api';
import { ListingNavigation } from '../../navigation/type';
import { ListingType } from '../type';
import { Title } from 'react-native-paper';
import theme from '../../theme';
import { useRoute } from '@react-navigation/core';

 const { width, height } = Dimensions.get('window')




export default function Listing({navigation}:any) {

  const [listing, setListing] = React.useState<any[]>([]); 
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [lastPage,setLastPage]=React.useState(0)
  const route=useRoute()

  let guest=route?.params?.guest;

  useEffect(() => {
    getListing()
 }, [page])

  const getListing=()=>{
    let url=guest ? `/all-listing?page=${page}` : `/all-listing?page=${page}&user=1`
    console.log(url)
    page == 1 && setLoading(true)
    Api.get(url).then(res=>{
    setLastPage(res.data.meta.last_page);
    setLoading(false) 
      let newVal:any=res.data.data;
      setListing([...listing,...newVal]);
    })
  }


const handleLoadMore=()=>{
  if (page > lastPage) return;
  setPage(page+1)
}
  

  const renderItem = ({ item }:any) => (
    <ProptyBox list={item} navigation={navigation} guest={guest} />
  );

  return (
     <SafeAreaView style={styles.container}>
        <Banner search={false} type="page" position="flex-start" text="Listings" />
    
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
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