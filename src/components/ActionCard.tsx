import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { List, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { AlertContext } from "../context/GlobalAlert";
import { useEffect } from "react";

interface ActionCardProps {
  listId?:number,
  navigation:any
}

const { width, height } = Dimensions.get("window");

const ActionCard = ({listId,navigation}: ActionCardProps) => {
  const { action: Action } = React.useContext(AlertContext);
  let AnimatedVal = new Animated.Value(0);

 

  useEffect(() => {
    Animated.timing(AnimatedVal, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, []);


  const close=()=>{
    Animated.timing(AnimatedVal, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start(() => Action(false))
   
  }

  const translateY={
    translateY:AnimatedVal.interpolate({
    inputRange:[0,1],
    outputRange:[height/3,0]
})} 

const opacity={
  opacity:AnimatedVal.interpolate({
  inputRange:[0,1],
  outputRange:[0,1]
})}

const deletePost=()=>{
  alert(listId)
}

  return (
    <Animated.View style={[styles.container,opacity]}>
      <Animated.View style={[styles.inner,{transform:[translateY] }]}>
        <TouchableOpacity
          style={{
            right: 0,
            zIndex: 99,
            position: "absolute",
            marginRight: 20,
            marginTop: 10,
          }}
          onPress={() => {
            close()
          }}
        >
          <MaterialCommunityIcons name="close" size={30} />
        </TouchableOpacity>
        <List.Item
          title="Boost Post"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <Ionicons
                  style={{ fontWeight: "700", color: "#aaa" }}
                  size={25}
                  name="rocket"
                />
              )}
            />
          )}

          onPress={()=>{
            navigation.navigate("Boost",{id:listId})
            close()
          }}
        />
        <List.Item
          title="Delete Post"
          left={(props) => <List.Icon {...props} icon="delete-outline" />}
          onPress={()=>deletePost()}
        />
        <List.Item
          title="Edit"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => (
                <Ionicons
                  style={{ fontWeight: "700", color: "#aaa" }}
                  size={25}
                  name="pencil"
                />
              )}
            />
          )}

          onPress={()=>{
            navigation.navigate('EditListing',{id:listId})
            close()
          }
          }
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    zIndex: 40,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
  },
  inner: {
    padding: 20,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 50,
    width,
    height: height / 3,
    bottom: 0,
    transform: [
      {
        translateY: height / 3,
      },
    ],
  },
});
