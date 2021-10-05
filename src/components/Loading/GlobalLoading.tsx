import * as React from 'react';
import { Text, View, StyleSheet,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';


interface LoadingProps {
    
}

const {width,height}=Dimensions.get('window')

const GlobalLoading = (props: LoadingProps) => {
  return (
    <View style={styles.container}>
        <View>
            <LottieView style={{width:70}} source={require('./animationJson/loading.json')} autoPlay loop />
        </View>
    </View>
  );
};

export default GlobalLoading;

const styles = StyleSheet.create({
  container: {
      position:'absolute',
      zIndex:999,
      left:0,
      justifyContent:'center',
      alignItems:'center',
      width,
      height
  }
});
