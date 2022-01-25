import React, { useState,useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Title,
  Subheading,
  HelperText,
} from "react-native-paper";
import { AuthHeader } from "../../components";
import RNPickerSelect from "react-native-picker-select";
import Api from "../../api";
import gstyle from "../../style";
import { Formik } from "formik";

import * as Yup from "yup";
import AuthContext from "../../store/context";
import { AlertContext } from "../../context/GlobalAlert";
import { states } from "./../../data/states";
import { useNavigation } from "@react-navigation/core";
import {
  OnboardingScreenNavigation,
  OtpVerifyScreenNavigation,
} from "../../navigation/type";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be more than six(6) characters")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  fullname: Yup.string().required("Fullname is required"),
  location: Yup.string().required("Location is required"),
  phone: Yup.number().required("Phone number is required"),
});

export default function SignUp() {
  const initialValues = {
    fullname: "",
    phone: "",
    email: "",
    location: "",
    gender: "",
    password: "",
    password_confirmation: "",
  };
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const {
    authContext: { signIn },
  } = React.useContext(AuthContext);
  const { alert: Alert } = React.useContext(AlertContext);

  const { navigate } = useNavigation<OtpVerifyScreenNavigation>();









  const signUp = (value: any) => {
    value.password_confirmation = value.password;
    setLoading(true);
    Api.post("/register", value)
      .then((res) => {
        setLoading(false);
        Alert({
          title: "Registration Successful.",
          type: "success",
          visible: true,
        });
        navigate("OtpVerifyScreen", { email: value.email });
        // signIn(res.data.data.access_token);
      })
      .catch((err) => {
        setLoading(false);
        let errorMsg: string = "";
        if (err.response.status == 422) {
          errorMsg = Object.values(err.response.data.errors)[0][0];
        }
        Alert({
          title: errorMsg || "Unknown Error please try again",
          type: "error",
          visible: true,
        });
      });
  };

  const emailText = () => {
    navigate("OtpVerifyScreen", { email: "emmer@gmail.com" });
  };

  return (
    <View style={gstyle.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.bCon}>
          <View style={styles.body}>
            <AuthHeader
              page="Create Account"
              title="Welcome to ProptyBox"
              msg=""
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => signUp(values)}
                validationSchema={SignupSchema}
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
                        onChangeText={handleChange("fullname")}
                        onBlur={handleBlur("fullname")}
                        value={values.fullname}
                        style={gstyle.input}
                        mode="outlined"
                        label="Fullname"
                        placeholder="Enter your name"
                        error={
                          errors.fullname && touched.fullname ? true : false
                        }
                      />
                      {errors.fullname && touched.fullname ? (
                        <HelperText type="error">{errors.fullname}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                        mode="outlined"
                        style={gstyle.input}
                        label="phone"
                        placeholder="Enter your name"
                        keyboardType="number-pad"
                        error={errors.phone && touched.phone ? true : false}
                      />
                      {errors.phone && touched.phone ? (
                        <HelperText type="error">{errors.phone}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        mode="outlined"
                        style={gstyle.input}
                        label="Email Address"
                        placeholder="mail@example.com"
                        error={errors.email && touched.email ? true : false}
                        keyboardType="email-address"
                      />
                      {errors.email && touched.email ? (
                        <HelperText type="error">{errors.email}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        style={gstyle.input}
                        mode="outlined"
                        error={
                          errors.location && touched.location ? true : false
                        }
                        render={(props) => (
                          <RNPickerSelect
                            pickerProps={{
                              style: { height: 50, overflow: "hidden" },
                            }}
                            onValueChange={handleChange("location")}
                            placeholder={{
                              label: "location",
                              value: values.location,
                            }}
                            useNativeAndroidPickerStyle={false}
                            items={states.map((state) => {
                              return {
                                label: state.name,
                                value: state.name,
                              };
                            })}
                          />
                        )}
                      />
                      {errors.location && touched.location ? (
                        <HelperText type="error">{errors.location}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        value={values.gender}
                        style={gstyle.input}
                        mode="outlined"
                        error={errors.gender && touched.gender ? true : false}
                        render={(props) => (
                          <RNPickerSelect
                            pickerProps={{
                              style: { height: 50, overflow: "hidden" },
                            }}
                            onValueChange={handleChange("gender")}
                            placeholder={{
                              label: "Gender",
                              value: values.gender,
                            }}
                            value={values.gender}
                            useNativeAndroidPickerStyle={false}
                            items={[
                              { label: "Male", value: "Male" },
                              { label: "Female", value: "Female" },
                            ]}
                          />
                        )}
                      />
                      {errors.gender && touched.gender ? (
                        <HelperText type="error">{errors.gender}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        style={gstyle.input}
                        label="Password"
                        mode="outlined"
                        placeholder="**********"
                        secureTextEntry={true}
                        error={
                          errors.password && touched.password ? true : false
                        }
                      />
                      {errors.password && touched.password ? (
                        <HelperText type="error">{errors.password}</HelperText>
                      ) : null}
                    </View>

                    <Button
                      loading={loading}
                      onPress={handleSubmit}
                      theme={{ roundness: 3 }}
                      disabled={loading}
                      mode="contained"
                    >
                      Register
                    </Button>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => navigate("SignInScreen")}
            style={{ marginVertical: 10,position:"absolute",bottom:0,left:24 }}
          >
            <Title style={{ color: "#666", fontSize: 16 }}>
              Already have an account ?{" "}
            </Title>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bCon: {
    backgroundColor: "white",
    height: "90%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
  },

  body: {
    flex: 1,
    backgroundColor: "white",
    transform: [
      {
        translateY: -50,
      },
    ],
    padding: 10,
  },

  log: {
    fontSize: 35,
    color: "#5895F9",
    fontWeight: "700",
  },
});
