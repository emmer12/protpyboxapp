import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Caption,
  Title,
} from "react-native-paper";
import { AuthHeader } from "../../components";
import gstyle from "../../style";
import { Formik } from "formik";
import Api from "../../api";
import { saveToken } from "../../store/async";
import AuthContext from "../../store/context";
import { AlertContext } from "../../context/GlobalAlert";
import { List, Request } from "../../icons";

import * as Yup from "yup";
import { useNavigation } from "@react-navigation/core";
import {
  ListingNavigation,
  OnboardingScreenNavigation,
  TapProps,
  TapType,
} from "../../navigation/type";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be more than six(6) characters")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const { width, height } = Dimensions.get("window");

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<OnboardingScreenNavigation>();

  const {
    authContext: { signIn },
  } = React.useContext(AuthContext);
  const { alert: Alert } = React.useContext(AlertContext);

  const handleLogin = (value: any) => {
    setLoading(true);

    Api.post("/login", value)
      .then((res) => {
        setLoading(false);
        Alert({
          title: "You are Welcome",
          type: "success",
          visible: true,
        });
        signIn(res.data.data.access_token);
      })
      .catch((err) => {
        setLoading(false);
        Alert({
          title: err.response.data.msg,
          type: "error",
          visible: true,
        });
      });
  };

  return (
    <View style={gstyle.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topList}>
        <TouchableOpacity
          onPress={() => navigate("GuestListing", { guest: true })}
          style={gstyle.flex}
        >
          <List color={"#5895F9"} size={18} />
          <Text style={{ marginHorizontal: 10 }}>LISTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("GuestRequest", { guest: true })}
          style={gstyle.flex}
        >
          <Request color={"#5895F9"} size={18} />
          <Text style={{ marginHorizontal: 10 }}>REQUESTS</Text>
        </TouchableOpacity>
      </View>
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1 }}></View>
          <View style={styles.bCon}>
            <View style={styles.body}>
              <AuthHeader page="Sign in" title="Welcome Back" msg="" />
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => handleLogin(values)}
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
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
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
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        style={gstyle.input}
                        label="Password"
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

                    <View style={styles.forgot}>
                      <Caption>Forgot password?</Caption>
                    </View>
                    <Button
                      style={{ zIndex: 999 }}
                      loading={loading}
                      onPress={handleSubmit}
                      theme={{ roundness: 3 }}
                      mode="contained"
                      disabled={loading}
                      
                    >
                      Submit
                    </Button>
                  </View>
                )}
              </Formik>
              </TouchableWithoutFeedback>
              {/* 
            <View style={styles.orSocial}>
            <Text>Or</Text>
          </View> */}
              <TouchableOpacity
                onPress={() => navigate("SignUpScreen")}
                style={{ marginVertical: 10 }}
              >
                <Title style={{ color: "#666", fontSize: 16 }}>
                  Don't have an account ?{" "}
                </Title>
              </TouchableOpacity>

              {/* <View>
              <Button
              icon="google"
              style={{ marginTop: 10 }}
              theme={{ roundness: 3 }}
              color="#FF3E30"
              mode="outlined"
              >
              Login with Google
              </Button>
              <Button
                icon="facebook"
                style={{ marginTop: 5 }}
                theme={{ roundness: 3 }}
                mode="outlined"
                >
                Login with facebook
                </Button>
              </View> */}
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bCon: {
    backgroundColor: "#fff",
    height: "70%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
  },

  body: {
    flex: 1,
    backgroundColor: "white",
    transform: [
      {
        translateY: -100,
      },
    ],
    padding: 10,
  },
  forgot: {
    alignItems: "flex-end",
    marginVertical: 10,
  },

  orSocial: {
    backgroundColor: "#EEF4FF",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginVertical: 10,
    left: 0.5 * width - 40,
  },

  topList: {
    backgroundColor: "#fff",
    position: "absolute",
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "700",
  },
});
