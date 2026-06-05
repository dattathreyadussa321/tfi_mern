const USERNAME = "admin";
const PASSWORD = "admin123";

export function checkLogin(username, password) {
  return username === USERNAME && password === PASSWORD;
}

export function saveLogin() {
  localStorage.setItem("isLoggedIn", "true");
}

export function removeLogin() {
  localStorage.removeItem("isLoggedIn");
}

export function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}
