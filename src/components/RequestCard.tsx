import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Caption,
  TouchableRipple,
  Subheading,
} from "react-native-paper";
import { baseURL } from "../api";
import { RequestType } from "../Authentication/type";
import { RequestNavigation } from "../navigation/type";
import theme from "../theme";

const { width, height } = Dimensions.get("window");

interface RequestCard {
  request: RequestType;
  from: string;
  guest?:boolean
}

const RequestCard = ({ request, from,guest }: RequestCard) => {
    const navigation=useNavigation();
  const imageUrl=request && `${baseURL}/uploads/profile-images/${request?.user.profile_pic_filename}`
  return (
    <View>
      <TouchableRipple style={styles.container} onPress={()=>{guest ? navigation.navigate('GuestRequestDetails',{title:'Request',id:request.slug,guest}) : navigation.navigate('RequestDetailsScreen',{title:request.space_title,id:request.slug})}}>
        <View
          style={[
            styles.cardCon,
            { width: from === "request" ? width-20*2 : 300 },
          ]}
        >
          <View style={styles.left}>
            <Avatar.Image
              size={60}
              source={{ uri: imageUrl }}
            />
          </View>
          <View style={styles.details}>
            <Title>
              {request.user.fullname.length > 20
                ? request.user.fullname.substr(0, 15) + "..."
                : request.user.fullname}{" "}
            </Title>
            <Subheading numberOfLines={2} style={{maxWidth:200, color:'#888',top:-10}}>
              {request.space_title}
            </Subheading>
            <Text>
              Budget &#8358;{request.min_budget}-{request.max_budget}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    margin: 10,
  },
  cardCon: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  left: {
    paddingHorizontal: 10,
  },
  details: {
    justifyContent:'center'
  },
});

export default RequestCard;
