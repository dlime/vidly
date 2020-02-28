import httpService from "./httpService";

const apiEndpoint = "/users";

function toIdUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers() {
  return httpService.get(apiEndpoint);
}

export function getUser(id) {
  return httpService.get(toIdUrl(id));
}

export function deleteUser(id) {
  return httpService.delete(toIdUrl(id));
}

export function saveUser(user) {
  return httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
