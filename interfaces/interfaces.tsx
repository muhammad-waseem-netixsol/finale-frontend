export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface Error {
  image: string;
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
export interface PassVisibility {
  password: boolean;
  confirmPass: boolean;
}

export interface ChartOptions {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    chart: {
      type: 'area'; 
    };
    dataLabels: {
      enabled: boolean;
    };
    grid: {
      strokeDashArray: number;
      borderColor: string;
    };
    stroke: {
      curve: string;
      width: number;
    };
    xaxis: {
      categories: string[];
    };
  };
}
export interface ListProps {
  loading: boolean;
  news: {
    [key: string]: string;
  };
}
export interface AnalyticsData {
  dates: string[];
  englishCounts: number[];
  spanishCounts: number[];
}
