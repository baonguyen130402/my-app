import { type NextPage } from "next";
import { useRouter } from "next/router";

const Welcome: NextPage = () => {
  const router = useRouter()

  // router.push("/")
  //
  // redirect

  return (
    <>
      <h1>Welcome to our site.</h1>
    </>
  );
};

export default Welcome;
