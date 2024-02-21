"use client"
import Pagination from "./Pagination";
import useNewsStore from "../../zustand-store/newsStore/News";
import Card from "./NewsCard";
import { useEffect, useState } from "react";
const News = () => {
  const [paginatedNews, setPaginatedNews] = useState([]);
  const [page, setPage] = useState(1);
    const {fetchAllNews, allNews, totalPages, loading} = useNewsStore();
   const onChangePagination = async (page: number) => {
    await fetchAllNews(page);
    setPage(page);
  };
  useEffect(()=> {
    const fetchNews = async () => {
      await fetchAllNews(page);
    };
     fetchNews();
  }, [])
  return (
    <div className="md:w-[900px] mx-auto">
      {loading && allNews?.length === 0 ? <h1 className="w-full text-center my-5">Fetching News....</h1> : allNews?.length === 0 ? <h1 className="text-center my-5">NO NEWS FOUND</h1>: allNews?.map((news:any) => <Card key={news._id} news={news} />) }
      
      {/* paginations */}
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={onChangePagination} />
    </div>
  );
};

export default News;
