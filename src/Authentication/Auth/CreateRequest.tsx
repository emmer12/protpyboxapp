import React, { useState,useContext } from 'react';
import { View, StyleSheet, Dimensions, Picker, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import gstyle from "../../style"
import { TextInput, Button, Text, HelperText, Caption } from 'react-native-paper';
import { Formik } from 'formik';
import Api from '../../api';
import DropDown from 'react-native-paper-dropdown';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import { Loading } from "../../components/Loading";
import {AlertContext} from '../../context/GlobalAlert'


const { width, height } = Dimensions.get('window')

const RequestSchema = Yup.object().shape({
  about_cohabitation: Yup.string().required('About cohabitation is required'),
  space_type: Yup.string().required('Space type is required'),
  space_for: Yup.string().required('This field is required'),
});

export default function Home() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState();
  const [loading, setLoading] = useState(false);
  const {alert:Alert} = useContext(AlertContext)



  const init = {
    space_type: "",
    space_for: "",
    space_location: "",
    about_property: "",
    min_budget: "",
    max_budget: "",
    about_cohabitation: "",
  }

  const handleRequest = (values: Object) => {
    setLoading(true)
    Api.post('/send-requet',values).then((res)=>{
      setLoading(false)
      Alert({
        title:"Request created",
        type:'success',
        visible:true
      })
    }).catch((err)=>{
      setLoading(false)
      Alert({
        title:"Opps, something went wrong",
        type:'error',
        visible:true
      })
    })
  }

  const genderList = [
    { label: 'Property Type', value: 'Property Type', custom: <Text style={{ color: '#444' }}>Property Type</Text> },
    { label: 'Apartment', value: 'apartment', custom: <Text style={{ color: '#444' }}>Apartment</Text> },
  ];



  return (
      <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={70} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
       {loading && <Loading />}
       <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={{ margin: 20 }}>
            <Formik
              initialValues={init}
              onSubmit={values => handleRequest(values)}
              validationSchema={RequestSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>

                  <View style={gstyle.formControl} >
                    <TextInput
                      value={values.space_type}
                      style={gstyle.input}
                      error={errors.space_type && touched.space_type ? true : false}
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{ style: { height: 50, overflow: 'hidden' } }}
                          onValueChange={handleChange('space_type')}
                          placeholder={{ label: 'Select space type', value: values.space_type }}
                          value={values.space_type}
                          useNativeAndroidPickerStyle={false}

                          items={[
                            { label: 'Apartment', value: 'apartment' },
                          ]}
                        />
                      )}

                    />
                    {errors.about_cohabitation && touched.space_type ? (
                      <HelperText type="error">{errors.space_type}</HelperText>
                    ) : null}

                  </View>

                  <View style={gstyle.formControl} >
                    <TextInput
                      value={values.space_for}
                      style={gstyle.input}
                      error={errors.space_for && touched.space_for ? true : false}
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{ style: { height: 50, overflow: 'hidden' } }}
                          onValueChange={handleChange('space_for')}
                          placeholder={{ label: 'Space for ', value: values.space_for }}
                          value={values.space_type}
                          useNativeAndroidPickerStyle={false}

                          items={[
                            { label: 'Rent', value: 'Rent' },
                            { label: 'Roomies', value: 'Roomies' },
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
                      onChangeText={handleChange('space_location')}
                      onBlur={handleBlur('space_location')}
                      value={values.space_location}
                      style={gstyle.input}
                      label="Space Location"
                      placeholder="Space Location"
                      error={errors.space_location && touched.space_location ? true : false}
                    />
                    {errors.space_location && touched.space_location ? (
                      <HelperText type="error">{errors.space_location}</HelperText>
                    ) : null}
                  </View>

                  <View style={styles.row}>
                    <View style={styles.col}>
                      <View style={gstyle.formControl}>
                        <TextInput
                          onChangeText={handleChange('min_budget')}
                          onBlur={handleBlur('min_budget')}
                          value={values.min_budget}
                          style={gstyle.input}
                          label="Min budget"
                          placeholder="Min"
                          keyboardType="number-pad"
                          error={errors.min_budget && touched.min_budget ? true : false}
                        />
                        {errors.min_budget && touched.min_budget ? (
                          <HelperText type="error">{errors.min_budget}</HelperText>
                        ) : null}
                      </View>
                    </View>
                    <View style={styles.col}>
                      <View style={gstyle.formControl}>
                        <TextInput
                          onChangeText={handleChange('max_budget')}
                          onBlur={handleBlur('max_budget')}
                          value={values.max_budget}
                          style={gstyle.input}
                          label="Max budget"
                          placeholder="Max"
                          keyboardType="number-pad"
                          error={errors.max_budget && touched.max_budget ? true : false}
                        />
                        {errors.max_budget && touched.max_budget ? (
                          <HelperText type="error">{errors.max_budget}</HelperText>
                        ) : null}
                      </View>
                    </View>
                  </View>


                  <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange('about_cohabitation')}
                      onBlur={handleBlur('about_cohabitation')}
                      value={values.about_cohabitation}
                      style={gstyle.input}
                      multiline={true}
                      numberOfLines={3}
                      label="About Cohabitant"
                      placeholder="About Cohabitant"
                      error={errors.about_cohabitation && touched.about_cohabitation ? true : false}
                    />
                    {errors.about_cohabitation && touched.about_cohabitation ? (
                      <HelperText type="error">{errors.about_cohabitation}</HelperText>
                    ) : null}
                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange('about_property')}
                      onBlur={handleBlur('about_property')}
                      value={values.about_property}
                      style={gstyle.input}
                      multiline={true}
                      numberOfLines={3}
                      label="About Property"
                      placeholder="About Property"
                      error={errors.about_property && touched.about_property ? true : false}
                    />
                    {errors.about_property && touched.about_property ? (
                      <HelperText type="error">{errors.about_property}</HelperText>
                    ) : null}
                  </View>

                  <Button onPress={handleSubmit} theme={{ roundness: 3 }} mode="contained">Submit</Button>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})