"use client"
import Navbar from "@/src/navbar/nav";
import News from "@/src/news/News";
import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useLogin from "../../zustand-store/loginStore/Login";

const NewsListPage = () => {
    const router = useRouter();
    const { isAuthenticated } = useLogin();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loginState") || "");
       console.log(user.state.success)
            if (user.state.success === false) {
             router.push("/auth/login");
            }
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <News />
            </div>
        </>
    );
};

export default NewsListPage;
