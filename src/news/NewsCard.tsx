import useLogin from "@/zustand-store/loginStore/Login";

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
interface NewsProps {
    title:string;
    text: string;
    country: string;
    author: string;
}
const Card:React.FC<any> = ({news}) => {
    const {push} = useRouter();
    const router = useRouter()
    const isLoggedin = useLogin((state) => state.isAuthenticated);
    const onRedirectPage = () => {
       checkAuth();
    };
  
    const checkAuth = () => {
      localStorage.removeItem("id");
        const token = JSON.parse(localStorage.getItem("loginState") || "");
        if(token.state.isAuthenticated){
          localStorage.setItem("id", news._id);
          router.push('/news/fake');
        }else{
            push("/auth/login");
        }
    };
    console.log(news._id)
    return <div onClick={onRedirectPage} className="border-b mx-auto p-3 cursor-pointer">
    <h1 className="font-black text-3xl capitalize font-sans mb-3">
     {news.title}
    </h1>
    <p className="truncate-text">
      {news.text} 
    </p><span className="font-bold font-mono text-indigo-500">Read More?</span>
    <div>
      Author:{" "}
      <span className="font-mono text-lg ml-3">{news.author}</span>
    </div>
    <div>
      Country: <span className="font-mono text-lg ml-3">{news.reference.country}</span>
    </div>
  </div>
};

export default Card;