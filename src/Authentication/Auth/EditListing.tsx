import React, { useState, useEffect, useContext } from "react";
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
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import gstyle from "../../style";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Caption,
  Colors,
  Title,
} from "react-native-paper";
import { Formik } from "formik";
import Api from "../../api";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "../../theme";
import * as ImagePicker from "expo-image-picker";
import { AlertContext } from "../../context/GlobalAlert";
import AutocompleteTags from "react-native-autocomplete-tags";
import { ListingType } from "../type";
import { useRoute } from "@react-navigation/native";
import { Loading } from "../../components/Loading";
import { states, universities } from "./../../data/states";


// import DropDown from 'react-native-paper-dropdown';
// import { DatePickerModal } from 'react-native-paper-dates';
// import { ImageBrowser } from 'expo-image-picker-multiple';

const suggestions = [
  "ensuite",
  "apartment",
  "rent",
  "cohab",
  "space shareing",
  "self-contain",
  "1-bedroom-flat",
  "2-bedroom-flat",
  "3-bedroom-flat",
];
const { width, height } = Dimensions.get("window");

const RequestSchema = Yup.object().shape({
  // about_cohabitation: Yup.string().required('About cohabitation is required'),
  space_title: Yup.string().required("Space type is required"),
  space_for: Yup.string().required("This field is required"),
  rent: Yup.string().required('This field is required'),
  space_address: Yup.string().required("This field is required"),
  payer_gender: Yup.string().required("This field is required"),
  space_state: Yup.string().required("Space state field is required"),
  space_campus: Yup.string().required("Space Campus field is required"),
});

export default function Home({ navigation }: any) {
  // const [date, setDate] = React.useState<Date | undefined>(undefined);
  // const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [tags, setTags] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [list, setList] = React.useState<ListingType>({});
  const [activeTab, setActiveTab] = useState(0);
  const [filteredCampus, setFilteredCampus] = useState([]);
  const [spaceState, setSpaceState] = useState("Ondo");
  const [errors, setErrors] = useState(null);


  let AnimatedVal = new Animated.Value(1);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { alert: Alert } = useContext(AlertContext);
  const route = useRoute();

  const labelExtractor = (tag: string) => tag;

  const init = {
    about_cohabitation: "",
    about_property: "",
    available_from: "",
    bedroom_type: "",
    rent: 0,
    duration: "",
    space_address: "",
    property_type: "",
    space_for: "",
    space_title: "",
    payer_gender: "",
    space_state: "",
    space_campus: "",
    selectedTags: [],
  };

  useEffect(() => {
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

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleRequest = (values: ListingType) => {
    let day = new Date(date).getDate();
    let month = new Date(date).getMonth()+ 1;
    let year = new Date(date).getFullYear();

    values.available_from = `${year}-${month}-${day}`;
    values.selectedTags = tags;

    setLoading(true);
    Api.patch("/update-listing", values)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          const list = res.data.list;
          // navigation.navigate("UploadImage", {
          //   list,
          // });
          Alert({
            title: "Listing Updated ",
            type: "success",
            visible: true,
          });
        } else {
          Alert({
            title: "Request Failed",
            type: "error",
            visible: true,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
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

  // const progressWidth=`${(activeIndex/4)*100}%`;

  const animWidth = {
    width: AnimatedVal.interpolate({
      inputRange: [1, 3],
      outputRange: ["33.33%", "100%"],
    }),
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    setLoading(true);

    console.log(route.params.id)
    Api.get("get-list-by-slug/" + route.params.id).then((res) => {
      setLoading(false);
      setList(res.data.data);
    });
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
          <View style={{ margin: 20 }}>
          {errors && errors?.map((error:any,i)=>(
              <Text style={{color:theme.colors.error}} key={i}>{error}</Text>
            ))}
            <Formik
              initialValues={list}
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
                setFieldValue
              }) => (
                <View>
                  <View>
                    <View style={styles.tabContainer}>
                      <TouchableOpacity
                        onPress={() => setActiveTab(0)}
                        style={[
                          styles.tab,
                          {
                            backgroundColor:
                              activeTab === 0 ? theme.colors.primary : "#fff",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              activeTab === 0 ? "#222" : theme.colors.primary,
                          }}
                        >
                          Edit List
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("UploadImage", {
                            id: list?.id,
                            slug: list?.slug,
                          });
                          setActiveTab(1);
                        }}
                        style={[
                          styles.tab,
                          {
                            backgroundColor:
                              activeTab === 1 ? theme.colors.primary : "#fff",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              activeTab === 1 ? "#222" : theme.colors.primary,
                          }}
                        >
                          Listing Images
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("space_title")}
                        onBlur={handleBlur("space_title")}
                        value={values.space_title}
                        style={gstyle.input}
                        mode="outlined"
                        label="Space Title"
                        placeholder="Space Title"
                        error={
                          errors.space_title && touched.space_title
                            ? true
                            : false
                        }
                      />
                      {errors.space_title && touched.space_title ? (
                        <HelperText type="error">
                          {errors.space_title}
                        </HelperText>
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
                      error={
                        errors.space_state && touched.space_state ? true : false
                      }
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{
                            style: { height: 50, overflow: "hidden" },
                          }}
                          value={values?.space_state}
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
                          value={values.space_campus }
                          placeholder={{
                            label: "Space campus",
                            value: 'Select Campus',
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

                  

                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("space_address")}
                        onBlur={handleBlur("space_address")}
                        value={values.space_address}
                        style={gstyle.input}
                        mode="outlined"
                        label="Space Address"
                        placeholder="Space Address"
                        error={
                          errors.space_address && touched.space_address
                            ? true
                            : false
                        }
                      />
                      {errors.space_address && touched.space_address ? (
                        <HelperText type="error">
                          {errors.space_address}
                        </HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange("rent")}
                        onBlur={handleBlur("rent")}
                        mode="outlined"
                        value={values?.rent?.toString() }
                        style={gstyle.input}
                        label="Rent"
                        placeholder="Rent"
                        keyboardType="number-pad"
                        error={errors.rent && touched.rent ? true : false}
                      />
                      {errors.rent && touched.rent ? (
                        <HelperText type="error">{errors.rent}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl}>
                      <TouchableOpacity
                         style={{
                          padding: 10,
                          paddingVertical: 15,
                          backgroundColor: "#fff",
                          borderWidth: 1,
                          borderColor: "#000",
                          borderRadius: 3,
                        }}
                        onPress={showDatepicker}
                      >
                        <Text style={{ fontSize: 16, left: 5, color: "#222" }}>
                          Select Available Date
                        </Text>
                      </TouchableOpacity>

                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={onChange}
                        />
                      )}
                       { date  && <Text>{date.toUTCString()} </Text> }
                    </View>

                    <View style={gstyle.formControl}>
                      <TextInput
                        value={values.payer_gender}
                        style={gstyle.input}
                        mode="outlined"
                        error={
                          errors.payer_gender && touched.payer_gender
                            ? true
                            : false
                        }
                        render={(props) => (
                          <RNPickerSelect
                            pickerProps={{
                              style: { height: 50, overflow: "hidden" },
                            }}
                            onValueChange={handleChange("payer_gender")}
                            placeholder={{
                              label: "Preferred Gender",
                              value: values.payer_gender,
                            }}
                            value={values.payer_gender}
                            useNativeAndroidPickerStyle={false}
                            items={
                              values.space_for === "Roomies"
                                ? [
                                    {
                                      label: "Anyone welcome",
                                      value: "Anyone welcome",
                                    },
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                  ]
                                : [
                                    {
                                      label: "Anyone welcome",
                                      value: "Anyone welcome",
                                    },
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                    {
                                      label: "Couple Only",
                                      value: "Couple Only",
                                    },
                                  ]
                            }
                          />
                        )}
                      />
                      {errors.about_cohabitation && touched.payer_gender ? (
                        <HelperText type="error">
                          {errors.payer_gender}
                        </HelperText>
                      ) : null}
                    </View>
                  </View>
                  <View>

                  <View style={gstyle.formControl}>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        borderWidth: 1,
                        borderColor: "#000",
                        borderRadius: 3,
                        padding: 10,
                      }}
                    >
                      <HelperText type="info">
                        Enter Tags Separated with space
                      </HelperText>
                      <Text style={{ fontSize: 16 }}>Tags </Text>
                      <AutocompleteTags
                        tags={tags}
                        suggestions={suggestions}
                        onChangeTags={setTags}
                        labelExtractor={labelExtractor}
                      />
                    </View>
                  </View>

{/*                 
                    <View style={gstyle.formControl}>
                      <TextInput
                        value={values.bedroom_type}
                        style={gstyle.input}
                        mode="outlined"
                        error={
                          errors.bedroom_type && touched.bedroom_type
                            ? true
                            : false
                        }
                        render={(props) => (
                          <RNPickerSelect
                            pickerProps={{
                              style: { height: 50, overflow: "hidden" },
                            }}
                            onValueChange={handleChange("bedroom_type")}
                            placeholder={{
                              label: "Bathroom type",
                              value: values.bedroom_type || '',
                            }}
                            value={values.bedroom_type || ''}
                            useNativeAndroidPickerStyle={false}
                            items={[
                              {
                                label: "Shared bathroom",
                                value: "Shared bathroom",
                              },
                              { label: "Own bathroom", value: "Own bathroom" },
                              { label: "Ensuite", value: "Ensuite" },
                            ]}
                          />
                        )}
                      />
                      {errors.about_cohabitation && touched.bedroom_type ? (
                        <HelperText type="error">
                          {errors.bedroom_type}
                        </HelperText>
                      ) : null}
                    </View>

                     */}

                    <View style={gstyle.formControl}>
                      <TextInput
                        value={values.property_type}
                        style={gstyle.input}
                        mode="outlined"
                        error={
                          errors.property_type && touched.property_type
                            ? true
                            : false
                        }
                        render={(props) => (
                          <RNPickerSelect
                            pickerProps={{
                              style: { height: 50, overflow: "hidden" },
                            }}
                            onValueChange={handleChange("property_type")}
                            placeholder={{
                              label: "Property type",
                              value: values.property_type,
                            }}
                            value={values.property_type}
                            useNativeAndroidPickerStyle={false}
                            items={[
                              { label: "1 Bedroom", value: "1 Bedroom" },
                              { label: "2 Bedroom", value: "2 Bedroom" },
                              { label: "3 Bedroom", value: "3 Bedroom" },
                              {
                                label: "Self contained",
                                value: "Self contained",
                              },
                              {
                                label: "Others---please specify",
                                value: "Other",
                              },
                            ]}
                          />
                        )}
                      />
                      {errors.about_cohabitation && touched.property_type ? (
                        <HelperText type="error">
                          {errors.property_type}
                        </HelperText>
                      ) : null}
                    </View>

                    {values.space_for !== "Rent" && (
                      <View style={gstyle.formControl}>
                        <TextInput
                          onChangeText={handleChange("about_cohabitation")}
                          onBlur={handleBlur("about_cohabitation")}
                          value={values.about_cohabitation}
                          style={gstyle.input}
                          mode="outlined"
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
                        multiline={true}
                        numberOfLines={3}
                        mode="outlined"
                        label="About Property"
                        placeholder="About Property"
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

  navContainer: {
    flexDirection: "row",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width,
    justifyContent: "space-between",
  },

  next: {},

  prev: {},

  progress: {
    height: 8,
    backgroundColor: "#ccc",
    margin: 10,
  },

  progressInner: {
    backgroundColor: theme.colors.primary,
    height: 8,
  },
  tabContainer: {
    padding: 10,
    flexDirection: "row",
  },
  tab: {
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
});
