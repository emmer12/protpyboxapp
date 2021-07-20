import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Picker, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import gstyle from "../../style"
import { TextInput, Button, Text, HelperText, Caption } from 'react-native-paper';
import { Formik } from 'formik';
import Api from '../../api';
import DropDown from 'react-native-paper-dropdown';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import { DatePickerModal } from 'react-native-paper-dates';


const { width, height } = Dimensions.get('window')

const RequestSchema = Yup.object().shape({
  about_cohabitation: Yup.string().required('About cohabitation is required'),
  space_type: Yup.string().required('Space type is required'),
  space_for: Yup.string().required('This field is required'),
});

export default function Home() {

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const init = {
    about_cohabitation: "",
    about_property: "",
    available_from: "",
    bedroom_type: "",
    rent: "",
    duration: "",
    space_address: "",
    property_type: "",
    space_for: "",
    space_type: "",
    payer_gender: "",
    space_location:'',
    selectedTags:[],
    images:'',
  }
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const handleRequest = (values: Object) => {
    console.log(values)
  }

  const genderList = [
    { label: 'Property Type', value: 'Property Type', custom: <Text style={{ color: '#444' }}>Property Type</Text> },
    { label: 'Apartment', value: 'apartment', custom: <Text style={{ color: '#444' }}>Apartment</Text> },
  ];



  return (
    <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={70} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

                  <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange('space_address')}
                      onBlur={handleBlur('space_address')}
                      value={values.space_address}
                      style={gstyle.input}
                      label="Space Address"
                      placeholder="Space Address"
                      error={errors.space_address && touched.space_address ? true : false}
                    />
                    {errors.space_address && touched.space_address ? (
                      <HelperText type="error">{errors.space_address}</HelperText>
                    ) : null}
                  </View>
                  <View style={styles.row}>
                    <View style={styles.col}>
                    <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange('rent')}
                        onBlur={handleBlur('rent')}
                        value={values.rent}
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
                    </View>
                    <View style={styles.col}>
                    <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange('duration')}
                      onBlur={handleBlur('duration')}
                      value={values.duration}
                      style={gstyle.input}
                      label="Per (Month,Year)"
                      placeholder="e.g, Month"
                      error={errors.duration && touched.duration ? true : false}
                    />
                    {errors.duration && touched.duration ? (
                      <HelperText type="error">{errors.duration}</HelperText>
                    ) : null}
                  </View>
                  </View>
                  </View>

                  <View style={gstyle.formControl}>
                  <Button onPress={() => setOpen(true)} uppercase={false} mode="text">
                       {Date.parse(date) || "Available From"}
                </Button>
                <DatePickerModal
                      // locale={'en'} optional, default: automatic
                      mode="single"
                      visible={open}
                      onDismiss={onDismissSingle}
                      date={date}
                      onConfirm={onConfirmSingle}
                      // validRange={{
                      //   startDate: new Date(2021, 1, 2),  // optional
                      //   endDate: new Date(), // optional
                      // }}
                      // onChange={} // same props as onConfirm but triggered without confirmed by user
                      // saveLabel="Save" // optional
                      // label="Select date" // optional
                      // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                    />
                    </View>


                    <View style={gstyle.formControl} >
                    <TextInput
                      value={values.payer_gender}
                      style={gstyle.input}
                      error={errors.payer_gender && touched.payer_gender ? true : false}
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{ style: { height: 50, overflow: 'hidden' } }}
                          onValueChange={handleChange('payer_gender')}
                          placeholder={{ label: 'Preferred Gender', value: values.payer_gender }}
                          value={values.space_type}
                          useNativeAndroidPickerStyle={false}

                          items={ values.space_for === 'Roomies' ? [
                            { label: 'Anyone welcome', value: 'Anyone welcome' },
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                          ] : [
                            { label: 'Anyone welcome', value: 'Anyone welcome' },
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                            { label: 'Couple Only', value: 'Couple Only' },
                          ]
                        }
                        />
                      )}

                    />
                    {errors.about_cohabitation && touched.payer_gender ? (
                      <HelperText type="error">{errors.payer_gender}</HelperText>
                    ) : null}

                  </View>


                  <View style={gstyle.formControl}>
                      <TextInput
                        onChangeText={handleChange('rent')}
                        onBlur={handleBlur('rent')}
                        value={values.rent}
                        style={gstyle.input}
                        label="Tag"
                        placeholder="Tag"
                        keyboardType="number-pad"
                        error={errors.rent && touched.rent ? true : false}
                      />
                      {errors.rent && touched.rent ? (
                        <HelperText type="error">{errors.rent}</HelperText>
                      ) : null}
                    </View>

                    <View style={gstyle.formControl} >
                    <TextInput
                      value={values.bedroom_type}
                      style={gstyle.input}
                      error={errors.bedroom_type && touched.bedroom_type ? true : false}
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{ style: { height: 50, overflow: 'hidden' } }}
                          onValueChange={handleChange('bedroom_type')}
                          placeholder={{ label: 'Bathroom type', value: values.bedroom_type }}
                          value={values.space_type}
                          useNativeAndroidPickerStyle={false}

                          items={[
                            { label: 'Shared bathroom', value: 'Shared bathroom' },
                            { label: 'Own bathroom', value: 'Own bathroom' },
                            { label: 'Ensuite', value: 'Ensuite' },
                          ]}
                        />
                      )}

                    />
                    {errors.about_cohabitation && touched.bedroom_type ? (
                      <HelperText type="error">{errors.bedroom_type}</HelperText>
                    ) : null}

                  </View>

                  <View style={gstyle.formControl} >
                    <TextInput
                      value={values.property_type}
                      style={gstyle.input}
                      error={errors.property_type && touched.property_type ? true : false}
                      render={(props) => (
                        <RNPickerSelect
                          pickerProps={{ style: { height: 50, overflow: 'hidden' } }}
                          onValueChange={handleChange('property_type')}
                          placeholder={{ label: 'Property type', value: values.property_type }}
                          value={values.space_type}
                          useNativeAndroidPickerStyle={false}

                          items={[
                            { label: '1 Bedroom', value: '1 Bedroom' },
                            { label: '2 Bedroom', value: '2 Bedroom' },
                            { label: '3 Bedroom', value: '3 Bedroom' },
                            { label: 'Self contained', value: 'Self contained' },
                            { label: 'Others---please specify', value: 'Other' },
                          ]}
                        />
                      )}

                    />
                    {errors.about_cohabitation && touched.property_type ? (
                      <HelperText type="error">{errors.property_type}</HelperText>
                    ) : null}

                  </View>

                 {values.space_for !== 'Rent' && <View style={gstyle.formControl}>
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
}
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