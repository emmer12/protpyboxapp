import React,{useEffect} from 'react';
import { View, Text, StyleSheet,Image,Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import Board from 'react-native-onboarding-swiper';

const {width,height}=Dimensions.get('window')
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
    }).catch((err)=>{
      
    })
  }
  return (

    <Board
    onSkip={()=>navigate('SignInScreen')}
    onDone={()=>navigate('SignInScreen')}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('./images/img1.png')} style={{height:300,width}}  />,
      title: 'Signup',
      subtitle: 'Done with React Native Onboarding Swiper',
    },

    {
      backgroundColor: '#fff',
      image: <Image source={require('./images/img2.png')} style={{height:300,width}}  />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },

    {
      backgroundColor: '#fff',
      image: <Image source={require('./images/img3.png')} style={{height:300,width}}  />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
   
  ]}
/>
   
  );
}
          

// <View style={styles.header}>
// <Button raised theme={{ roundness: 3 }} mode="contained" onPress={() => { navigate('SignUpScreen') }}>
//   Sign Up
// </Button>

// <Button style={{marginTop:5}} raised theme={{ roundness: 3 }} mode="contained" onPress={() => { navigate('SignInScreen') }}>
//   Sign In
// </Button>
// </View>


const styles=StyleSheet.create({
    header:{
        backgroundColor:'#fff',
        padding:10,
        marginTop:30,
        elevation:4
    }
})