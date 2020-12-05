import React,{useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Onboarding({ navigation: { navigate } }) {
  const [user, setUser] = React.useState({}); 

  useEffect(() => {
    return () => {
      apiCall()
    };
  }, [])



  const apiCall= ()=>{
    fetch('https://proptybox.com/api/v1/get-user-by-id?id=1',{
    }).then(res=>res.json()).then((data)=>{
      setUser({
        data
      })
      console.log('====================================');
      console.log(user);
      console.log('====================================');
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  return (
    <View style={styles.header}>
      <Button raised theme={{ roundness: 3 }} mode="contained" onPress={() => { navigate('SignInScreen') }}>
        Sign In
    </Button>
     </View>
  );
}
                                
const styles=StyleSheet.create({
    header:{
        backgroundColor:'#fff',
        padding:10,
        marginTop:30,
        elevation:4
    }
})