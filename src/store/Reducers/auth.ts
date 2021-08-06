
 const AuthReducer=(state:any, action:any)=> {
    switch (action.type) {
        case "FETCH_TOKEN":
            return {
                ...state,
                token: action.token,
                isLoading: false,
            }
            break;
            case "FETCH_USER":
                return {
                    ...state,
                    user: action.user,
                }
                break;
            
        case "SIGN_IN":
            return {
                ...state,
                token: action.token,
                isSignout: false,
            }
          break;
          case "SIGN_OUT":
          return {
              ...state,
              token: null,
              isSignout: true,
          }
        default:
            break;
    }
}

    
export default AuthReducer