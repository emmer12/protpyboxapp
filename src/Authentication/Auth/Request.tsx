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
import { RequestCard,Empty } from "../../components";
import { ActivityIndicator } from "react-native-paper";
import Api from "../../api";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Request() {
  const [requests, setRequest] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigation=useNavigation()

  const requestItem = ({ item }: any) => (
    <RequestCard navigation={navigation} request={item} from="request" />
  );
  useEffect(() => {
    getListing()
 }, [])

  const getListing=()=>{
    setLoading(true)
    Api.get('/all-request-limit-by-location').then(res=>{
      console.log(res.data.data,'yooo')
      setRequest(res.data.data)
      setLoading(false) 
    }).catch(()=>{
      alert('error')
    })
  }
  

  return (
    <View style={{flex:1}}>
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
          keyExtractor={(item) => item.toString()}
        />
      )}
    </View>
  );
}
