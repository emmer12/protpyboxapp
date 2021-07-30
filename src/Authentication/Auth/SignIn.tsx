import React,{useState} from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { TextInput,Button,Text,HelperText,Caption  } from 'react-native-paper';
import {AuthHeader} from './../../components';
import gstyle from "./../../style"
import { Formik } from 'formik';
import Api from '../../api';
import { saveToken } from '../../store/async';
import AuthContext from './../../store/context'
import { AlertContext } from '../../context/GlobalAlert';


import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
   password: Yup.string()
     .min(6, 'Password must be more than six(6) characters')
     .required('Password is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
 });
 
 const { width, height } = Dimensions.get('window')

export default function SignUp() {

  const [loading, setLoading] = useState(false)
  const { signIn } = React.useContext(AuthContext);
  const { alert : Alert } = React.useContext(AlertContext);

  const handleLogin=(value)=>{
    setLoading(true);

    Api.post('/login',value).then(res=>{
      setLoading(false);
      Alert({
        title:"You are Welcome",
        type:'success',
        visible:true
      })
      signIn(res.data.data.access_token)
      
    }).catch(err=>{
      setLoading(false);
      Alert({
        title:err.response.data.msg,
        type:'error',
        visible:true
      })
    })
  }

  return (
    <View style={gstyle.container}>
       <View style={{flex:1}}>
     <View style={{flex:1 }}></View>
         <View style={styles.bCon}>
            <View style={styles.body}>
               <AuthHeader page="Sign in" title="Welcome Back" msg="" />

               <Formik
                initialValues={{ email: '',password:'' }}
                onSubmit={values => handleLogin(values)}
                validationSchema={SignupSchema}
              >
                {({ handleChange, handleBlur, handleSubmit, values,errors, touched }) => (
                 <View>

                   
                <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={gstyle.input}
                      label="Email Address"
                      placeholder="mail@example.com"
                      error={errors.email && touched.email ? true : false}
                      keyboardType="email-address"
                    />
                    {errors.email && touched.email ? (
                        <HelperText  type="error">{errors.email}</HelperText>
                      ) : null}

                  </View>

                  <View style={gstyle.formControl}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      style={gstyle.input}
                      label="Password"
                      placeholder="**********"
                      secureTextEntry={true}
                      error={errors.password && touched.password ? true : false}
                      
                    />
                     {errors.password && touched.password ? (
                        <HelperText  type="error">{errors.password}</HelperText>
                      ) : null}

                    </View>

                    <View style={styles.forgot}>
                      <Caption  >Forgot password?</Caption >
                    </View>
                    <Button loading={loading} onPress={handleSubmit} theme={{ roundness: 3 }} mode="contained">Submit</Button>
                 </View>
                  

                )}
              </Formik>



              <View style={styles.orSocial}>
                <Text>Or</Text>
              </View>

              <View>
                <Button icon="google" style={{marginTop:10}} theme={{ roundness: 3 }} color="#FF3E30" mode="outlined">Login with Google</Button>
                <Button icon="facebook" style={{marginTop:5}} theme={{ roundness: 3 }} mode="outlined">Login with facebook</Button>
              </View>
              
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
     padding:20
   },

   body:{
     flex:1,
     backgroundColor:'white',
     transform:[{
       translateY:-100
     }],
     padding:10
   },
   forgot:{
     alignItems:"flex-end",
     marginVertical:10
   },

   orSocial:{
     backgroundColor:'#EEF4FF',
     width:30,
     height:30,
     borderRadius:15,
     alignItems:'center',
     justifyContent:'center',
     marginTop:20,
     marginVertical:10,
     left:(0.50 * width)-40 

   }
})