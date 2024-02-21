"use client";
import Navbar from "@/src/navbar/nav";
import List from "@/src/news/NewsList";
import useLogin from "@/zustand-store/loginStore/Login";
import useNewsStore from "@/zustand-store/newsStore/News";
import { useRouter } from "next/router";
import { useEffect } from "react";
const FakeNews = () => {
  const { isAuthenticated } = useLogin();
  const {singleNews, singleNewsLoading, news} = useNewsStore();
  const router = useRouter();
  useEffect(() => {
   
    
    const user = JSON.parse(localStorage.getItem("loginState") || "");
   
    if (user.state.success === false) {
      router.push("/auth/login");
    } else {

      const id = localStorage.getItem("id")||"";
      if(id){
        singleNews(id);
      }
     
    }
  }, []);
  return (
    <>
      <Navbar />
      <List loading={singleNewsLoading} news={news} />
    </>
  );
};
export default FakeNews;
