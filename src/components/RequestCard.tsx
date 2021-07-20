import * as React from 'react';
import { View, StyleSheet,Animated,Text, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';


const { width,height } = Dimensions.get('window')

interface RequestCard {
    request:Object;
    from:string
}

const RequestCard=({request,navigation,from}:RequestCard)=>{
    
    // const imageUrl=request && `https://proptybox.com/uploads/listing/${request.images[0]}`
    
   return (
    <View style={[styles.cardCon,{width:from === 'request' ? width-20 : 300 }]} >
             <View style={styles.left}>
                <Avatar.Image size={100} source={require('../../assets/avatar.png')} />
             </View>
             <View style={styles.details}>
                 <Title>Christy Hellen</Title>
                 <Caption>24 yrs | female</Caption>
                 <Text>Budget #5000-6000</Text>
             </View>
   </View>
   )
}

const styles=StyleSheet.create({
    cardCon:{
        height:150,
        backgroundColor:'#fff',
        margin:10,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
          shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1 
        

    },
    left:{
        paddingHorizontal:10

    },
    details:{

    }
    
})


export default RequestCard;
