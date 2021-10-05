import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';




export type AuthenticationType={
    Onboarding:undefined;
    SignInScreen:undefined;
    SignUpScreen:undefined;
    GuestListing:{guest:boolean};
    GuestListingDetails:{guest:boolean};
    GuestRequestDetails:{guest:boolean};
    GuestRequest:{guest:boolean};
    OtpVerifyScreen:{email:string};
    
  }

export type OtpVerifyRoute=RouteProp<AuthenticationType,'OtpVerifyScreen'>
export type OnboardingScreenNavigation=StackNavigationProp<AuthenticationType,'Onboarding'>
export type OtpVerifyScreenNavigation=StackNavigationProp<AuthenticationType,'OtpVerifyScreen'>
  


export type OnboardingProps={
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
       navigation:OnboardingScreenNavigation
}

// export type OnboardingScreenNavigation=StackNavigationProp<AuthenticationType,'Onboarding'>


export type AuthType={
  HomeScreen:undefined;
  ListDetailsScreen:{id:number,type:string,guest:boolean | undefined};
  RequestDetailsScreen:{id:number,title:string,guest:boolean | undefined};
  CreateListing:undefined;
  CreateRequest:undefined;
  UploadImage:undefined;
  SettingScreen:undefined;
  ImageBrowser:undefined;
  EditAccount:undefined;
  SearchScreen:undefined;
  EditProfile:undefined;
  EditListing:undefined;
  Boost:undefined;
}

export type CreateListingScreenNavigation=StackNavigationProp<AuthType,'CreateListing'>
export type HomeNavigation=StackNavigationProp<AuthType,'HomeScreen'>
export type ListingNavigation=StackNavigationProp<TapType,'Listing'>
export type RequestNavigation=StackNavigationProp<TapType,'Requests'>

export type ListingAuthNavigation=StackNavigationProp<AuthType,'ListDetailsScreen'>
export type ListingDetailRoute=RouteProp<AuthType,'ListDetailsScreen'>


