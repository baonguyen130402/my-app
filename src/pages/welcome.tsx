import { type NextPage } from "next";
import { useRouter } from "next/router";
import AuthService from "~/services/AuthService";
import { useEffect } from "react";

const Welcome: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!AuthService.isAuthenticated) {
      router.push("/");
      console.log("User is not authenticated.");
    }
  }, []);

  return (
    <>
      <h1>Welcome to our site.</h1>
    </>
  );
};

export default Welcome;
