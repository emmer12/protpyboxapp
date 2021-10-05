import React from "react";
import {  Dimensions, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { baseURL } from "../../api";

const { width, height } = Dimensions.get("window");

export default function About() {
  

  return (
    <WebView 
    style={styles.container}
    source={{ uri: `${baseURL}/about/mobile=true`}}
  />
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1
}
})
