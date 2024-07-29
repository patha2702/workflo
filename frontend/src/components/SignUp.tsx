"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:5050/api/user/sign-up", {
        name: name,
        email: email,
        password: password,
      });
      if (res.status >= 200 && res.status < 300) {
        router.push("/home");
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="max-w-3xl rounded-2xl p-16 bg-gradient-to-b from-[#f7f7f7] to-[#f0f0f0] border border-[#CECECE]">
      <h1 className="font-semibold text-5xl text-[#2d2d2d]">
        Welcome to <span className="text-[#4534ac]">Workflo!</span>
      </h1>
      <div className="flex flex-col gap-3 my-5">
        <input
          type={"text"}
          placeholder={"Full name"}
          className="w-full rounded-lg px-3 py-4 bg-[#ebebeb] text-xl font-normal text-[#999999] focus:outline-none"
          required={true}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type={"text"}
          placeholder={"Your email"}
          className="w-full rounded-lg px-3 py-4 bg-[#ebebeb] text-xl font-normal text-[#999999] focus:outline-none"
          required={true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="flex justify-between items-center bg-[#ebebeb] rounded-lg">
          <input
            type={passwordVisibility ? "text" : "password"}
            placeholder={"Password"}
            className="w-full rounded-lg px-3 py-4 text-xl font-normal text-[#999999] bg-inherit focus:outline-none"
            required={true}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={togglePasswordVisibility}>
            <Image
              src="/assets/icons/eye.svg"
              width={24}
              height={24}
              alt="eye"
              className="mr-3"
            />
          </button>
        </div>
        <button
          className="rounded-lg p-2 bg-auth-btn-linear-gradient inline-flex justify-center text-white text-[20px] font-base"
          onClick={() => {
            handleSignUp();
          }}
        >
          Sign up
        </button>
      </div>
      <div>
        {error && <p className="text-base text-red-600 text-center">{error}</p>}
        <p className="font-normal text-[#606060] text-xl text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#0054a1]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
