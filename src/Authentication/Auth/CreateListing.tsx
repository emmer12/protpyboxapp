import React, { useState,useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, Picker, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView,TouchableOpacity,Animated,Image } from 'react-native';
import gstyle from "../../style"
import { TextInput, Button, Text, HelperText, Caption, Colors, Title } from 'react-native-paper';
import { Formik } from 'formik';
import Api from '../../api';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../../theme';
import * as ImagePicker from 'expo-image-picker';
import {AlertContext} from '../../context/GlobalAlert'
import AutocompleteTags from 'react-native-autocomplete-tags'
import { ListingType } from '../type';


// import DropDown from 'react-native-paper-dropdown';
// import { DatePickerModal } from 'react-native-paper-dates';
// import { ImageBrowser } from 'expo-image-picker-multiple';

const suggestions = ['ensuite', 'apartment', 'rent', 'cohab','space shareing','self-contain','1-bedroom-flat','2-bedroom-flat','3-bedroom-flat'];
const { width, height } = Dimensions.get('window')

const RequestSchema = Yup.object().shape({
  // about_cohabitation: Yup.string().required('About cohabitation is required'),
  space_type: Yup.string().required('Space type is required'),
  space_for: Yup.string().required('This field is required'),
  rent: Yup.string().required('This field is required'),
  duration: Yup.string().required('This field is required'),
  space_address: Yup.string().required('This field is required'),
  payer_gender: Yup.string().required('This field is required'),
  space_location: Yup.string().required('This field is required'),
});

export default function Home({navigation}:any) {

  // const [date, setDate] = React.useState<Date | undefined>(undefined);
  // const [open, setOpen] = React.useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [tags, setTags] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  let AnimatedVal=new Animated.Value(1)
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {alert:Alert} = useContext(AlertContext)
 
  const labelExtractor = (tag: string) => tag;

  const [activeIndex,setActive]=useState(1)

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
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);  
  
  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode:any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };




  const handleRequest = (values:ListingType ) => {
    let day=new Date(date).getDate()
    let month=new Date(date).getMonth() + 1
    let year=new Date(date).getFullYear()
    values.available_from =`${year}-${month}-${day}`
    values.selectedTags=tags
    setLoading(true)
    Api.post('/create-listing',values).then((res)=>{
      setLoading(false)
      if(res.status === 200) {
        console.log(res)
        const list=res.data.list
        navigation.navigate('UploadImage',{
          params:{
            list
          }
        })
        Alert({
          title:"Request created",
          type:'success',
          visible:true
        })
      }else{
        Alert({
          title:"Request Failed",
          type:'error',
          visible:true
        })
      }
    }).catch((err)=>{
      setLoading(false)

      console.log(err.response)
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



  const handleNext = () => {
    let next = activeIndex + 1;
    Animated.timing(AnimatedVal,{
      toValue:next,
      useNativeDriver:false,
      duration:500
    }).start(()=>{
    setActive(next)
  })
  };


  const handlePrev = () => {
    let next = activeIndex - 1;
    Animated.timing(AnimatedVal,{
      toValue:next,
      useNativeDriver:false,
      duration:500
    }).start(()=>{
    setActive(next)
  })
  };


  // const progressWidth=`${(activeIndex/4)*100}%`;


  const animWidth={
    width:AnimatedVal.interpolate({
      inputRange:[1,3],
      outputRange:['33.33%','100%']
    })
  }



  return (
    <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={70} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.progress}>
          <Animated.View style={[styles.progressInner,animWidth]}></Animated.View>
      </View>

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
                  {/* Tab 1 */}


                 { activeIndex === 1 && 
                 
                 
                 (<View>

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

                  </View>)
                

                  }



                  {/* Close First section */}



                  {/* Second Section  */}

                 { activeIndex === 2 && 

                  
                  (<View>

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
                  <TouchableOpacity style={{ padding:10,paddingVertical:15,backgroundColor:'#EEF4FF'}} onPress={showDatepicker}  >
                       <Text style={{fontSize:16,left:5,color:'#222'}}>Select Available From</Text>
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
                  
                  
                  </View>)

                    }

                  {/* Close Second Section */}



                  {/* Third Section */}
                 { activeIndex === 3 && 

                  (<View>

                  <View style={gstyle.formControl}>
                      {/* <TextInput
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
                      ) : null} */}
                      <View style={{backgroundColor:theme.colors.surface,padding:10}}>
                      <Text style={{fontSize:16}}>Tags </Text>
                      <AutocompleteTags
                            tags={tags}
                            suggestions={suggestions}
                            onChangeTags={setTags}
                            labelExtractor={labelExtractor}
                          />
                      </View>
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

                  </View>)

                    }

                  {/* Close Third section */}
                

              
                   {/* 
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Button title="Pick an image from camera roll" onPress={pickImage} >Upload Preview Images</Button>
                      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View> */}


                  {/* Forth Section */}



                  { activeIndex === 3 &&  (<Button onPress={handleSubmit} theme={{ roundness: 3 }} mode="contained">Submit</Button>) }
                 

                </View>
              )}

            </Formik>

          </View>
        </TouchableWithoutFeedback>
         </ScrollView>
            
            
            <View style={styles.navContainer}>
              { activeIndex > 1 && <Button onPress={handlePrev} style={styles.prev} mode="outlined">Prev</Button>}
              <View></View>
              { activeIndex !== 3 && <Button onPress={handleNext} style={styles.next} mode="outlined">Next</Button>}
            </View>

           

            
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
  },

  navContainer:{
    flexDirection:'row',
    padding:10,
    position:'absolute',
    bottom:0,
    width,
    justifyContent:'space-between'
  },

  next:{
    
  },

  prev:{

  },

  progress:{
    height:8,
    backgroundColor:'#ccc',
    margin:10
  },

  progressInner:{
    backgroundColor:theme.colors.primary,
    height:8,

  }

})