
 const AuthReducer=(state, action)=> {
    switch (action.type) {
        case "FETCH_TOKEN":
            return {
                ...state,
                token: action.token,
                isLoading: false,
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