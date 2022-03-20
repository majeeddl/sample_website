import axios from "axios";
import { getToken } from "../store/actions/auth.action";

const API_URL = "http://localhost:3001/api/v1/account";

class AccountService {
  async getUser() {
    const token = getToken() + 1;

    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return null
    }
  }
}

export default new AccountService();
