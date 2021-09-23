import axios from "axios";

export const api = axios.create({
  baseURL: 'https://computerdata-api.herokuapp.com/ComputerData',
  timeout: 4000
})