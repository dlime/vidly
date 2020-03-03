import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

httpService.setJsonWebToken(getJsonWebToken());

export async function login(user) {
  const { data: jsonWebToken } = await httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password
  });
  localStorage.setItem(tokenKey, jsonWebToken);
}

export function loginWithJsonWebToken(jsonWebToken) {
  localStorage.setItem(tokenKey, jsonWebToken);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jsonWebToken = localStorage.getItem(tokenKey);
    return jsonWebToken ? jwtDecode(jsonWebToken) : null;
  } catch (error) {
    return null;
  }
}

export function getJsonWebToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJsonWebToken,
  getJsonWebToken
};
