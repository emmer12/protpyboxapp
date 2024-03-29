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
import { Avatar, Button, Text, Title, Paragraph } from "react-native-paper";
import { ProptyBox } from "../../components";
import Api, { baseURL } from "../../api";
import { Chat } from "../../icons";
import { ListingType } from "../type";
import { ListingDetailRoute } from "../../navigation/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("window");

export default function ListDetails({ route }: ListingDetailRoute) {
  const [list, setList] = React.useState<ListingType>({});
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    setLoading(true);
    Api.get("get-list-by-slug/" + route.params.id)
      .then((res) => {
        setLoading(false);
        setList(res.data.data);
      })
      .catch((err) => {
        alert("Opps,server error");
      });
  };

  const cap = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          {list?.images?.length < 1 ? (
            <Image
              source={require("../../../assets/no-image.png")}
              resizeMode="cover"
            />
          ) : (
            <FlatList
              data={list.images}
              renderItem={renderItem}
              keyExtractor={(item, index) => "images" + index}
              horizontal={true}
              snapToInterval={width}
              decelerationRate={0}
              bounces={false}
              pagingEnabled={true}
            />
          )}
        </View>

        <View style={styles.con}>
            <Title> {list.space_title}</Title>
          <View style={globalStyle.details}>
            <View style={globalStyle.left}>
              <Paragraph> {list.space_address}</Paragraph>
            </View>

            <View style={globalStyle.right}>
              <Button>&#8358;{list.rent}</Button>

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
                <>
                  <Text
                    style={{ marginTop: 30 }}
                    onPress={() => {
                      Linking.openURL(
                        `https://api.whatsapp.com/send?phone=${list.user.phoneNo}&text=Send20%a20%quote`
                      );
                    }}
                  >
                    {/* <Chat style={{}} /> */}
                  </Text>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => Linking.openURL(`tel:${list.user.phoneNo}`)}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={[globalStyle.row, globalStyle.rowTint]}>
            <View style={globalStyle.p50}>
              <Text>Rent</Text>
            </View>
            <View>
              <Text>&#8358;{list.rent}</Text>
            </View>
          </View>

          <View style={globalStyle.row}>
            <View style={globalStyle.p50}>
              <Text>Property type</Text>
            </View>
            <View>
              <Text>{list.property_type}</Text>
            </View>
          </View>

          <View style={[globalStyle.row, globalStyle.rowTint]}>
            <View style={globalStyle.p50}>
              <Text>Space State</Text>
            </View>
            <View>
              <Text>{list.space_state}</Text>
            </View>
          </View>

          <View style={[globalStyle.row]}>
            <View style={globalStyle.p50}>
              <Text>Space Campus</Text>
            </View>
            <View>
              <Text style={{ maxWidth: 200 }}>{list.space_campus}</Text>
            </View>
          </View>

          <View style={globalStyle.row}>
            <View style={globalStyle.p50}>
              <Text>Bathroom type</Text>
            </View>
            <View>
              <Text>{list.bedroom_type}</Text>
            </View>
          </View>

          <View style={[globalStyle.row, globalStyle.rowTint]}>
            <View style={globalStyle.p50}>
              <Text>Available from</Text>
            </View>
            <View>
              <Text>{list.available_from}</Text>
            </View>
          </View>

          <View style={[globalStyle.row]}>
            <View style={globalStyle.p50}>
              <Text>Preferred Gender</Text>
            </View>
            <View>
              <Text>{list.payer_gender}</Text>
            </View>
          </View>

          <View style={[globalStyle.row, globalStyle.rowTint]}>
            <View style={globalStyle.p50}>
              <Text>About space</Text>
            </View>
            <View style={globalStyle.p50}>
              <Text>{list.about_property}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  con: {
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    // borderColor: "#0D50BD",
    // borderWidth: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
