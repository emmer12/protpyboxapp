import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Divider, List } from "react-native-paper";
import gstyle from "../../style";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <View>
      <List.Item
        title="Account Settings"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{}}
      />
      <Divider />

      <List.Item
        title="Profile Settings"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{}}

      />
      <List.Item
        title="About us"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{}}

      />

      <List.Item
        title="Private policy"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{}}

      />

      <List.Item
        title="Support"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={()=>{}}

      />
    </View>
  );
}
