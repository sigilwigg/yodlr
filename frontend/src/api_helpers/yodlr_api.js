// ----- [///// DEPENDENCIES /////] -----
import axios from "axios";

// ----- [///// CLASS /////] -----
class YodlrApi {
    static token;
    static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

    static async login(loginData) {

    }

    static async register(registerData) {

    }

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${DiscipleApi.BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${DiscipleApi.token}` };
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

    }

    static async getAllUsers() {

    }

    static async updateUser(id, updateData) {

    }
}


// ----- [///// EXPORTS /////] -----
export default YodlrApi;