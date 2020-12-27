import * as React from 'react';
import { View, StyleSheet,Animated } from 'react-native';
import { Text,Title} from 'react-native-paper';


interface AuthHeader {
      title:String;
      page:String;
      msg?:String;
    }
const AuthHeader=({title,page,msg}:AuthHeader)=>{
   const scale = React.useState(new Animated.Value(0))[0]


   const under = scale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
  })

  const handleScale = () => {
   Animated.timing(scale, {
       toValue: 1,
       duration: 300,
       delay: 500,
       useNativeDriver: true
   }).start()

}

React.useEffect(() => {

   handleScale()

}, [])


   return (
    <View >
       <View>
          <Title>{title}</Title>
          <Text style={styles.page}>{page}</Text>
       </View>
       <Animated.View style={[styles.under,{
          transform:[
             {scaleX:under}
          
          ]}]}></Animated.View>
   </View>
   )
}

const styles=StyleSheet.create({
   page:{
     fontSize:35,
     color:'#5895F9',
     fontWeight:'700'
   },
   under:{
      backgroundColor:"#5895F9",
      height:4,
      width:50,
      marginVertical:5
   }

})


export default AuthHeader;
