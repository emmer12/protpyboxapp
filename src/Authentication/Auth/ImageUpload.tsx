import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView,StyleSheet,Dimensions } from 'react-native';
import { List, Title } from 'react-native-paper';
import Api, { baseURL } from '../../api';



const {width,height}=Dimensions.get('window')
export default class MainScreen extends Component {
  constructor (props:AnimationPlayState) {
    super(props)
    this.state = {
      photos: [],
      fromServer:false
    }
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if (params) {
      const {photos} = params;
      if (photos) this.setState({photos,fromServer:false});
      delete params.photos;
    }
  }

  componentDidMount(){
    const { route:{params:{id}} } = this.props;
    Api.get('get-list-by-id/'+id).then(res=>{
      let images=res.data.data.images;
      this.setState({photos:images,fromServer:true});
      }).catch(err=>{
        console.log('err occured')
      })
  }
  
  uploadFiles=()=>{
    const { navigate } = this.props.navigation;
    const { route:{params:{id}} } = this.props;

    const formData=new FormData();
    
    this.state.photos.forEach(photo => {
      formData.append('file[]',photo);
    });
    formData.append('id',id);

    Api.post('/listing-file-upload',formData).then((res)=>{
      console.log(res.data)
      alert('File uploaded')
     navigate('EditListing',{id})
    }).catch((err)=>{
      console.log(err.response)
    })
  }

  
  renderImage (item, i) {  
      
    const IMAGE_SIZE=width/4-10

    const uri=this.state.fromServer ? `${baseURL}/uploads/listing/${item.filename}` : item.uri
    return (
      <View  key={i} style={[styles.image,{ height:IMAGE_SIZE,width:IMAGE_SIZE }]}>
      <Image
        resizeMode="cover"
        source={{ uri }}
        style={{ height:IMAGE_SIZE-10,width:IMAGE_SIZE-10 }}
      />
      </View>
    )
  }


  
 
  render() {
    
    
    const { navigate } = this.props.navigation;
    const { route:{params:{id}} } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Open image browser"
          onPress={() => { navigate('ImageBrowser'); }}
        />
        <ScrollView>
             <View style={styles.container}>
               {this.state.photos.map((item, i) => this.renderImage(item, i))}
             </View>
        </ScrollView>

  
        <Button
          title="Upload"
          onPress={() => this.uploadFiles()}
        />
      </View>
    );
  }
}



const styles=StyleSheet.create({
  container:{
    flexDirection:'row',
  },

  image:{
    elevation:4,
    backgroundColor:'#fff',
    padding:5,
    margin:5
  }
})