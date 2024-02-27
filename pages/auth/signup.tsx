"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useSignUp from "../../zustand-store/signupStore/Signup";
import useValidation from "@/hooks/useValidation";
import { User, PassVisibility } from "@/interfaces/interfaces";
import useLogin from "@/zustand-store/loginStore/Login";

const Signup = () => {
  const { loading, SignReqError, success, signUpHandler } = useSignUp();
  const { token} = useLogin();
  const { error, validateUser } = useValidation();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<PassVisibility>({
    password: false,
    confirmPass: false,
  });
  const [user, setUser] = useState<User>({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // on change states
  const onChangeFieldsValue = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // show password in field
  const showPasswordHandler = (type: string) => {
    if (type === "pass") {
      setShowPassword((prev) => ({
        ...prev,
        password: true,
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        confirmPass: true,
      }));
    }
  };
  // hide password
  const hidePasswordHandler = (type: string) => {
    if (type === "pass") {
      setShowPassword((prev) => ({
        ...prev,
        password: false,
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        confirmPass: false,
      }));
    }
  };

  const onAddNewUserHandler = async (e: any) => {
    e.preventDefault();
    const validate = validateUser(
      {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      },

      "signup"
    );
    //  submitting user
    if (validate) {
      await signUpHandler(
        "https://finale-pz59.vercel.app/auth/register",
        "POST",
        JSON.stringify({
          username: user.username,
          name: user.name,
          email: user.email,
          password: user.password,
        })
      );
    }
  };
  useEffect(() => {
    if (success) {
      router.replace("/auth/login");
    } else {
      return;
    }
  }, [success]);
  useEffect(()=> {
    if(token){
      router.push("/");
    }
  }, [token])
  return (
    <>
      <div className="container flex justify-center items-center flex-col">
        <h1 className="mt-8 font-semibold">Welcome to the viewsPaper!</h1>
        {/* form */}
        <form
          onSubmit={onAddNewUserHandler}
          className="md:w-[600px] sm:w-[500px] w-full m-2 bg-gray-100 border rounded sm:p-5 p-3 flex flex-col gap-3 justify-center items-center"
        >
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Username{" "}
            <span className="font-extralight text-sm">
              {" "}
              (must have letters and numbers : example123){" "}
            </span>
          </label>
          <input
            type="text"
            className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
            name="username"
            value={user.username}
            onChange={onChangeFieldsValue}
          />
          <p className="w-full text-red-500 text-start">
            {error.username !== "" && error.username}
          </p>
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Name
          </label>
          <input
            type="text"
            className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
            name="name"
            onChange={onChangeFieldsValue}
            value={user.name}
          />
          <p className="w-full text-red-500 text-start">
            {error.name !== "" && error.name}
          </p>

          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Email
          </label>
          <input
            type="email"
            className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
            name="email"
            onChange={onChangeFieldsValue}
            value={user.email}
          />
          <p className="w-full text-red-500 text-start">
            {error.email !== "" && error.email}
          </p>
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Password
          </label>
          <div className="w-full relative">
            <input
              type={`${showPassword.password ? "text" : "password"}`}
              className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
              name="password"
              onChange={onChangeFieldsValue}
              value={user.password}
            />
            <p className="w-full text-red-500 text-start">
              {error.password !== "" && error.password}
            </p>
            {!showPassword.password ? (
              <IoEye
                onClick={() => showPasswordHandler("pass")}
                className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer text-red-400"
              />
            ) : (
              <IoEyeOff
                onClick={() => hidePasswordHandler("pass")}
                className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer"
              />
            )}
          </div>
          <label className="text-start block w-full font-medium">
            <span className="text-red-500">*</span>Confirm Password
          </label>
          <div className="w-full relative">
            <input
              type={`${showPassword.confirmPass ? "text" : "password"}`}
              className="block w-full px-2 py-2 rounded border outline-none bg-gray-50"
              name="confirmPassword"
              onChange={onChangeFieldsValue}
              value={user.confirmPassword}
            />
            <p className="w-full text-red-500 text-start">
              {error.confirmPassword !== "" && error.confirmPassword}
            </p>
            {!showPassword.confirmPass ? (
              <IoEye
                onClick={() => showPasswordHandler("conPass")}
                className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer text-red-400"
              />
            ) : (
              <IoEyeOff
                onClick={() => hidePasswordHandler("conPass")}
                className="absolute top-[50%] right-2 translate-y-[-50%] text-2xl cursor-pointer"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-5 py-2  text-white block w-full rounded font-mono  ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-700 hover:bg-indigo-600"
            }`}
          >
            {loading ? "Please Wait" : "Create Account"}
          </button>

          <p className="w-full text-start text-red-500">
            {Array.isArray(SignReqError?.message)
              ? SignReqError?.message?.map((error: string) => (
                  <>
                    {error} <br />
                  </>
                ))
              : SignReqError?.message}
          </p>
        </form>
       
       
      </div>
    </>
  );
};

export default Signup;
