import * as React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { Text,Title,Searchbar,Button, Avatar} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../api';
import AuthContext from '../../store/context';


const Right=()=>{
   const navigation=useNavigation()
   const { user,authContext:{signOut} } = React.useContext(AuthContext);
   const imageUrl: any =user && `${baseURL}/uploads/profile-images/${user.profile_pic_filename}`;

   
   return (
    <View style={styles.container}>
        {/* <TouchableOpacity style={styles.item}>
         <Ionicons name="md-notifications" size={26} color="grey" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>navigation.navigate("SearchScreen")} style={styles.item}>
        <Ionicons name="md-search" size={24} color="grey" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.item} onPress ={ ( ) => navigation.openDrawer()}>
        <Ionicons name="md-menu" size={32} color="grey" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.item} onPress ={ ( ) => navigation.openDrawer()}>
        <Avatar.Image
      //   style={styles.item}
                source={{
                  uri: imageUrl,
                }}
                size={32}
              />
            </TouchableOpacity>
   </View>
   )
}

const styles=StyleSheet.create({
    container:{
       flex: 1,
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'

    },
    item:{
        color:'red',
        backgroundColor:'#f6f8f9',
        borderRadius:50,
        marginHorizontal:10,
        textAlign:'center',
        alignSelf:'center',
        padding:5,
        elevation:1

    }
   
 })



export default Right;
