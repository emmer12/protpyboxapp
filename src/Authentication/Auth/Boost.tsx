import { useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Alert, Dimensions, Linking, StyleSheet, View } from "react-native";
import { Button, Title,Text } from "react-native-paper";
import { WebView } from "react-native-webview";
import { baseURL } from "../../api";

const { width, height } = Dimensions.get("window");

export default function About() {
  const route = useRoute();
  const handlePress = useCallback(async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const url = `${baseURL}/boost/${route.params.id}`;

  return (
    <View style={styles.container}>
      <Text>This Feature is only available on the web</Text>
      <Button onPress={() => handlePress(url)} mode="contained">
        open On Web
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
