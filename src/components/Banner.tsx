import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet,Animated, StyleProp } from 'react-native';
import { Text,Title,Searchbar} from 'react-native-paper';
import theme from '../theme';


interface BannerI {
      text:string;
      search?:boolean;
      position:any;
      type?:'home' | 'page'
    }
const Banner=({text,search,position="center",type="page"}:BannerI)=>{
   const [searchQuery, setSearchQuery] = React.useState('');
   const navigation=useNavigation();
   const onChangeSearch = (query:string) => setSearchQuery(query);

   const submit=()=>{
      if(searchQuery=="") return 
      navigation.navigate("SearchScreen",{sq:searchQuery})
      setSearchQuery('')
   }


   const renderHomeBanner=()=>(
      <View style={[styles.container,{alignItems:position}]}>
       { search && 
      <><Title style={{color:'#fff'}}>{text}</Title>
       <View>
           <Searchbar
            style={{width:'90%'}}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={submit}
            onSubmitEditing={submit}
         />   
       </View></> }
   </View>
   )

   const renderPageBanner=()=>(
      <View style={{backgroundColor: '#fff'}}>
        <Title style={{fontSize:40,padding:10,paddingTop:30,color:theme.colors.primary}}>{text}</Title>
     </View>
   )


   return (
      type === 'home' ? renderHomeBanner() : renderPageBanner()
   )
}

const styles=StyleSheet.create({
   container:{
      backgroundColor: '#5895F9',
      // backgroundColor:'#EEF4FF',
      maxHeight:150,
      padding:10,
      paddingVertical:20,
   },
  
})


export default Banner;
