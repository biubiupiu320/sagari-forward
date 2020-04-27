import axios from "axios";

let sessionId = localStorage.getItem("xxl-sso-session-id");

export function request(config) {
    const instance = axios.create({
        baseURL: "http://39.96.47.184",
        timeout: 60000,
        headers: {"xxl-sso-session-id": sessionId}
    });
    return instance(config);
}
