import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { List, Title, Button } from "react-native-paper";
import Api, { baseURL } from "../../api";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
export default class MainScreen extends Component {
  constructor(props: AnimationPlayState) {
    super(props);
    this.state = {
      photos: [],
      fromServer: false,
      id: null,
      loading: false,
    };
  }

  componentDidUpdate() {
    const { params } = this.props.route;
    if (params) {
      const { photos } = params;
      if (photos) this.setState({ photos, fromServer: false });
      delete params.photos;
    }
  }

  componentDidMount() {
    const {
      route: {
        params: { id, slug },
      },
    } = this.props;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    this.setState({ id,slug });

    Api.get("get-list-by-slug/" + slug)
      .then((res) => {
        let images = res.data.data.images;
        this.setState({ photos: images, fromServer: true });
      })
      .catch((err) => {
        alert("Opps,server error");
      });
    backHandler.remove();
  }

  uploadFiles = () => {
    const { navigate } = this.props.navigation;

    const formData = new FormData();
    this.setState({ ...this.state, loading: true });
    this.state.photos.forEach((photo) => {
      formData.append("file[]", photo);
    });
    formData.append("id", this.state.id);

    Api.post("/listing-file-upload", formData)
      .then((res) => {
        this.setState({ ...this.state, loading: false });
        alert("File uploaded");
        navigate("EditListing", { id: this.state.slug});
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
        alert("Opps Network error");
      });
  };

  renderImage(item, i) {
    const IMAGE_SIZE = width / 4 - 10;

    const uri = this.state.fromServer
      ? `${baseURL}/uploads/listing/${item.filename}`
      : item.uri;
    return (
      <View
        key={i}
        style={[styles.image, { height: IMAGE_SIZE, width: IMAGE_SIZE }]}
      >
        <Image
          resizeMode="cover"
          source={{ uri }}
          style={{ height: IMAGE_SIZE - 10, width: IMAGE_SIZE - 10 }}
        />
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.state.photos.length  > 0 ? (
          <TouchableOpacity
            style={styles.openBtn}
            onPress={() => {
              navigate("ImageBrowser");
            }}
          >
            <Text>Add Preview Image { this.state.slug }</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigate("ImageBrowser");
            }}
          >
            <View style={styles.openBtnCenter}>
              <Ionicons name="md-image-sharp" size={100} color="grey" />
              <Text style={{textTransform:'uppercase',fontWeight:'700'}}>Add Preview Image</Text>
            </View>
          </TouchableOpacity>
        )}

        <ScrollView>
          <View style={styles.container}>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </View>
        </ScrollView>

        <View style={{ margin: 20 }}>
          <Button
            disabled={loading}
            loading={loading}
            onPress={() => this.uploadFiles()}
            mode="contained"
          >
            Upload
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  image: {
    elevation: 4,
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
  },
  openBtn: {
    margin: 10,
    backgroundColor: "#5895F9",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },

  openBtnCenter: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
