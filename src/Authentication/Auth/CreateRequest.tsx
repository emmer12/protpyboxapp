import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Picker,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import gstyle from "../../style";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Caption,
} from "react-native-paper";
import { Formik } from "formik";
import Api from "../../api";
import DropDown from "react-native-paper-dropdown";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import { Loading } from "../../components/Loading";
import { AlertContext } from "../../context/GlobalAlert";
import { useNavigation } from "@react-navigation/native";
import { states, universities } from "./../../data/states";
import theme from "../../theme";

const { width, height } = Dimensions.get("window");

const RequestSchema = Yup.object().shape({
  about_cohabitation: Yup.string(),
  space_title: Yup.string().required("Space title is required"),
  space_state: Yup.string().required("Space state is required"),
  space_campus: Yup.string().required("Space campus is required"),
  space_for: Yup.string().required("This field is required"),
  min_budget: Yup.number().typeError('You must specify a number without comma').required("This field is required"),
  max_budget: Yup.number().typeError('You must specify a number without comma').required("This field is required"),
})

export default function Home() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState();
  const [loading, setLoading] = useState(false);
  const { alert: Alert } = useContext(AlertContext);
  const navigation = useNavigation();
  const [filteredCampus, setFilteredCampus] = useState([]);
  const [spaceState, setSpaceState] = useState("Ondo");
  const [errors, setErrors] = useState(null);

  const init = {
    space_for: "",
    space_state: "",
    about_property: "",
    min_budget: "",
    max_budget: "",
    about_cohabitation: "",
    space_title: "",
    space_campus:""
  };

  const handleRequest = (values: Object) => {
    setLoading(true);
    
    Api.post("/send-request", values)
      .then((res) => {
        setLoading(false);
        Alert({
          title: "Request created",
          type: "success",
          visible: true,
        });

        navigation.navigate("Profile");
      })
      .catch((err) => {
        setLoading(false);
        Alert({
          title: "Opps, something went wrong",
          type: "error",
          visible: true,
        });



        if(err.response.status==422){
           let valErrors:any=Object.values(err.response.data.errors);
           setErrors(valErrors);
        }
      });
  };

  const genderList = [
    {
      label: "Property Type",
      value: "Property Type",
      custom: <Text style={{ color: "#444" }}>Property Type</Text>,
    },
    {
      label: "Apartment",
      value: "apartment",
      custom: <Text style={{ color: "#444" }}>Apartment</Text>,
    },
  ];

  useEffect(() => {
    let uni = universities.filter(
      (data) => Object.keys(data)[0] == (spaceState || "Ondo")
    );
    if (typeof uni === "object") {
      let ob = Object.values(uni[0])[0];
      let result: any = Object.values(ob);

      setFilteredCampus(result);
    } else {
      setFilteredCampus([]);
    }
  }, [spaceState]);




  const handle=(val:any)=>{
    setSpaceState(val)
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={70}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading && <Loading />}
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ margin: 20 }}>
            {errors && errors?.map((error:any,i)=>(
              <Text style={{color:theme.colors.error}} key={i}>{error}</Text>
            ))}
            <Formik
              initialValues={init}
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
                setFieldValue
              }) => (
                <View>
                  <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange("space_title")}
                      onBlur={handleBlur("space_title")}
                      value={values.space_title}
                      style={gstyle.input}
                      mode="outlined"
                      label="Request Title"
                      placeholder="Request Title"
                      error={
                        errors.space_title && touched.space_title ? true : false
                      }
                    />
                    {errors.space_title && touched.space_title ? (
                      <HelperText type="error">{errors.space_title}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      value={values.space_for}
                      style={gstyle.input}
                      mode="outlined"
                      error={
                        errors.space_for && touched.space_for ? true : false
                      }
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{
                            style: { height: 50, overflow: "hidden" },
                          }}
                          onValueChange={handleChange("space_for")}
                          placeholder={{
                            label: "Space for ",
                            value: values.space_for,
                          }}
                          value={values.space_for}
                          useNativeAndroidPickerStyle={false}
                          items={[
                            { label: "Rent", value: "Rent" },
                            { label: "Roomies", value: "Roomies" },
                          ]}
                        />
                      )}
                    />
                    {errors.about_cohabitation && touched.space_for ? (
                      <HelperText type="error">{errors.space_for}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      style={gstyle.input}
                      mode="outlined"
                      onChange={()=>alert()}
                      error={
                        errors.space_state && touched.space_state ? true : false
                      }
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{
                            style: { height: 50, overflow: "hidden" },
                          }}
                          onValueChange={(e)=>{
                            handle(e)
                            setFieldValue("space_state",e)
                          }}
                          placeholder={{
                            label: "Space State",
                            value: values.space_state,
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
                    {errors.space_state && touched.space_state ? (
                      <HelperText type="error">{errors.space_state}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      style={gstyle.input}
                      mode="outlined"
                      error={
                        errors.space_campus && touched.space_campus
                          ? true
                          : false
                      }
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{
                            style: { height: 50, overflow: "hidden" },
                          }}
                          onValueChange={handleChange("space_campus")}
                          placeholder={{
                            label: "Space campus",
                            value: values.space_campus,
                          }}
                          useNativeAndroidPickerStyle={false}
                          items={filteredCampus.map((campus) => {
                            return {
                              label: campus,
                              value: campus,
                            };
                          })}
                        />
                      )}
                    />
                    {errors.space_campus && touched.space_campus ? (
                      <HelperText type="error">
                        {errors.space_campus}
                      </HelperText>
                    ) : null}
                  </View>

                  <View style={styles.row}>
                    <View style={styles.col}>
                      <View style={gstyle.formControl}>
                        <TextInput
                          onChangeText={handleChange("min_budget")}
                          onBlur={handleBlur("min_budget")}
                          value={values.min_budget}
                          style={gstyle.input}
                          mode="outlined"
                          label="Min budget"
                          placeholder="Min"
                          keyboardType="number-pad"
                          error={
                            errors.min_budget && touched.min_budget
                              ? true
                              : false
                          }
                        />
                        {errors.min_budget && touched.min_budget ? (
                          <HelperText type="error">
                            {errors.min_budget}
                          </HelperText>
                        ) : null}
                      </View>
                    </View>
                    <View style={styles.col}>
                      <View style={gstyle.formControl}>
                        <TextInput
                          onChangeText={handleChange("max_budget")}
                          onBlur={handleBlur("max_budget")}
                          value={values.max_budget}
                          style={gstyle.input}
                          mode="outlined"
                          label="Max budget"
                          placeholder="Max"
                          keyboardType="number-pad"
                          error={
                            errors.max_budget && touched.max_budget
                              ? true
                              : false
                          }
                        />
                        {errors.max_budget && touched.max_budget ? (
                          <HelperText type="error">
                            {errors.max_budget}
                          </HelperText>
                        ) : null}
                      </View>
                    </View>
                  </View>

                  {values.space_for === "Roomies" && (
                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("about_cohabitation")}
                        onBlur={handleBlur("about_cohabitation")}
                        value={values.about_cohabitation}
                        mode="outlined"
                        style={gstyle.input}
                        multiline={true}
                        numberOfLines={3}
                        label="About Cohabitant"
                        placeholder="About Cohabitant"
                        error={
                          errors.about_cohabitation &&
                          touched.about_cohabitation
                            ? true
                            : false
                        }
                      />
                      {errors.about_cohabitation &&
                      touched.about_cohabitation ? (
                        <HelperText type="error">
                          {errors.about_cohabitation}
                        </HelperText>
                      ) : null}
                    </View>
                  )}

                  <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange("about_property")}
                      onBlur={handleBlur("about_property")}
                      value={values.about_property}
                      style={gstyle.input}
                      mode="outlined"
                      multiline={true}
                      numberOfLines={3}
                      label="Facilities you are looking out for"
                      error={
                        errors.about_property && touched.about_property
                          ? true
                          : false
                      }
                    />
                    {errors.about_property && touched.about_property ? (
                      <HelperText type="error">
                        {errors.about_property}
                      </HelperText>
                    ) : null}
                  </View>

                  <Button
                    onPress={handleSubmit}
                    theme={{ roundness: 3 }}
                    mode="contained"
                    disabled={loading}
                    loading={loading}
                  >
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  col: {
    flex: 1,
    margin: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
