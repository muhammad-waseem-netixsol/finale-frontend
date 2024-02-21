import TruncatedText from "./Truncate";
import { IoThumbsUpOutline } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";
import { ListProps } from "reactstrap";
const List:React.FC<ListProps> = ({loading, news}) => {
    if(loading){
        return <h1 className="text-center my-5">Fetching news...</h1>
    }
    return <div className="container mx-auto max-w-screen-lg">
        <h1 className=" mx-auto text-start text-2xl font-mono my-2">News:</h1>
    <div className="w-full">
        <div className="relative">
           <img className="block h-[300px] w-full" style={{height: "300px"}} src="https://th.bing.com/th/id/OIP.VDLpDr3VEQ9FJIo7EPFaWAAAAA?rs=1&pid=ImgDetMain" height={300} width={300} alt="banner" /> 
        </div>
        <h1 className="mt-2 text-xl font-semibold">{news.author}</h1>
        <p className="font-light text-sm">{news.published}</p>
        <div className="font-black text-2xl my-5">{news.title}</div>
        
<p>{news.text} </p>

    </div>
    {/* like and comment */}
    <div className="border-b w-full my-5 flex justify-start">
        <div className="text-gray-600 flex items-center gap-3 py-2 hover:bg-indigo-100 w-max px-3 rounded-md cursor-pointer"><IoThumbsUpOutline />{news?.likes?.length} Like(s)</div>
        <div className="text-gray-600 flex items-center gap-3 py-2 hover:bg-indigo-100 w-max px-3 rounded-md cursor-pointer"><TfiComment />{news?.comments?.length} Comment(s)</div>
    </div>
    {/* comment area */}
    <div className="h-20">
        <textarea className="block h-full w-full outline-none p-3" placeholder="Enter your comment" cols={20}></textarea>
    </div>
    <div className="py-3">
        <button className="bg-indigo-500 py-2 px-5 rounded-md text-white hover:bg-indigo-800">Submit</button>
    </div>
    {/* comments list */}
    <div className="text-xl font-semibold my-4">Comments</div>
    <div className="border-b flex flex-col gap-2">
        <h1 className="">M Waseem</h1>
        <p className="text-sm font-light">This is very shocking news!</p>
    </div>
    </div>
};
export default List;