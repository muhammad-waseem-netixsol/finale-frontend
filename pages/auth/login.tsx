"use client";
import { PassVisibility } from "../../interfaces/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useValidation from "@/hooks/useValidation";
import useLogin from "../../zustand-store/loginStore/Login";
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter();
  const { loginHandler, success, httpReqError, token, loading, isAuthenticated } = useLogin();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { error, validateUser } = useValidation();

  const [showPassword, setShowPassword] = useState<PassVisibility>({
    password: false,
    confirmPass: false,
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } 
  }, [isFirstRender]);
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
  //   onsubmit login
  const onLoginHandler = async (e: any) => {
    e.preventDefault();

    // calling custom hook
    const validate = validateUser(
      { email: user.email, password: user.password },
      "login"
    );
    if (!validate) {
      return;
    }
    await loginHandler("https://finale-pz59.vercel.app/auth/login", "POST", {
      email: user.email,
      password: user.password,
    }); 
    
  };
useEffect(()=>{
  if(success){
    alert("logged in")
    router.push("/list/NewsList");
  }
}, [success, token] )

 
  return (
    <div className="md:h-screen px-2 min-h-screen flex flex-col justify-center items-center">
     
      <h1 className="text-center font-bold text-lg my-5">Fake News</h1>
     
      <form
      onSubmit={onLoginHandler}
        className="md:w-[600px] sm:w-[500px] w-full bg-gray-100 md:p-5 py-5 px-3 border rounded flex flex-col gap-3 justify-center items-center"
      >
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
          {error.email !== "" && !isFirstRender && error.email}
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
        <p className="w-full text-red-500 text-start">{error.password}</p>
        <button
        disabled={loading}
          type="submit"
          className={`mt-5 py-2  text-white block w-full rounded font-mono hover:bg-indigo-600 ${loading ? "bg-slate-500" : "bg-indigo-700"}`}
        >
          Login
        </button>
        <p className="w-full text-start text-red-500">
            {httpReqError}
        </p>
      </form>
      <div className="font-mono py-5">
        Do not have account?{" "}
        <Link href={"/auth/signup"} className="text-indigo-500">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
