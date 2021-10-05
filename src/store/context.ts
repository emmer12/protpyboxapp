import React from 'react'
import { UserType } from '../Authentication/type'


interface ContextInterface{
    user:UserType,
    authContext:{
        signUp:(arg:string)=>void,
        signIn:(arg:string)=>void,
        signOut:()=>void,
    }
}

const AuthContext=React.createContext<ContextInterface>({undefined})
export default AuthContext