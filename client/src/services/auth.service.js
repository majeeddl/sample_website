import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/auth/";

class AuthService {
  async login(username, password) {
    const res = await axios.post(API_URL + "login", {
      username,
      password,
    });

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
