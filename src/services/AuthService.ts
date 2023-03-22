const initialState = false;

let isAuthenticated = initialState;

const setIsAuthenticated = (newState) => (isAuthenticated = newState);

export const logIn = () => {
  setIsAuthenticated(true);
  localStorage.setItem("state", "true");
};

export const logOut = () => {
  setIsAuthenticated(false);
  localStorage.setItem("state", "false");
};
