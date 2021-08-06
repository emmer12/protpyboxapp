import React from "react";
import {  Dimensions, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get("window");

export default function About() {
  
  
  

  return (
    <WebView 
    style={styles.container}
    source={{ uri: 'https://proptybox.com/about'}}
  />
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
