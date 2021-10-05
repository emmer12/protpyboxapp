import * as React from "react";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Onboarding } from "../Authentication/Guest";
import {
  EditAccountScreen,
  EditListingScreen,
  EditProfileScreen,
  UpdateListScreen,
  UpdateRequestScreen,
  ImageBrowser,
  CreateScreen,
  ProfileScreen,
  SignInScreen,
  OtpVerifyScreen,
  AboutScreen,
  BoostScreen,
  HomeScreen,
  CreateListingScreen,
  CreateRequestScreen,
  ImageUploadScreen,
  ListDetailsScreen,
  RequestDetailsScreen,
  ListingScreen,
  PrivateScreen,
  RequestScreen,
  SettingScreen,
  SignUpScreen,
  SearchScreen,
} from "../screens";
import { Button, Title } from "react-native-paper";
import { Home, List, Request, Account, Add } from "../icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Logo, RightMenu } from "../components";

import { AuthenticationType, TapType, AuthType } from "./type";
import { DrawerContent } from "../Authentication/Auth/DrawerContent";
import { TouchableOpacity } from "react-native";

const AuthenticationStack = createStackNavigator<AuthenticationType>();
const AuthStack = createStackNavigator<AuthType>();
const Tab = createMaterialBottomTabNavigator<TapType>();
const Drawer = createDrawerNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        options={{
          headerShown: false,
        }}
        name="Onboarding"
        component={Onboarding}
      />
      <AuthenticationStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthenticationStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="OtpVerifyScreen"
        component={OtpVerifyScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="GuestListing"
        component={ListingScreen}
        options={({navigation})=>({
          headerShown: true,
          headerTitle: (props) =>null,
          headerRight: (props) => (<TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}><Button>Join</Button></TouchableOpacity>),

        })}
      />

      <AuthenticationStack.Screen
        name="GuestRequest"
        component={RequestScreen}
        options={({navigation})=>({
          headerShown: true,
          headerTitle: (props) =>null,
          headerRight: (props) => (<TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}><Button>Join</Button></TouchableOpacity>),

        })}
      />

      <AuthenticationStack.Screen
        name="GuestListingDetails"
        component={ListDetailsScreen}
        options={({route,navigation})=>({
          headerShown: true,
          headerTitle: (props) => <Title>{cap(route.params.type)}</Title>,
          headerRight: (props) => (<TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}><Button>Join</Button></TouchableOpacity>),

        })}
      />

    <AuthenticationStack.Screen
        name="GuestRequestDetails"
        component={RequestDetailsScreen}
        options={({route,navigation})=>({
          headerShown: true,
          headerTitle: (props) => <Title>{cap(route.params.title)}</Title>,
          headerRight: (props) => (<TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}><Button>Join</Button></TouchableOpacity>),

        })}
      />
    </AuthenticationStack.Navigator>
  );
};

const HomeTabNavigator = () => {
  let [open, setOpen] = React.useState(false);

  // <Tab.Screen options={{tabBarColor: '',tabBarLabel:'Create',
  // tabBarIcon: ({ color }) => (
  //   <Create color={color}  open={open} />
  // )}} name="Create" component={CreateScreen}
  //   listeners={{
  //     tabPress:e=>{
  //       e.preventDefault()
  //       setOpen(!open)
  //     }
  //   }}
  // />

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5895F9"
      inactiveColor="#444"
      barStyle={{ backgroundColor: "#fff" }}
      screenOptions={({ route }) => ({})}
    >
      <Tab.Screen
        options={{
          tabBarColor: "",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarColor: "",
          tabBarLabel: "Listing",
          tabBarIcon: ({ color }) => <List color={color} />,
        }}
        name="Listing"
        component={ListingScreen}
      />

      <Tab.Screen
        options={{
          tabBarColor: "",
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => <Add color={color} />,
        }}
        name="Create"
        component={CreateScreen}
      />

      <Tab.Screen
        options={{
          tabBarColor: "",
          tabBarLabel: "Requests",
          tabBarIcon: ({ color }) => <Request color={color} />,
        }}
        name="Requests"
        component={RequestScreen}
      />

      <Tab.Screen
        options={{
          tabBarColor: "",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Account color={color} />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const cap = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const config = {
  animation: "spring",
  config: {
    stiffness: 500,
    damping: 50,
    mass: 3,
    overshootingClamping: false,
    resetDisplacementThreshold: 0.01,
    resetSpeedThreshold: 0.01,
  },
};

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: { open: config, close: config },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthStack.Screen
        name="HomeScreen"
        component={HomeTabNavigator}
        options={{
          headerTitle: (props) => <Logo />,
          headerRight: (props) => <RightMenu />,
          headerStatusBarHeight: 0,
        }}
      />

      <AuthStack.Screen
        name="ListDetailsScreen"
        component={ListDetailsScreen}
        options={({ route }) => ({
          headerTitle: (props) => <Title>{cap(route.params.type)}</Title>,
        })}
      />

      <AuthStack.Screen
        name="RequestDetailsScreen"
        component={RequestDetailsScreen}
        options={({ route }) => ({
          headerTitle: (props) => <Title>{cap(route.params.title)}</Title>,
        })}
      />

      <AuthStack.Screen
        name="UploadImage"
        component={ImageUploadScreen}
        options={({ route }) => ({
          headerTitle: (props) => <Title>Upload Images</Title>,
        })}
      />

      <AuthStack.Screen
        name="CreateListing"
        component={CreateListingScreen}
        options={({ route }) => ({
          headerTitle: (props) => <Title>Create Listing</Title>,
        })}
      />

      <AuthStack.Screen
        name="EditListing"
        component={EditListingScreen}
        options={({ route }) => ({
          headerTitle: (props) => <Title>Edit Listing</Title>,
        })}
      />

      <AuthStack.Screen
        name="ImageBrowser"
        component={ImageBrowser}
        options={{ title: "Selected 0 files" }}
      />

      <AuthStack.Screen
        name="CreateRequest"
        component={CreateRequestScreen}
        options={({ route }) => ({
          headerTitle: (props) => <Title>Create Request</Title>,
        })}
      />
      <AuthStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />

      <AuthStack.Screen
        name="EditAccount"
        component={EditAccountScreen}
        options={() => ({
          headerTitle: () => <Title>Account Settings</Title>,
        })}
      />

      <AuthStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={() => ({
          headerTitle: () => <Title>Profile Settings</Title>,
        })}
      />

      <AuthStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerRight: (props) => <RightMenu />,
          headerTitle: (props) => <Title>Settings</Title>,
        }}
      />

      <AuthStack.Screen
        name="Boost"
        component={BoostScreen}
        options={{
          headerRight: (props) => <RightMenu />,
          headerTitle: (props) => <Title>Boost Post</Title>,
        }}
      />
    </AuthStack.Navigator>
  );
};

export const DrawerAuth = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="AuthNavigator"
    >
      <Drawer.Screen name="Home" component={AuthNavigator} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Private" component={PrivateScreen} />
    </Drawer.Navigator>
  );
};
