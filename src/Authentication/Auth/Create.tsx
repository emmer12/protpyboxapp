import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import gstyle from "../../style";
import { Button } from "react-native-paper";
import { AlertContext } from "../../context/GlobalAlert";
import AuthContext from "../../store/context";
import Api from "../../api";
import theme from "../../theme";
import { CreateList, CreateRequest } from "../../icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function Create({ navigation }: any) {
  const {
    authContext: { signOut },
  } = React.useContext(AuthContext);
  //   onPress={()=>
  //     navigation.navigate({
  //         name: 'UploadImage',
  //         params:{
  //         list:{
  //            id:66,
  //          }
  //    },
  //  })}

  const sign = () => {
    signOut();
  };

  const sendMail = () => {
    Api.get("/send-mail")
      .then((res) => {
        alert("sent");
      })
      .catch((err) => {
        alert("error");
      });
  };
  return (
    <View style={styles.con}>
      <TouchableOpacity onPress={()=>navigation.navigate('CreateListing')}  style={{alignItems: 'center',}}>
        <View style={styles.box}>
          <CreateList />
        </View>
        <Text style={{color:theme.colors.primary,fontSize:16,textTransform:'uppercase',fontWeight:'700'}}>List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('CreateRequest') }  style={{alignItems:'center'}}>
        <View style={styles.box}>
          <CreateRequest />
        </View>
        <Text style={{color:theme.colors.primary, fontSize:16,textTransform:'uppercase',fontWeight:'700'}}>Request</Text>
      </TouchableOpacity>
    </View>
  );
}

{
  /* <View style={styles.box}>
<Button  theme={{ roundness: 3 }} onPress={()=>navigation.navigate('CreateListing')} mode="contained">List</Button>   
</View>

<View style={styles.box}>
<Button  theme={{ roundness: 3 }} onPress={()=>navigation.navigate('CreateRequest') } mode="contained" >Request</Button>   
</View>   */
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  box: {
    padding: 10,
    height: 120,
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.primary,
    borderWidth: 4,
    marginVertical: 10,
  },
});
