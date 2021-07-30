import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView,StyleSheet,Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import Api from '../../api';



const {width,height}=Dimensions.get('window')
export default class MainScreen extends Component {
  constructor (props:AnimationPlayState) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if (params) {
      const {photos} = params;
      if (photos) this.setState({photos});
      delete params.photos;
    }
  }

  renderImage (item, i) {
    const IMAGE_SIZE=width/4-10
    return (
      <View  key={i} style={[styles.image,{ height:IMAGE_SIZE,width:IMAGE_SIZE }]}>
      <Image
        resizeMode="cover"
        source={{ uri: item.uri }}
        style={{ height:IMAGE_SIZE-10,width:IMAGE_SIZE-10 }}
      />
      </View>
    )
  }


  uploadFiles=()=>{
    const formData=new FormData();

    console.log(...this.state.photos,"yessss")

    
    this.state.photos.forEach(photo => {
      formData.append('files[]',photo);
    });

    Api.post('/listing-file-upload',formData).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err.response)
    })


  }

  render() {
    const { navigate } = this.props.navigation;
    const { route:{params:{list}} } = this.props;
    

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

        <View>
            <Title>
                 {list.id }
            </Title>
        </View>

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