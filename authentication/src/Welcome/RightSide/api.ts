
import {config} from "../../../config/config"
export type Cred = {
      password: string;
      email: string;
  };
const makeRequset = async(props: Cred, url: string) => {
     return await fetch(`${config.server.url}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json", 
      },
      credentials:"include",
      body: JSON.stringify(props),
    });

};

export const registerUser = async (props: Cred) => {
  try{
    const response = await makeRequset(props, "registration")
      if (response.ok && response.redirected) {
        console.log(`Redirect to ${response.redirected}`);
        window.location.href = response.url;
      }
    }catch(error){
      console.log(`Error, when register user: ${error}`);
      return
    };
};

  export const checkCred = async (props: Cred) => {
    try{
    const response = await makeRequset(props, "login")
      if (response.ok) {
          console.log(`Redirect to ${response.redirected}`);
          window.location.href = window.location.origin + "/app/";
        }
      }catch(error){
        console.log(`Error, when login user: ${error}`);
        return 
      }
  }

