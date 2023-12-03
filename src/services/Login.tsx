import axios from "axios";
import ENDPOINT from "../constants/api_endpoint";

interface LoginCredentials {
    email: string;
    password: string;
    type: string;
  }
const LoginUser =  (userInfo: LoginCredentials) => {
    console.log('Login User')
    return axios
      .post(
        `${ENDPOINT}/login`,
        userInfo
      );
  };


  export default LoginUser;