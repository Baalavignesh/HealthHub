import axios from "axios";
import ENDPOINT from "../constants/api_endpoint";

interface DoctorInfo {
  name: string;
  email: string;
  password: string;
  location: string;
  contactNumber: string;
  specialization: string;
  hospitalName: string;
}

interface UserInfo {
    name: string;
    email: string;
    password: string;
    location: string;
    contact_number: string;
    age: number;
    gender: string;
  }
  

const RegisterDoctor =  (doctorInfo: DoctorInfo) => {
    console.log('Register Doctor function called')
    return axios
      .post(
        `${ENDPOINT}/doctors`,
        doctorInfo
      );
  };


  const RegisterUser = (userInfo: UserInfo) => {
    console.log('Register User function called')
    return axios
      .post(
        `${ENDPOINT}/users`,
        userInfo
      )
      
  };

export { RegisterDoctor, RegisterUser };
