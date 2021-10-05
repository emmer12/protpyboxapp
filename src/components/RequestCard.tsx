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
} from "react-native-paper";
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
  // const imageUrl=request && `https://proptybox.com/uploads/listing/${request.images[0]}`
  return (
    <View>
      <TouchableRipple style={styles.container} onPress={()=>{guest ? navigation.navigate('GuestRequestDetails',{title:'Request',id:request.id,guest}) : navigation.navigate('RequestDetailsScreen',{title:'Request',id:request.id})}}>
        <View
          style={[
            styles.cardCon,
            { width: from === "request" ? width - 20 : 300 },
          ]}
        >
          <View style={styles.left}>
            <Avatar.Image
              size={60}
              source={require("../../assets/avatar.png")}
            />
          </View>
          <View style={styles.details}>
            <Title>
              {request.user.fullname.length > 20
                ? request.user.fullname.substr(0, 15) + "..."
                : request.user.fullname}{" "}
            </Title>
            <Caption>
              {request.user.age} yrs | {request.user.gender}
            </Caption>
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
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
    borderLeftColor: theme.colors.primary,
    borderLeftWidth: 4,
  },
  left: {
    paddingHorizontal: 10,
  },
  details: {},
});

export default RequestCard;
