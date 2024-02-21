import { create } from "zustand";

interface NewsStoreState {
  allNews: any[]; // Adjust the type based on the structure of your news items
  loading: boolean;
  error: boolean;
  totalPages: number | null;
  total: number | null;
  page: number;
  pageSize: number | null;
  unAuthorized: boolean | null;
  singleNewsLoading: boolean;
  news: any[]; // Adjust the type based on the structure of your single news item
  fetchAllNews: (page: number) => Promise<void>;
  singleNews: (id: string) => Promise<void>;
}

const useNewsStore = create<NewsStoreState>((set) => ({
  allNews: [],
  loading: false,
  error: false, // Adjusted the initial value to false based on the type
  totalPages: null,
  total: null,
  page: 1,
  pageSize: null,
  unAuthorized: null,
  singleNewsLoading: false,
  news: [],
  fetchAllNews: async (page) => {
    set({ loading: true });
    const token = JSON.parse(localStorage.getItem("loginState") || "");
   
    const news = await fetch(`http://localhost:3001/news?page=${page}`, {
      headers: {
        Authorization: "Bearer " + token.state.token,
        "Content-type": "application/json",
      },
    });
    if (!news.ok) {
      set({ error: true, loading: false });
    }
    const response = await news.json();
    console.log(response);
    set({ allNews: response.paginated, loading: false, total: response.totalNews, page: response.page, pageSize: response.pageSize, totalPages: response.totalPages });
  },
  singleNews: async (id) => {
    set({ singleNewsLoading: true });
    const token = JSON.parse(localStorage.getItem("loginState") || "");
    console.log(id);
    const news = await fetch("http://localhost:3001/news/" + id, {
      headers: {
        Authorization: "Bearer " + token.state.token,
      },
    });
    if (news.status === 401) {
      set({ unAuthorized: true, news: [], singleNewsLoading: false });
    }
    const response = await news.json();
    console.log("single news => ", response);
    set({ news: response.news, singleNewsLoading: false });
  },
}));

export default useNewsStore;
