import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput,Button,Text,Title,Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function SignIn() {

  const [email, setEmail] = React.useState(''); 
  const [loading, setLoading] = React.useState(false); 
  const [password, setPassword] = React.useState(''); 
  const [errors, setErrors] = React.useState({
    msg:''
  }); 
  
  
  const signIn=()=>{
    setLoading(true)
    fetch('https://proptybox.com/api/v1/login',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json()).then((data)=>{
      setLoading(false)
    }).catch((err)=>{
      setLoading(false)
      setErrors({
        msg:"Invalid cridentials"
      })
    })
  }

  return (
    <View style={styles.container}>

      <View style={styles.formContaiiner}>
        <View style={styles.header}>
        <Title>Welcome Back</Title>
        <Text style={styles.log}>Login </Text>
        <Text>{errors && errors.msg}</Text>

        </View>

        <TextInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={email => setEmail(email)}
          mode='flat'
          style={styles.input}

        />

      <TextInput
            label="Password"
            placeholder="********"
            value={password}
            mode='flat'
            onChangeText={password => setPassword(password)}
            style={styles.input}
            secureTextEntry={true}

          />

         <Button loading={loading} raised theme={{ roundness: 3 }}  mode="contained" onPress={signIn}>
             Sign In
          </Button>

          <Subheading style={{color:'#888',textAlign:'center',paddingVertical:10}}>Fotgot password ?</Subheading>
      </View>
      <View style={styles.footer}>
        <Button style={{width:'50%'}}><Text style={{width:'100%',textAlign:'center'}}><Icon name="google" size={18} color="#5895F9" /> Login In with Google</Text>
        </Button>
        <Button style={{width:'50%'}}><Text style={{textAlign:'center'}}><Icon name="facebook" size={18} color="#5895F9" /> Login In with Facebook 
        </Text>
      
        </Button>
      </View>
     </View>

  );
}
                                
const styles=StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'#EEF4FF',
     alignItems:'center',
     justifyContent:'center'
   },
   formContaiiner:{
     width:'100%',
     backgroundColor:'#fff',
     padding:20,
     paddingTop:30,
     margin:10,
     borderTopLeftRadius:50,
     borderTopRightRadius:50

   },
   log:{
     fontSize:35,
     color:'#5895F9',
     fontWeight:'700'
   },
   input:{
     backgroundColor:'#EEF4FF',
     marginVertical:10
   },

   footer:{
     width:'100%',
     backgroundColor:'#fff',
     display:'flex',
     flexDirection:'row',
     justifyContent:'center',
     position:'absolute',
     bottom:0,
     padding:10
   }
})