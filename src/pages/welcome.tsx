import { type NextPage } from "next";
import { useState } from "react";

const Welcome: NextPage = () => {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <h1>Hi.</h1>
    </>
  );
};

export default Welcome;
