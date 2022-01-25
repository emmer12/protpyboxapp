import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import gstyle from "../../style";
import { ProptyBox, RequestCard, Banner } from "../../components";
import Api from "../../api";

const { width, height } = Dimensions.get("window");

export default function Home({ navigation }: any) {
  const [listing, setListing] = React.useState<any[]>([]);
  const [requests, setRequest] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [lastPage,setLastPage]=React.useState(0)

  useEffect(() => {
    getRequest();

    const willFocusSubscription = navigation.addListener('focus', () => {
      getRequest();
  });
  }, []);

  useEffect(() => {
    // getListing();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getListing()
  });
  }, [page]);

  const getListing=()=>{
    let url=`/all-listing?page=${page}&user=1`
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

  const getRequest = () => {
    setLoading(true);
    Api.get("/all-request?limit=10").then((res) => {
      setLoading(false);
      setRequest(res.data.data);
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <ProptyBox list={item} navigation={navigation} />
  );
  const requestItem = ({ item }: any) => (
    <RequestCard from="home" request={item} />
  );

  return (
    <SafeAreaView style={{flex:1,paddingBottom:120}}>
      <View >
        <Banner
          type="home"
          position="center"
          search={true}
          text="Find a useful space in 24 hours"
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="grey"
            style={{ justifyContent: "center", alignItems: "center", flex: 1,marginTop:50 }}
          />
        ) : (
          <FlatList
            ListHeaderComponent={
              <FlatList
                snapToInterval={width - 30}
                horizontal={true}
                data={requests}
                renderItem={requestItem}
                keyExtractor={(item:any) => `request-${item?.id?.toString()}`}
                />
              }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            // onRefresh={()=>getListing()}
            // refreshing={true}
            data={listing}
            renderItem={renderItem}
            keyExtractor={(item) => `listing-${item.id?.toString()}`}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5895F9",
    padding: 10,
  },
  requestCon: {},

  text: {
    color: "#fff",
  },
  req: {
    height: 200,
    width: 300,
    backgroundColor: "#ddd",
    borderRadius: 20,
    margin: 10,
  },
});
