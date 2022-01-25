import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Linking } from "react-native";
import { Divider, List } from "react-native-paper";
import gstyle from "../../style";

const { width, height } = Dimensions.get("window");

export default function Home() {

  const navigation=useNavigation()
  return (
    <View>
      <List.Item
        title="Account Settings"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{
          navigation.navigate('EditAccount')
        }}
      />
      <Divider />

      <List.Item
        title="Profile Settings"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{
          navigation.navigate('EditProfile')
        }}

      />
      <List.Item
        title="About us"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{
          navigation.navigate('About')
        }}

      />

      <List.Item
        title="Terms and Conditions"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={() => {
          navigation.navigate("Terms");
        }}

      />

      <List.Item
        title="Support"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={() => {
          Linking.openURL('mailto:support@proptybox.com')
        }}

      />
    </View>
  );
}
