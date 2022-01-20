import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjkyOTU2MTM4Y2E4MDAyZGRiNWY4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjY0NTM4OCwiZXhwIjoxNjQyOTA0NTg4fQ.v0EPY31rxwG4Dfsd-h747CyO4sZ72i2FfnYiKQ79Uqc";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
