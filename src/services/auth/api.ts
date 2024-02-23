import axios from "axios";

const api = axios.create({
  baseURL: "https://fonidaiane.pythonanywhere.com/easyBankImobiliario/",
});

export default api;