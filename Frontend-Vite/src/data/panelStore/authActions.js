import { getPanelStore, savePanelStore } from "./storeCore.js";

export function isUserLoggedIn() {
  const state = getPanelStore();
  return Boolean(state.auth && state.auth.isLoggedIn);
}

export function loginUser({ phone, name } = {}) {
  const state = getPanelStore();
  const updatedAuth = {
    isLoggedIn: true,
    token: "rokad_token_" + Date.now(),
    userPhone: phone || state.auth?.userPhone || "09123456789",
  };
  const updatedUser = {
    ...state.user,
    ...(name ? { fullName: name, firstName: name.split(" ")[0] } : {}),
  };
  const updatedState = { ...state, auth: updatedAuth, user: updatedUser };
  savePanelStore(updatedState);
  return updatedState;
}

export function logoutUser() {
  const state = getPanelStore();
  const updatedAuth = {
    isLoggedIn: false,
    token: null,
    userPhone: null,
  };
  const updatedState = { ...state, auth: updatedAuth };
  savePanelStore(updatedState);
  return updatedState;
}

export function updateProfile(userData) {
  const state = getPanelStore();
  const updatedUser = {
    ...state.user,
    ...userData,
  };
  const updatedState = { ...state, user: updatedUser };
  savePanelStore(updatedState);
  return updatedUser;
}
