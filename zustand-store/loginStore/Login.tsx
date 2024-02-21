// useLogin.ts
import  { create,State, StateCreator } from 'zustand';
import { devtools, persist, DevtoolsOptions } from 'zustand/middleware';

interface LoginState {
  loading: boolean;
  success: boolean;
  httpReqError: null | string;
  token: null | string;
  isAuthenticated: boolean;
  loginHandler: (url: string, method: string, credentials: Record<string, string>) => Promise<void>;
  logout: () => void;
}

const getInitialToken = (): null | string => {
  if (process.browser) {
    // On the client side, get the token from local storage
    return JSON.parse(localStorage.getItem('token') ?? 'null');
  } else {
    // On the server side, no local storage is available
    return null;
  }
};

const useLogin = create<LoginState>(
  (devtools as any)( // Explicitly cast devtools due to a type inference issue
    persist((set) => ({
      loading: false,
      success: false,
      httpReqError: null,
      token: null,
      isAuthenticated: getInitialToken() !== 'null',

      loginHandler: async (url, method, credentials) => {
        set({ loading: true, httpReqError: null });
        try {
          const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            method,
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            const httpReqErrorData = await response.json();
            set({
              loading: false,
              success: false,
              httpReqError: httpReqErrorData,
              isAuthenticated: false,
              token: null,
            });
            return;
          }

          const data = await response.json();
          // Handle successful response
          set({
            loading: false,
            success: true,
            httpReqError: null,
            isAuthenticated: true,
            token: data.token,
          });
        } catch (error: any) {
          // Handle other errors
          set({
            loading: false,
            success: false,
            httpReqError: error.message,
            isAuthenticated: false,
            token: null,
          });
        }
      },

      logout: () => {
        localStorage.clear();
        set({ isAuthenticated: false, httpReqError: null, token: null, success: false });
      },
    }),
    {
      name: 'loginState',
    }
  ) as StateCreator<LoginState>
));

export default useLogin;
