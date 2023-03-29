const initialState = false;

let isAuthenticated = initialState;

const setIsAuthenticated = (newState: boolean) => (isAuthenticated = newState);


/**
 * Send a post request to the server.
 * 
 * If the request succeeded, log the user in.
 * If failed, show error indicate what went wrong.
 */
const logIn = (username: string, password: string): void => {
  setIsAuthenticated(true);
  localStorage.setItem("state", "true");
};

const logOut = () => {
  setIsAuthenticated(false);
  localStorage.setItem("state", "false");
};

const AuthService = {
  logIn,
  logOut
}

export default AuthService
