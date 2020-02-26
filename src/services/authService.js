import httpService from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";

function set(jsonWebToken) {
  localStorage.setItem("token", jsonWebToken);
  httpService.setJsonWebToken(jsonWebToken);
}

export async function login(user) {
  const { data: jsonWebToken } = await httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password
  });
  set(jsonWebToken);
}

export function loginWithJsonWebToken(jsonWebToken) {
  set(jsonWebToken);
}

export function logout() {
  localStorage.removeItem("token");
  httpService.setJsonWebToken(null);
}

export function getCurrentUser() {
  try {
    const jsonWebToken = localStorage.getItem("token");
    return jsonWebToken ? jwtDecode(jsonWebToken) : null;
  } catch (error) {
    return null;
  }
}

export function getJsonWebToken() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJsonWebToken,
  getJsonWebToken
};
