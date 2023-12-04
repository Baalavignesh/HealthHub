import axios from "axios";
import ENDPOINT from "../constants/api_endpoint";

// interface AppointmentResponse {
//   appointment_id: number;
//   user_id: number;
//   doctor_id: number;
//   appointment_date: Date;
//   appointment_time: EpochTimeStamp;
//   location: string;
//   symptoms: string;
//   result: string;
// }

interface AppointmentInfo {
    user_id:number;
    appointment_date: Date;
    appointment_time: EpochTimeStamp;
    location:string;
    symptoms: string;
  }

const GetAppointments = (user: any, type: string) => {
    console.log("get appointment function")
  let getAppointmentEndpoint = "";
  if (type == "Doctor") {
    getAppointmentEndpoint = `${ENDPOINT}/appointments?doctor_id=${user.doctor_id}`;
  } else {
    getAppointmentEndpoint = `${ENDPOINT}/appointments?user_id=${user.user_id}`;
  }

  console.log(getAppointmentEndpoint)

  return axios.get(getAppointmentEndpoint);
};

const ScheduleAppointment = (Appointment: AppointmentInfo) => {
  return axios.post(`${ENDPOINT}/appointments/book`, Appointment)
};

export { GetAppointments, ScheduleAppointment };
