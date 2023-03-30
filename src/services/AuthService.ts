const initialState = !!(
  typeof window === "object" && localStorage.getItem("state")
)

let isAuthenticated = initialState;

const setIsAuthenticated = (newState: boolean) => isAuthenticated = newState;

export class AuthError extends Error {
  constructor(action: "LOG_IN" | "LOG_OUT", error: any) {
    if (typeof error === "string") {
      super(error)
    } else super("Failed to log in.")
  }
}

/**
 * Send a post request to the server.
 * 
 * If the request succeeded, log the user in.
 * If failed, show error indicate what went wrong.
 */
const logIn = async (username: string, password: string): Promise<void> => {
  try {
    // POST credentials to the server
    // const requestLogInResponse = await fetch("/api/auth", {
    //   method: "POST",
    //   // Request body must be serialisable.
    //   body: JSON.stringify({ username, password })
    // })

    setIsAuthenticated(true);
    localStorage.setItem("state", "true");
  } catch (error) {
    throw new AuthError("LOG_IN", error)
  }
};

const logOut = () => {
  setIsAuthenticated(false);
  localStorage.removeItem("state");
};

const AuthService = {
  logIn,
  logOut
}

export default AuthService
