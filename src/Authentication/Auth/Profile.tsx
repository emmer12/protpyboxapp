import React,{useState,useEffect} from 'react';
import { View,Text, StyleSheet,Dimensions,ActivityIndicator,FlatList } from 'react-native';
import { Chat } from "../../icons/"
import { Avatar,Title } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Api from '../../api';
import { Verified } from './../../components'
import { ProptyBox } from './../../components'

const { width, height } = Dimensions.get('window')

interface UserProps{
  fullname:string;
  listing:Array<{}>;
  gender:string;
  age:string

}

export default function Profile({navigation}:{navigation:any}) {
  const [user, setUser] = React.useState<UserProps>({}); 
  const [loading, setLoading] = React.useState<boolean>(false); 

  useEffect(() => {
      getUser()
  }, [])

  const getUser=()=>{
    setLoading(true)
    Api.get('auth-user').then(res=>{
    setLoading(false)
    console.log(res.data.data)
      setUser(res.data.data)
    }).catch(err=>{
      console.log(err);
    })

  }

  const renderItem = ({ item }:any) => (
    <ProptyBox list={item} navigation={navigation} />    
  );

  const imageUrl:any=user && `https://proptybox.com/uploads/profile-images/${user.profile_pic_filename}`

  return (
    <View>
      <View style={styles.con}>
      <View style={styles.profile}>
         <View style={styles.proTop}>
         <Chat />
         <FontAwesome name="cog" color="#444" size={32}  />
         </View>
         <View style={styles.avatar}>
           <Avatar.Image size={150} source={{uri:imageUrl}} />
         </View>
         
         <View style={styles.details}>
          <View style={{alignItems:'center'}}>
            <Title>{ user?.fullname}</Title>
          </View>

          <View  style={{alignItems:'center'}}>
            <Text>{ user?.gender},{ user?.age}</Text>
          </View>

          <View>
            <View  style={{alignItems:'center'}}>
              <Title style={{fontSize:16}}>Verify Account</Title>
           </View>
             <Verified email={true} phone={true} id={false} />
          </View>
         </View>

      </View>   
         <View style={styles.listings}>
             <Title>My Listings</Title>

             <View>
             {
              loading ? <ActivityIndicator size="large" color='grey' style={{justifyContent:'center',alignItems:'center',flex:1 }} /> 
              :
              user && user?.listing?.length < 1
              ?
              <Text>Empty listing </Text>
              : 
              <FlatList
              data={user?.listing}
              renderItem={renderItem}
              keyExtractor={(item) => item?.id?.toString()}
            />
            }
             </View>
         </View>
      </View>   

    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  con:{
    padding:10,
  },
  profile:{
    backgroundColor:'#fff',
    // borderBottomLeftRadius:50,
    // borderBottomRightRadius:50
  },
  listings:{
    // borderTopRightRadius:25,
    // borderTopLeftRadius:25,
    backgroundColor:'#fff',
    paddingVertical:15,
    paddingHorizontal:10,
    marginTop:5,
  },
  proTop:{
    flexDirection:"row",
    justifyContent:'space-between',
    padding:10
  },
  avatar:{
    // justifyContent:'center',
    alignItems:'center'
  },
  details:{
    paddingVertical:20
    
  }

})
