import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';




export type AuthenticationType={
    Onboarding:undefined;
    SignInScreen:undefined;
    SignUpScreen:undefined;
  }

export type OnboardingScreenRoute=RouteProp<AuthenticationType,'Onboarding'>

export type OnboardingScreenNavigation=StackNavigationProp<AuthenticationType,'Onboarding'>
  
 
export type OnboardingProps={
       route:OnboardingScreenRoute;
       navigation:OnboardingScreenNavigation
}  


export type TapType={
    Home:undefined;
    Create:undefined;
    Listing:undefined;
    Requests:undefined;
    Profile:undefined;
  }
  
 
export type TapProps={
       route:OnboardingScreenRoute;
       navigation:OnboardingScreenNavigation
}

export type AuthType={
  Home:undefined;
  ListDetailsScreen:{id:string};
  CreateListing:undefined;
  CreateRequest:undefined;
  UploadImage:undefined;
  SettingScreen:undefined;
  ImageBrowser:undefined;
  EditAccount:undefined;
}

export type CreateListingScreenNavigation=StackNavigationProp<AuthType,'CreateListing'>
export type HomeNavigation=StackNavigationProp<AuthType,'Home'>
export type ListingNavigation=StackNavigationProp<TapType,'Listing'>
export type RequestNavigation=StackNavigationProp<TapType,'Requests'>

export type ListingDetailRoute=RouteProp<AuthType,'ListDetailsScreen'>


