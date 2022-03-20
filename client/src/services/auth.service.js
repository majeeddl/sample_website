import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/auth/";

class AuthService {
  async login(credentials) {
    const res = await axios.post(API_URL + "login", credentials);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export default new AuthService();
