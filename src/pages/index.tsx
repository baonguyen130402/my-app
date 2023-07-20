import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { LogInForm, InfoCard } from "../components";
import { useState } from "react";
import AuthService from "~/services/AuthService";
import { DetailSection } from "~/components/DetailSection";

// file-based routing
// index->'/'
// about.tsx->'/about'

// NO_AUTH localhost:3000/ -> localhost:3000/login
// AUTH localhost:3000/login -> localhost:3000/

const Home: NextPage = () => {
  // return <>{!AuthService.isAuthenticated ? <LogInForm /> : <DetailSection />}</>;
  return <DetailSection />;
};

export default Home;
