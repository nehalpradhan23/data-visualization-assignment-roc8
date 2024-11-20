"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      if (response.data.message === "success") {
        router.push("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      setErrorMessage(axiosError.response?.data);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 border border-black h-fit"
      >
        <h2 className="font-bold mx-auto">Login</h2>
        <div className="">
          <label>Email</label>
          <input
            type="enail"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white mx-auto px-5 hover:bg-blue-700">
          Login
        </button>
        {errorMessage && <span>{JSON.stringify(errorMessage)}</span>}
      </form>
    </div>
  );
};

export default LoginPage;
