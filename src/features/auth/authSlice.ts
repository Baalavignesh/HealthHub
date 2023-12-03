import { createSlice } from "@reduxjs/toolkit";


interface DoctorInfo {
  doctor_id: number,
  name: string,
  email: string,
  password: string,
  specialization: string,
  contact_number: string,
  location: string,
  hospital_name: string 
}

interface UserInfo {
  user_id: number,
  name: string,
  email: string,
  password: string,
  location: string,
  contact_number: string,
  age: number,
  gender: string
}


interface AuthState {
  userInformation: DoctorInfo | UserInfo;
  userType: string;
}

const emptyTokens: AuthState = {
  userInformation: {} as DoctorInfo | UserInfo, // Initial value can be an empty object of either type
  userType: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: emptyTokens,
  reducers: {
    setTokens: (state, action) => {
      state.userInformation = action.payload.userInformation;
      state.userType = action.payload.userType
    }
  },
});

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;