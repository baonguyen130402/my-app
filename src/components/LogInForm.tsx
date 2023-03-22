import React from "react";
import { useState } from "react";
import { InfoCard } from "./InfoCard";

export const LogInForm = ({ setAuth }: { setAuth: () => void }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex h-screen flex-col items-center justify-center bg-gray-500">
      <div className="w-6/12 rounded-xl bg-white p-5 text-center text-black">
        <h1 className="mb-3 text-3xl font-bold">Login</h1>
        <div className="mb-3 flex flex-col items-start">
          <p className="text-md mb-1 font-semibold">Email:</p>
          <input
            className="focus:border-1 mb-2 w-full rounded-lg border border-gray-200 p-1 focus:mb-2 focus:rounded-lg focus:border-transparent focus:bg-gray-200 focus:outline-none"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3 flex flex-col items-start">
          <p className="text-md mb-1 font-semibold">Password:</p>
          <input
            className="focus:border-1 mb-2 w-full rounded-lg border border-gray-200 p-1 focus:mb-2 focus:rounded-lg focus:border-transparent focus:bg-gray-200 focus:outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="text mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-stone-300 hover:bg-blue-500"
          onClick={AuthService.logIn()}
        >
          Login
        </button>
      </div>
    </div>
  );
};
