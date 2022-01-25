import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Chat } from "../../icons";
import { Avatar, Title } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Api, { baseURL } from "../../api";
import { RequestCard, Verified } from "../../components";
import { ProptyBox } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../../theme";
import { Colors } from "react-native/Libraries/NewAppScreen";

const { width, height } = Dimensions.get("window");

interface UserProps {
  request: readonly any[] | null | undefined;
  fullname: string;
  listing: Array<{}>;
  gender: string;
  age: string;
}

export default function Profile({ navigation }: { navigation: any }) {
  const [user, setUser] = React.useState<UserProps>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<number>(0);

  useEffect(() => {
    getUser();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getUser();
  });
  }, []);

  const getUser = () => {
    setLoading(true);
    Api.get("auth-user")
      .then((res) => {
        setLoading(false);
        setUser(res.data.data);
      })
      .catch((err) => {
        alert("Server error")
      });
  };

  const renderItem = ({ item }: any) => (
    <ProptyBox list={item} navigation={navigation} />
  );


  const renderRequestItem = ({ item }: any) => (
    <RequestCard from="profile" request={item}  navigation={navigation} />
  );

  const imageUrl: any =
    user && `${baseURL}/uploads/profile-images/${user.profile_pic_filename}`;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={styles.con}>
            <View style={styles.profile}>
              <View style={styles.proTop}>
                <View />
                 <TouchableOpacity  onPress={()=>navigation.navigate("SettingScreen")}>
                   <FontAwesome name="cog" color="#444" size={32} />
                 </TouchableOpacity>
              </View>
              <View style={styles.avatar}>
                <Avatar.Image size={150} source={{ uri: imageUrl }} />
              </View>

              <View style={styles.details}>
                <View style={{ alignItems: "center" }}>
                  <Title>{user?.fullname}</Title>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text>
                    {user?.gender}
                  </Text>
                </View>

                <View>
                  <View style={{ alignItems: "center" }}>
                    <Title style={{ fontSize: 16 }}>Verify Account</Title>
                  </View>
                  <Verified email={true} phone={true} id={false} />
                </View>
              </View>
            </View>
            <View style={styles.listings}>
              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={()=>setActiveTab(0)} style={[styles.tab,{backgroundColor:activeTab === 0 ? theme.colors.primary : '#fff'}]}>
                  <Text style={ {color:activeTab === 0 ? '#222' : theme.colors.primary} }>My Listings</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>setActiveTab(1)} style={[styles.tab,{backgroundColor:activeTab === 1 ? theme.colors.primary : '#fff'}]}>
                  <Text style={ {color:activeTab === 1 ? '#222' : theme.colors.primary} }>My Requests</Text>
                </TouchableOpacity>
              </View>

              {activeTab === 0 && <View >
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color="grey"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  />
                ) : user && user?.listing?.length < 1 ? (
                  <Text>Empty listing </Text>
                ) : (
                  <FlatList
                    horizontal={true}
                    data={user?.listing}
                    snapToInterval={width}
                    renderItem={renderItem}
                    keyExtractor={(item) => item?.id?.toString()}
                  />
                )}
              </View>
           }



          {activeTab === 1 && <View >
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color="grey"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  />
                ) : user && user?.request?.length < 1 ? (
                  <Text>Empty listing </Text>
                ) : (
                  <FlatList
                    horizontal={true}
                    data={user?.request}
                    snapToInterval={width}
                    renderItem={renderRequestItem}
                    keyExtractor={(item) => item?.id?.toString()}
                  />
                )}
              </View>
           }



            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  con: {
    padding: 10,
  },
  profile: {
    backgroundColor: "#fff",
    // borderBottomLeftRadius:50,
    // borderBottomRightRadius:50
  },
  listings: {
    // borderTopRightRadius:25,
    // borderTopLeftRadius:25,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  proTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  avatar: {
    // justifyContent:'center',
    alignItems: "center",
  },
  details: {
    paddingVertical: 20,
  },
  tabContainer: {
    padding: 10,
    flexDirection:'row',
  },
  tab: {
    padding:5,
    paddingHorizontal:10,
    marginHorizontal:5,
    borderRadius:5,
    borderColor:theme.colors.primary,
    borderWidth:1,

  },
});
