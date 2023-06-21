const initialState = !!(
  typeof window === "object" && localStorage.getItem("state")
);

let isAuthenticated = initialState;

const setIsAuthenticated = (newState: boolean) => (isAuthenticated = newState);

const postLogIn = async (username: string, password: string) => {
  if (username === "Birk" && password === "021304")
    return { message: "Logged in successfully." };
  else throw new Error("400");
};

/**
 * Send a post request to the server.
 *
 * If the request succeeded, log the user in.
 * If failed, show error indicate what went wrong.
 */
const logIn = async (
  username: string,
  password: string
): Promise<void | string> => {
  try {
    // POST credentials to the server
    // const requestLogInResponse = await fetch("/api/auth", {
    //   method: "POST",
    //   // Request body must be serialisable.
    //   body: JSON.stringify({ username, password })
    // })

    const responseLogInRequest = await postLogIn(username, password);

    setIsAuthenticated(true);
    localStorage.setItem("state", "true");
  } catch (error) {
    return handleAuthError(error as { message: string });
  }
};

const handleAuthError = <TError extends { message: string }>(error: TError) => {
  // Verify the shape of the error.
  const errorMessage = error.message;

  // Determine action(s) in accordance with the error.

  return errorMessage;
};

const logOut = () => {
  setIsAuthenticated(false);
  localStorage.removeItem("state");
};

const AuthService = {
  logIn,
  logOut,

  get isAuthenticated() {
    return isAuthenticated;
  },
};

export default AuthService;
