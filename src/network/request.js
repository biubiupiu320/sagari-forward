import axios from "axios";

let sessionId = localStorage.getItem("xxl-sso-session-id");

export function request(config) {
    const instance = axios.create({
        baseURL: "http://data.sagari.cn",
        timeout: 60000,
        headers: {"xxl-sso-session-id": sessionId}
    });
    return instance(config);
}
