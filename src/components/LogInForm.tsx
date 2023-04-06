import { useState } from "react";
import AuthService from "~/services/AuthService";

const useForm = (initialValue: { [key: string]: any }) => {
  const [formValues, setFormValues] = useState(initialValue);

  console.log(formValues);
  return [
    formValues,
    (event: any) =>
      setFormValues({
        ...formValues,
        [event.currentTarget.name]: event.currentTarget.value,
      }),
  ] as const;
};

export const LogInForm = () => {
  const initialValue = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useForm(initialValue);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex h-screen flex-col items-center justify-center bg-gray-500">
      <div className="w-6/12 rounded-xl bg-white p-5 text-center text-black">
        <h1 className="mb-3 text-3xl font-bold">Login</h1>

        <form >
          <div className="mb-3 flex flex-col items-start">
            {errorMessage && <h1>{`Error: ${errorMessage}`}</h1>}


            <label className="text-md mb-1 font-semibold">Email:</label>
            <input
              className="focus:border-1 mb-2 w-full rounded-lg border border-gray-200 p-1 focus:mb-2 focus:rounded-lg focus:border-transparent focus:bg-gray-200 focus:outline-none"
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={setFormValues}
            />
          </div>

          <div className="mb-3 flex flex-col items-start">
            <label className="text-md mb-1 font-semibold">Password:</label>
            <input
              className="focus:border-1 mb-2 w-full rounded-lg border border-gray-200 p-1 focus:mb-2 focus:rounded-lg focus:border-transparent focus:bg-gray-200 focus:outline-none"
              name="password"
              type="password"
              placeholder="Password"
              onChange={setFormValues}
            />
          </div>

          <button
            className="text mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-stone-300 hover:bg-blue-500"
            type="button"
            onClick={async event => {
              // try {
              //   await AuthService.logIn(formValues.username, formValues.password);
              //   alert("Logged in.")
              // } catch (error) {
              //   alert("Failed to log in.")
              //   setErrorMessage((error as Record<"message", string>).message)
              // }

              const isError = await AuthService.logIn(formValues.username, formValues.password);

              if (isError) {
                alert("Failed to log in.")
              }

              alert("Logged in.")
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
