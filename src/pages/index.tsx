import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { LogInForm, InfoCard } from "../components";
import { useState } from "react";

// file-based routing
// index->'/'
// about.tsx->'/about'

// NO_AUTH localhost:3000/ -> localhost:3000/login
// AUTH localhost:3000/login -> localhost:3000/

const Home: NextPage = () => {
  const [auth, setAuth] = useState(false);

  return (
    <>
      {!auth ? <LogInForm setAuth={setAuth} /> : <InfoCard setAuth={setAuth} />}
    </>
  );
};

export default Home;
