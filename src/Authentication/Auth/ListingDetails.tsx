import React,{useState,useEffect} from 'react';
import { View, StyleSheet,Dimensions,FlatList, SafeAreaView,TouchableOpacity,StatusBar, ActivityIndicator,Image,ScrollView } from 'react-native';
import gstyle from "./../../style"
import { Avatar, Button,Text, Title, Paragraph } from 'react-native-paper';
import { ProptyBox } from './../../components'
import Api, { baseURL } from '../../api';
import { Chat } from "../../icons/"


 const { width, height } = Dimensions.get('window')



export default function ListDetails({route}) {


  const [list, setList] = React.useState([]); 
  const [loading, setLoading] = React.useState(false); 

  useEffect(() => {
      getList()
  }, [])


  const getList=()=>{
    setLoading(true)
    Api.get('get-list-by-id/'+route.params.id).then(res=>{
    setLoading(false)
      setList(res.data.data)
    })

  }



  const renderItem = ({ item }) => {
    const imageUrl=`${baseURL}/uploads/listing/${item.filename}`
    return (<Image
      style={{ width, height: height * 0.3 }}
      source={{uri:imageUrl} }
    />   
  )}

  return (
    <ScrollView>
     <SafeAreaView style={styles.container}>
        <View>
        <FlatList
        data={list.images}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal={true}
        snapToInterval={width}
        decelerationRate={0}
        bounces={false}
        pagingEnabled={true}
        
        
      />
        </View>
     
      <View style={styles.con}>
           <View style={gstyle.details}>
                 <View style={gstyle.left}>
                    <Title> {list.space_type}</Title>
                    <Paragraph> {list.space_address}</Paragraph>
                 </View>

                 <View style={gstyle.right}>
                   <Button mode="outlined">&#8358;{list.rent}</Button>
                   <Chat style={{marginHorizontal:10}} />
                 </View>             
                 
             </View>

               <View style={[gstyle.row,gstyle.rowTint]}>
                     <View style={gstyle.p50}>
                       <Text>Rent</Text>
                      </View>
                     <View>
                       <Text>&#8358;{list.rent} per {list.duration}</Text>
                     </View>
                 </View>

                 <View style={gstyle.row}>
                     <View style={gstyle.p50}>
                       <Text>Property type</Text>
                      </View>
                     <View>
                       <Text>{list.property_type}</Text>
                     </View>
                 </View>

                 <View style={[gstyle.row,gstyle.rowTint]}>
                     <View style={gstyle.p50}>
                       <Text>Space location</Text>
                      </View>
                     <View>
                       <Text>{ list.space_location }</Text>
                     </View>
                 </View>


                 <View style={gstyle.row}>
                     <View style={gstyle.p50}>
                       <Text>Bathroom type</Text>
                      </View>
                     <View>
                       <Text>{ list.bedroom_type}</Text>
                     </View>
                 </View>


                 <View style={[gstyle.row,gstyle.rowTint]}>
                     <View style={gstyle.p50}>
                       <Text>Available from</Text>
                     </View>
                     <View>
                       <Text>{list.available_from }</Text>
                     </View>
                 </View>

                 <View style={[gstyle.row]}>
                     <View style={gstyle.p50}>
                       <Text>Preferred Gender</Text>
                     </View>
                     <View>
                       <Text>{list.payer_gender }</Text>
                     </View>
                 </View>

                 <View style={[gstyle.row,gstyle.rowTint]}>
                     <View style={gstyle.p50}>
                       <Text>About space</Text>
                     </View>
                     <View style={gstyle.p50}>
                       <Text>{list.about_property }</Text>
                     </View>
                 </View>






                 
      </View>
      </SafeAreaView>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  con:{
    padding:10,
    backgroundColor:'#fff'
  }

})