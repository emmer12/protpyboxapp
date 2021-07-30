import * as React from 'react';
import { Text, View, StyleSheet,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';


interface LoadingProps {
    
}

const {width,height}=Dimensions.get('window')

const Loading = (props: LoadingProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <LottieView style={{width:70}} source={require('./animationJson/loading.json')} autoPlay loop />
            <Text style={{color:'#5895F9'}}>Loading...</Text>
        </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
      backgroundColor:'rgba(0,0,0,0.5)',
      position:'absolute',
      zIndex:999,
      left:0,
      top:-50,
      justifyContent:'center',
      alignItems:'center',
      width,
      height
  },
  card:{
      height:height/4 ,
      width:width/2 ,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      padding:20,

  }
});
