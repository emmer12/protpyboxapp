import React, { useState } from 'react';
import { View, StyleSheet,Dimensions, ScrollView, StatusBar } from 'react-native';
import { TextInput,Button,Text,Title,Subheading,HelperText, Caption} from 'react-native-paper';
import {AuthHeader} from '../../components';
import Api from '../../api';
import gstyle from "../../style"
import { Formik, useFormik } from 'formik';

import * as Yup from 'yup';
import AuthContext from '../../store/context';
import { AlertContext } from '../../context/GlobalAlert';
import { useNavigation, useRoute } from '@react-navigation/core';
import {OtpVerifyRoute } from '../../navigation/type';



const OtpSchema = Yup.object().shape({
     otp: Yup.number().required('otp number is required'),
});




export default function OtpVerify() {
  const initialValues={
    otp: "",
  }
  const { width, height } = Dimensions.get('window')
  const [loading, setLoading] = useState(false)
  const {authContext:{signIn}} = React.useContext(AuthContext);
  const { alert : Alert } = React.useContext(AlertContext);
  const route= useRoute<OtpVerifyRoute>();
  const navigation=useNavigation();
  const OtpVerify=(value:any,resetForm:any)=>{
// Check your email for the Otp
    setLoading(true);
    value.email=route.params.email; 
    let reset=route.params.reset || false; 
    Api.post("/email-otp-verification", value)
    .then((res) => {
      setLoading(false);
      Alert({
        title: "Otp Verification Successful.",
        type: "success",
        visible: true,
      });

      if (reset) {
        navigation.navigate('ResetPassword',{email:value.email})
      }else{
        signIn(res.data.access_token);
      }
      
    })
    .catch((err) => {
      setLoading(false);
      resetForm()
      Alert({
        title: err.response.data.msg,
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
               <AuthHeader page="Otp Verification" title="" msg="Check your email for the Otp" />
                <Subheading>Check your email ({route.params.email}) for the Otp</Subheading>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={(values,{ resetForm }) => OtpVerify(values,resetForm)}
                      validationSchema={OtpSchema}
                    >
                      {({ handleChange, handleBlur, handleSubmit, values,errors, touched }) => (
                      <View>

                      <View style={gstyle.formControl}>  
                        <TextInput
                          onChangeText={handleChange('otp')}
                          onBlur={handleBlur('otp')}
                          value={values.otp}
                          style={gstyle.input}
                          label="******"
                          placeholder="Enter your name"
                          keyboardType="number-pad"
                          error={errors.otp && touched.otp ? true : false}
                        />
                        {errors.otp && touched.otp ? (
                            <HelperText  type="error">{errors.otp}</HelperText>
                          ) : null}

                      </View>

                          <Button loading={loading} disabled={loading} onPress={handleSubmit} theme={{ roundness: 3 }} mode="contained">Submit</Button>

                          <Caption style={{marginTop:10}}>Don't Recieve? Resend</Caption>
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
     height:'90%',
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