import React, { useState } from 'react';
import { View, StyleSheet,Dimensions, ScrollView, StatusBar } from 'react-native';
import { TextInput,Button,Text,Title,Subheading,HelperText, Caption} from 'react-native-paper';
import {AuthHeader} from '../../components';
import Api from '../../api';
import gstyle from "../../style"
import { Formik } from 'formik';

import * as Yup from 'yup';
import AuthContext from '../../store/context';
import { AlertContext } from '../../context/GlobalAlert';
import { useNavigation, useRoute } from '@react-navigation/core';
import {OtpVerifyRoute } from '../../navigation/type';



const emailSchema = Yup.object().shape({
     email: Yup.string().email().required('Email is required'),
});




export default function Forgemailassword() {
  const initialValues={
    email: "",
  }
  const { width, height } = Dimensions.get('window')
  const [loading, setLoading] = useState(false)
  const {authContext:{signIn}} = React.useContext(AuthContext);
  const { alert : Alert } = React.useContext(AlertContext);
  const route= useRoute<OtpVerifyRoute>()

  const navigation=useNavigation();
  

  const emailVerify=(value:any)=>{
    setLoading(true);
    Api.post("/request-password-reset", value)
    .then((res) => {
      setLoading(false);
      Alert({
        title: "email Verification Successful.",
        type: "success",
        visible: true,
      });
      navigation.navigate("OtpVerifyScreen", { email: value.email,reset:true });
    })
    .catch((err) => {
      setLoading(false);
      Alert({
        title: 'User not found',
        type: "error",
        visible: true,
      });
    });
  }

  return (
    <View style={gstyle.container}>
       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

       <View style={{flex:1}}>
        <View style={{flex:1 }}></View>
         <View style={styles.bCon}>
            <View style={styles.body}>
               <AuthHeader page="Forgot Password" title="" msg="" />
                <Subheading>Enter your email you will be sent a code to reset your password</Subheading>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={values => emailVerify(values)}
                      validationSchema={emailSchema}
                    >
                      {({ handleChange, handleBlur, handleSubmit, values,errors, touched }) => (
                      <View>

                      <View style={gstyle.formControl}>  
                        <TextInput
                          mode="outlined"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          style={gstyle.input}
                          label="Email Address"
                          placeholder="example@mail.com"
                          error={errors.email && touched.email ? true : false}
                        />
                        {errors.email && touched.email ? (
                            <HelperText  type="error">{errors.email}</HelperText>
                          ) : null}

                      </View>

                          <Button loading={loading} disabled={loading} onPress={handleSubmit} theme={{ roundness: 3 }} mode="contained">Submit</Button>

                          {/* <Caption style={{marginTop:10}}>Don't Recieve? Resend</Caption> */}
                      </View>
                      )}
                    </Formik>
               
            </View>
         </View>
       </View>
     </View>
  );
}
                                
const styles=StyleSheet.create({
   bCon:{
     backgroundColor:'white',
     height:'70%',
     borderTopLeftRadius:50,
     borderTopRightRadius:50,
     padding:15,
   },

   body:{
     flex:1,
     backgroundColor:'white',
     transform:[{
       translateY:-50
     }],
     padding:10
   },

    log:{
     fontSize:35,
     color:'#5895F9',
     fontWeight:'700'
   },
})