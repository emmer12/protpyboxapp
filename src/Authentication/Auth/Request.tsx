import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import gstyle from "../../style";
import { RequestCard,Empty, Banner } from "../../components";
import { ActivityIndicator } from "react-native-paper";
import Api from "../../api";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Request() {
  const [requests, setRequest] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigation=useNavigation()
  const route=useRoute()
  
  
  let guest=route?.params?.guest;


  const requestItem = ({ item }: any) => (
    <RequestCard request={item} from="request" guest={guest} />
  );
  useEffect(() => {
    getRequest()
    const willFocusSubscription = navigation.addListener('focus', () => {
      getRequest()
  });
 }, [])


  const getRequest=()=>{
    setLoading(true)
    Api.get('/all-request').then(res=>{
      setRequest(res.data.data)
      setLoading(false) 
    }).catch(()=>{
      alert('error')
    })
  }
  

  return (
    <View style={{flex:1}}>
      <Banner search={false} type="page" position="flex-start" text="Requests" />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="grey"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        />
      ) : requests.length < 1 ? (
        <Empty text="Empty Requests" />
      ) : (
        <FlatList
          snapToInterval={width}
          data={requests}
          renderItem={requestItem}
          keyExtractor={(item:any) => item.id.toString()}
        />
      )}
    </View>
  );
}
