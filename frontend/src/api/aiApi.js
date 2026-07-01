import axios from "axios";

const API = "http://localhost:8080/api/ai";

export const aiApi = {

    chat(message) {
        return axios.post(API + "/chat", message, {
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

};