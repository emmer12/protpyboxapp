import * as React from 'react';
import { View, StyleSheet,Animated,Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseURL } from '../api';


interface ProptyBox {
    list:{
        id:number;
        images:any;
        space_type:string;
        space_address:string;
        views:[];
        rent:number;
    };
    navigation:any
}
const ProptyBox=({list,navigation}:ProptyBox)=>{
    
    const LeftContent = (props:any)=> <Avatar.Icon {...props} icon="folder" />
    const imageUrl=list && list.images && `${baseURL}/uploads/listing/${list.images[0]?.filename}` 
    console.log(list.images[0]?.filename)
   return (
    <View style={styles.cardCon}>
       <Card style={{backgroundColor:'#fff'}} >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
            <View style={styles.top}>
                <Button>Boosted {list.id}</Button>
                <MaterialCommunityIcons name="dots-vertical" size={26} />
            </View>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate('ListDetailsScreen',{id:list.id,type:list.space_type}) }} >
              <Card.Cover source={list.images ? { uri:imageUrl } : require('../../assets/meduim-product-placeholder.png') } />
            </TouchableWithoutFeedback>
            <Card.Content>
            <Title>{list.space_type }</Title>

            <Title style={{color:'#555'}}>{ list.space_address }</Title>
            <Paragraph>Card content Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, ex repellendus nisi iste dolorem deserunt beatae! Error ratione accusantium provident!</Paragraph>
            </Card.Content>
            <View style={styles.top}>
                <Button><MaterialCommunityIcons name='decagram' size={26} /></Button>
                 <View style={styles.views}>
                   <Title style={{marginHorizontal:10,fontSize:16}}>&#8358;{list.rent }</Title>
                   <MaterialCommunityIcons name='eye' color="#aaa" size={20} />
                   <Text style={styles.vcount}>{ list.views.length }</Text>
                 </View>
            </View>
        </Card>
   </View>
   )
}

const styles=StyleSheet.create({
    cardCon:{
        margin:10,
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5
    },
    views:{
        flexDirection:'row',
        alignItems:'center' 
    },
    vcount:{
        color:'#aaa',
        marginLeft:5
    }
})


export default ProptyBox;
