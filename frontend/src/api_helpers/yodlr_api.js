// ----- [///// DEPENDENCIES /////] -----
import axios from "axios";

// ----- [///// CLASS /////] -----
class YodlrApi {
    static token;
    static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

    static async login(email, password) {
        try {
            let res = await axios.post(`${YodlrApi.BASE_URL}/auth/login`, { email, password });
            return res.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async register(registerData) {
        try {
            let res = await axios.post(`${YodlrApi.BASE_URL}/auth/register`, registerData);
            return res.data;
        } catch (err) {
            return err;
        }
    }

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${YodlrApi.BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${YodlrApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getUser(id) {
        let user = await this.request(`users/${id}`);
        return user;
    }

    static async getAllUsers() {
        let users = await this.request(`users/`);
        return users;
    }

    static async updateUser(id, updateData) {
        let res = await axios({
            method: 'patch',
            url: `${YodlrApi.BASE_URL}/users/${id}`,
            data: updateData,
            headers: { Authorization: `Bearer ${YodlrApi.token}` }
        });
        return res.data;
    }
}


// ----- [///// EXPORTS /////] -----
export default YodlrApi;