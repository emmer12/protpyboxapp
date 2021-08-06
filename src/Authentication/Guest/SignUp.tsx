import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { TextInput,Button,Text,Title,Subheading,HelperText} from 'react-native-paper';
import {AuthHeader} from '../../components';
import Api from '../../api';
import gstyle from "../../style"
import { Formik } from 'formik';


export default function SignUp() {

  const { width, height } = Dimensions.get('window')

  return (
    <View style={gstyle.container}>
       <View style={{flex:1}}>
     <View style={{flex:1 }}></View>
         <View style={styles.bCon}>
            <View style={styles.body}>
               <AuthHeader page="Create Account" title="Welcome to ProptyBox" msg="" />


             

               
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

    log:{
     fontSize:35,
     color:'#5895F9',
     fontWeight:'700'
   },
})