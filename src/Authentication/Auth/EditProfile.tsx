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

interface EditProfileProps {}

const RequestSchema = Yup.object().shape({
  fullname: Yup.string().required("About cohabitation is required"),
  location: Yup.string().required("Space type is required"),
  phone: Yup.string().required("This field is required"),
  bio: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
});

const EditProfile = (props: EditProfileProps) => {
  const [loading, setLoading] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const imageUrl: any = user && `${baseURL}/uploads/profile-images/${user.profile_pic_filename}`;
  
  
  const handleRequest = (values:UserType) => {   
    Api.patch('update-user',values).then(()=>{
        alert("posted")
    }).catch((err)=>{
      
    })
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
        <View style={{padding:10}}>

          <TouchableOpacity style={{ margin: 20,alignItems:'center' }}>  
            <Avatar.Image size={150} source={{ uri: imageUrl }} />
            </TouchableOpacity>
            <Formik
              initialValues={user}
              onSubmit={(values) => handleRequest(values)}
              validationSchema={RequestSchema}
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
                      placeholder="e"
                      keyboardType="phone-pad"
                    />
                    {errors.bio && touched.bio ? (
                      <HelperText type="error">{errors.bio}</HelperText>
                    ) : null}
                  </View>
                  <Button onPress={handleSubmit} theme={{ roundness: 3 }} mode="contained">Update</Button>
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
  avatar: {
      
  },
});
