import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Searchbar, TouchableRipple } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Api from "../../api";
import { Empty, ProptyBox, RequestCard } from "../../components";
import theme from "../../theme";
import { ListingType } from "../type";

interface SearchProps {}

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: theme.colors.primary }}
    style={{ backgroundColor: "white" }}
    labelStyle={{ color: "#333", fontWeight: "800" }}
  />
);

const Search = (props: SearchProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [requests, setRequest] = React.useState([]);
  const [listing, setListing] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [rLoading, setRLoading] = React.useState(false);

  const navigation = useNavigation();
  const route=useRoute()

  const [routes] = React.useState([
    { key: "list", title: "Listings" },
    { key: "request", title: "Requests" },
  ]);

  const renderItem = ({ item }: any) => (
    <ProptyBox list={item} navigation={navigation} />
  );

  const requestItem = ({ item }: any) => (
    <RequestCard navigation={navigation} request={item} from="request" />
  );

  const ListingRoute = () => (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="grey"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        />
      ) : listing.length < 1 ? (
        <Empty text="Empty Listings" />
      ) : (
        <FlatList
          data={listing}
          renderItem={renderItem}
          keyExtractor={(item: ListingType) => item.id.toString()}
        />
      )}
    </View>
  );

  const RequestRoute = () => (
    <View style={{ flex: 1 }}>
      {rLoading ? (
        <ActivityIndicator
          size="large"
          color="grey"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        />
      ) : requests.length < 1 ? (
        <Empty text="Empty Requests" />
      ) : (
        <FlatList
          data={requests}
          renderItem={requestItem}
          keyExtractor={(item: any) => item.id.toString()}
        />
      )}
    </View>
  );

  const renderScene = SceneMap({
    list: ListingRoute,
    request: RequestRoute,
  });

  const getList = () => {
    if (searchQuery == "") return;
    setLoading(true);
    Api.get("/search-listing", {
      params: { s: searchQuery },
    }).then((res) => {
      setLoading(false);
      setListing(res.data.data);
    });
  };

  const getRequest = () => {
    if (searchQuery == "") return;
    setRLoading(true);
    Api.get("/search-request", {
      params: { s: searchQuery },
    }).then((res) => {
      setRLoading(false);
      setRequest(res.data.data);
    });
  };

  useEffect(() => {
     if (route?.params?.sq) {
         setSearchQuery(route.params.sq)
     }
  },[]);


  useEffect(()=>{
    search()
  },[searchQuery])

  // const getRequest = () => {
  //   Api.get("/all-listing?page=1").then((res) => {
  //     setRequest(res.data.data);
  //   });
  // };

  const search = () => {
    getList();
    getRequest();
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableRipple onPress={()=>navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={26} style={{padding:10}} />
        </TouchableRipple>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={() => search()}
          onSubmitEditing={() => search()}
          style={{ width: "85%", elevation: 0 }}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'center'
  },

});
