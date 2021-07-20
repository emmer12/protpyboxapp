import * as React from 'react';
import { View, StyleSheet,Animated } from 'react-native';
import { Text,Title,Searchbar} from 'react-native-paper';


interface BannerI {
      text:string;
      search?:boolean;
    }
const Banner=({text,search}:BannerI)=>{
   const [searchQuery, setSearchQuery] = React.useState('');
   
   const onChangeSearch = (query:string) => setSearchQuery(query);

   const submit=()=>{
      alert('yes')
   }
   return (
    <View style={styles.container}>
       <Title style={{color:'#fff'}}>{text}</Title>
       { search && 
       <View>
           <Searchbar
            style={{width:'90%'}}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={submit}
            onSubmitEditing={submit}
         />   
       </View> }
   </View>
   )
}

const styles=StyleSheet.create({
   container:{
      backgroundColor: '#5895F9',
      // backgroundColor:'#EEF4FF',
      maxHeight:150,
      padding:10,
      paddingVertical:20,
      alignItems:'center'
   },
  
})


export default Banner;
