import { authActions } from "./auth-slice";

const API_KEY = "";

export const loginRequest = (authData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
        const request = await fetch(API_KEY,{
            method: 'POST',
            body: JSON.stringify({username: authData.username, password: authData.password}),
            headers: {'Content-Type': 'application/json'}
        })
        if(!request.ok){
            
        }
    };
    try {
        await sendRequest();
        await dispatch(authActions.loginHandler(authData))
        console.log('Authenticate successfully!')
    } catch (error) {
        alert(error)
    }
  };
};
