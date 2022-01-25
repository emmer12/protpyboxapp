import { Formik } from "formik";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, HelperText, TextInput } from "react-native-paper";
import { Loading } from "../../components/Loading";
import gstyle from "../../style";
import Api from "../../api";

import * as Yup from "yup";
import AuthContext from "../../store/context";
import { baseURL } from "../../api";
import { UserType } from "../type";
import { AlertContext } from "../../context/GlobalAlert";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import AuthReducer from "../../store/Reducers/auth";

interface EditProfileProps {}

const RequestSchema = Yup.object().shape({
  fullname: Yup.string().required("About cohabitation is required"),
  location: Yup.string().required("Space type is required"),
  phoneNo: Yup.string().required("This field is required"),
  bio: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
});
interface UserProps {
  request: readonly any[] | null | undefined;
  fullname: string;
  listing: Array<{}>;
  gender: string;
  age: string;
  profile_pic_filename: string;
  phoneNo: string;
  bio: string;
  email: string;
  location: string;
}

const EditProfile = (props: EditProfileProps) => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<UserProps>({});
  const { alert: Alert } = React.useContext(AlertContext);
  const [image, setImage] = React.useState(null);
  const [state, dispatch] = React.useReducer(AuthReducer, {});
 
  const {
    authContext: { setUser:setUserGlobal },
  } = React.useContext(AuthContext);

  const navigation = useNavigation();

  const imageUrl: any =
    user && `${baseURL}/uploads/profile-images/${user.profile_pic_filename}`;

  const handleRequest = (values: UserType) => {
    setLoading(true);
    Api.patch("update-user", values)
      .then((res) => {
        setLoading(false);
        Alert({
          title: "Profile Updated",
          type: "success",
          visible: true,
        });
        navigation.navigate("Profile");
        
        setUserGlobal(res.data.access_token)
      })
      .catch((err) => {
        setLoading(false);
        alert("err");
      });
  };

  const getUser = () => {
    Api.get("auth-user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        alert("Opps something went wrong");
      });
  };

  React.useEffect(() => {
    dispatch({ type: "UPDATE_USER", payload: { user: {} } });
    getUser();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const formData = new FormData();
      formData.append("field", "profile");
      formData.append("file", {
        uri: result.uri,
        type: "image/jpg",
        name: result.uri.split("/").pop(),
      });

      Api.post("/upload-file", formData)
        .then((res) => {
          getUser();
          dispatch({ type: "UPDATE_USER", payload: { user } });

          Alert({
            title: "Profile Updated",
            type: "success",
            visible: true,
          });
        })
        .catch((err) => {
          alert("error");
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={70}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading && <Loading />}
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={{ margin: 20, alignItems: "center" }}
              onPress={pickImage}
            >
              <Avatar.Image size={150} source={{ uri: imageUrl }} />
            </TouchableOpacity>
            <Formik
              initialValues={user}
              onSubmit={(values) => handleRequest(values)}
              validationSchema={RequestSchema}
              enableReinitialize={true}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <View style={gstyle.formControl}>
                    <TextInput
                      value={values.fullname}
                      style={gstyle.input}
                      error={errors.fullname && touched.fullname ? true : false}
                      onChangeText={handleChange("fullname")}
                      label="Fullname"
                      placeholder="Fullname"
                    />
                    {errors.fullname && touched.fullname ? (
                      <HelperText type="error">{errors.fullname}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      value={values.email}
                      style={gstyle.input}
                      error={errors.email && touched.email ? true : false}
                      onChangeText={handleChange("email")}
                      label="Email Address"
                      placeholder="example@mail.com"
                      disabled={true}
                    />
                    {errors.email && touched.email ? (
                      <HelperText type="error">{errors.email}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      value={values.phoneNo}
                      style={gstyle.input}
                      error={errors.phoneNo && touched.phoneNo ? true : false}
                      onChangeText={handleChange("phone")}
                      label="Phone Number"
                      placeholder="e.g. 090726763773"
                      keyboardType="phone-pad"
                    />
                    {errors.phoneNo && touched.phoneNo ? (
                      <HelperText type="error">{errors.phoneNo}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      value={values.location}
                      style={gstyle.input}
                      error={errors.location && touched.location ? true : false}
                      onChangeText={handleChange("phone")}
                      label="Location"
                      placeholder="Your Location"
                      keyboardType="phone-pad"
                    />
                    {errors.location && touched.location ? (
                      <HelperText type="error">{errors.location}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      multiline={true}
                      numberOfLines={3}
                      value={values.bio}
                      style={gstyle.input}
                      error={errors.bio && touched.bio ? true : false}
                      onChangeText={handleChange("bio")}
                      label="bio"
                      placeholder="Short description about you"
                    />
                    {errors.bio && touched.bio ? (
                      <HelperText type="error">{errors.bio}</HelperText>
                    ) : null}
                  </View>
                  <Button
                    onPress={handleSubmit}
                    theme={{ roundness: 3 }}
                    mode="contained"
                  >
                    Update
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  avatar: {},
});
