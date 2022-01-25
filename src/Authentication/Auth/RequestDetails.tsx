import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import globalStyle from "../../style";
import {
  Avatar,
  Button,
  Text,
  Title,
  Paragraph,
  Subheading,
} from "react-native-paper";
import { ProptyBox } from "../../components";
import Api, { baseURL } from "../../api";
import { Chat } from "../../icons";
import { RequestType } from "../type";
import { ListingDetailRoute } from "../../navigation/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("window");

export default function ListDetails({ route }: ListingDetailRoute) {
  const [request, setRequest] = React.useState<RequestType>({
    user: {
      fullname: "",
      profile_pic_filename: "",
      age: "",
      gender: "",
      reveal_contact: false,
    },
  });
  const [loading, setLoading] = React.useState(true);

  const navigation=useNavigation();

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = () => {
    setLoading(true);
    Api.get("get-request-by-id/" + route.params.id).then((res) => {
      setLoading(false);
      setRequest(res.data.data);
    });
  };

  const renderItem = ({ item }: any) => {
    const imageUrl = `${baseURL}/uploads/listing/${item.filename}`;
    return (
      <Image
        style={{ width, height: height * 0.3 }}
        source={{ uri: imageUrl }}
      />
    );
  };
  const imageUrl =
    !loading &&
    `${baseURL}/uploads/profile-images/${request?.user.profile_pic_filename}`;


    const cap = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="grey"
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <View>
            <View style={{ alignItems: "center", padding: 10 }}>
              <Avatar.Image size={150} source={{ uri: imageUrl }} />
              <View style={{ alignItems: "center" }}>
                <Subheading>{request.user.fullname}</Subheading>
                <Text>
                  {request.user.gender} 
                </Text>
              </View>
            </View>
            <View style={styles.con}>
              <View style={globalStyle.details}>
                <View style={globalStyle.left}></View>

                {route.params.guest ? (
                  <>
                    <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("SignInScreen")}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                  </>
                ) : (
                  <View style={[globalStyle.right]}>
                    <Text>BUDGET:</Text>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: theme.colors.primary,
                        fontSize: 16,
                      }}
                    >
                      &#8358;{request && request.min_budget}-&#8358;
                      {request && request.max_budget}
                    </Text>
                    {/* <Chat style={{}} /> */}
                    {request.user.reveal_contact && (
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                          Linking.openURL(`tel:${request.user.phoneNo}`)
                        }
                      >
                        <MaterialCommunityIcons
                          name="phone"
                          size={24}
                          color={theme.colors.primary}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>

              <View style={[globalStyle.row, globalStyle.rowTint]}>
                <View style={globalStyle.p50}>
                  <Text >Property Title</Text>
                </View>
                <View>
                  <Text style={{maxWidth:170}}>{request.space_title}</Text>
                </View>
              </View>

              <View style={[globalStyle.row, globalStyle.rowTint]}>
                <View style={globalStyle.p50}>
                  <Text>Space location</Text>
                </View>
                <View>
                  <Text>{request.space_state}</Text>
                </View>
              </View>

              
              <View style={[globalStyle.row,]}>
                <View style={globalStyle.p50}>
                  <Text>Space Campus</Text>
                </View>
                <View>
                  <Text style={{maxWidth:170}}>{request.space_campus}</Text>
                </View>
              </View>

              <View style={globalStyle.row}>
                <View style={globalStyle.p50}>
                  <Text>Space Type</Text>
                </View>
                <View>
                  <Text>{request.space_for}</Text>
                </View>
              </View>

            

              <View style={[globalStyle.row]}>
                <View style={globalStyle.p50}>
                  <Text>About Cohabitant</Text>
                </View>
                <View>
                  <Text>{request.about_cohabitation || "- - -"}</Text>
                </View>
              </View>

              <View style={[globalStyle.row, globalStyle.rowTint]}>
                <View style={globalStyle.p50}>
                  <Text>About space</Text>
                </View>
                <View style={globalStyle.p50}>
                  <Text>{request.about_property}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },
  con: {
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,

  },
});
