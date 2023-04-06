import { type NextPage } from "next";
import { useRouter } from "next/router";

const Welcome: NextPage = () => {
  const router = useRouter()

  // router.push("/")

  return (
    <>
      <h1>Welcome to out site.</h1>
    </>
  );
};

export default Welcome;
