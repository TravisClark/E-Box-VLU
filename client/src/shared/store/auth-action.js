import { authActions } from "./auth-slice";


const API_KEY = "http://localhost:5000/user/api/login";

export const loginRequest = (authData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
        const request = await fetch(API_KEY,{
            method: 'POST',
            body: JSON.stringify({username: authData.username, password: authData.password}),
            headers: {'Content-Type': 'application/json'}
          })
          const responseData = await request.json();
        if(!request.ok){
            throw new Error(responseData.err)
        }
        await dispatch(authActions.loginHandler(authData))
    };
    try{
      await sendRequest()
    }
    catch(err){
      alert(err)
    }
  };
};
