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

export type TapScreenRoute=RouteProp<TapType,'Create'>

 
export type TapProps={
       route:OnboardingScreenRoute;
       navigation:OnboardingScreenNavigation
}

export type AuthType={
  Home:undefined;
  ListDetailsScreen:{type:string};
  CreateListing:undefined;
  CreateRequest:undefined;
  UploadImage:undefined
}
