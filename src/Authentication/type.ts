import { string } from "yup/lib/locale"

export type ListingType={
    id:number;
    about_property:string;
    images:any;
    space_type:string;
    space_address:string;
    views:[];
    rent:number;
    available_from:string;
    space_for:string;
    bedroom_type:string;
    property_type:string;
    about_cohabitation:string;
    payer_gender:string;
    selectedTags?:[any] ;
    space_location:string;
    duration:string,
    user:UserType

}

export type RequestType={
    space_for:string;
    min_budget:number;
    max_budget:number;
    space_location:string;
    space_type:string;
    about_property:string;
    about_cohabitation:string;
    user:UserType
}

export type UserType={
    id :string;
    location :string;
    fullname :string;
    phoneNo :string;
    email :string;
    gender :string;
    bio :string;
    age :string;
    profile_pic_url :string;
    profile_pic_filename :string;
    listing :[
        ListingType
    ];
    request :[
        RequestType
    ];
    created_at :string;
    email_verified_at :string;
    phone_verified_at :string;
    id_verified_at:string;
    updated_at :string;
    verified:boolean;
    notifications:[];
    reveal_contact:boolean;
    isAdmin:boolean
}

