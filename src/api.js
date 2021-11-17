import axios from "axios";

const request = axios.create({
  baseURL: "https://self-order-kiosk7.herokuapp.com",
});

export default request;
