const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case "USER_LOGIN_FULFILLED":
      return {
        loading:false,
        token: action.payload.token,
        user: action.payload.user,
      };
      break;
      break;
    case "LOADING":
      return {
        ...state,
        isLoading:action.payload
      };

      break;
    case "SIGN_IN":
      return {
        token: action.payload.token,
        user:action.payload.user,
      };
      break;
    case "SIGN_OUT":
      return {
        token: null,
        isLoading: false,
        user:null
      };
    default:
      break;
  }
};

export default AuthReducer;
