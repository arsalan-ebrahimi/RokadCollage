import { DEFAULT_STATE, STORAGE_KEY } from "./initialState.js";

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const updatedState = JSON.parse(e.newValue);
        window.dispatchEvent(
          new CustomEvent("rokad_panel_store_changed", { detail: updatedState })
        );
      } catch (err) {
        console.error("Error syncing across tabs:", err);
      }
    }
  });
}

export function getPanelStore() {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let state = DEFAULT_STATE;
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
    } else {
      state = JSON.parse(raw);
    }
    const token = localStorage.getItem("rokad_token");
    if (token) {
      if (!state.auth) state.auth = {};
      state.auth.isLoggedIn = true;
      if (!state.auth.token) state.auth.token = token;
    }
    return state;
  } catch (err) {
    console.error("Error reading panelStore:", err);
    return DEFAULT_STATE;
  }
}

export function savePanelStore(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(
      new CustomEvent("rokad_panel_store_changed", { detail: state })
    );
  } catch (err) {
    console.error("Error saving panelStore:", err);
  }
}
