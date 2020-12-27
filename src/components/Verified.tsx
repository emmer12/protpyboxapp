import * as React from 'react';
import { View, StyleSheet,Animated, TouchableOpacity } from 'react-native';
import { Text,Title} from 'react-native-paper';
import { Person,Phone,Envelope } from "./../icons/"
import FontAwesome from 'react-native-vector-icons/FontAwesome';



interface Verify {
      email:Boolean;
      id:Boolean;
      phone:Boolean;
    }
const Verified=({email,id,phone}:Verify)=>{
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
    <View style={styles.con} >
       <TouchableOpacity style={styles.verify}>
           <Envelope  fill={email ? '#5895F9' : 'grey'} />
           {email && <FontAwesome name="check-circle" size={25} color="green" style={styles.check} />}
       </TouchableOpacity>
       <TouchableOpacity style={styles.verify}>
           <Person fill={id ? '#5895F9' : 'grey'} />
           {id && <FontAwesome name="check-circle" size={25} color="green" style={styles.check} />}
       </TouchableOpacity>
       <TouchableOpacity style={styles.verify}>
           <Phone fill={phone ? '#5895F9' : 'grey'} />
           {phone && <FontAwesome name="check-circle" size={25} color="green" style={styles.check} />}
       </TouchableOpacity>
   </View>
   )
}

const styles=StyleSheet.create({
   con:{
     flexDirection:'row',
     justifyContent:'center',
   },
   verify:{
       paddingHorizontal:15,
       paddingVertical:20
   },
   check:{
       marginTop:-20,
       marginLeft:36
   }
   

})


export default Verified;
