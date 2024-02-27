import {create} from "zustand";

interface AnalyticsStoreState {
  loading: boolean;
  spanish: number[];
  english: number[];
  turkish: number[];
  french: number[];
  intervals: number[];
  total: number;
  lang: number;
  us: number;
  spam: number;
  error: string;
  getAnalytics: () => Promise<void>;
  getAuthorAnalytics: () => Promise<void>;
  authors: any;
}
interface CountsObject {
  [key: string]: number;
}
const useAnalyticsStore = create<AnalyticsStoreState>((set) => ({
  loading: false,
  spanish: [],
  english: [],
  turkish: [],
  french: [],
  intervals: [],
  total: 0,
  lang: 0,
  us: 0,
  spam: 0,
 authors: [],
  error: "",
  getAnalytics: async () => {
    set({ loading: true, error: "" });
    const token = JSON.parse(localStorage.getItem("loginState") || "");
    const analytics = await fetch(
      "https://finale-pz59.vercel.app/news/analytics",
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer " +  token.state.token,
        },
      }
    );

    if (!analytics.ok) {
      const resp = await analytics.json();
      set({ error: resp.message, loading: false });
    }

    const data = await analytics.json();
    console.log(data)
    set({
      total: data.counts.total,
      us: data.counts.us,
      lang: data.counts.lang,
      spam: data.counts.spam,
      intervals: data.analytics.dates,
      spanish: data.analytics.spanishCounts,
      english: data.analytics.englishCounts,
      french: data.analytics.frenchCounts,
      turkish: data.analytics.turkishCounts,
      loading: false,
    });
  },
  getAuthorAnalytics: async () => {
    const token = JSON.parse(localStorage.getItem("loginState") || "");
    const analytics = await fetch(
      "https://finale-pz59.vercel.app/news/author",
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer " +  token.state.token,
        }
      }
    );
    const resp = await analytics.json();
    const arrayOfObjects = Object.entries(resp).map(([key, value]) => ({ [key]: value }));
      set({authors: arrayOfObjects});
    }
    
  }))


  
    

export default useAnalyticsStore;
