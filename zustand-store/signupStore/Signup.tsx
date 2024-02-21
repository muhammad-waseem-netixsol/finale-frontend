import create from "zustand";
import { SetState } from "zustand/vanilla";

interface SignUpState {
  loading: boolean;
  success: boolean;
  SignReqError: any;
  signUpHandler: (url: string, method: string, credentials: BodyInit) => Promise<void>;
}

const useSignUp = create<SignUpState>((set: SetState<SignUpState>) => ({
  loading: false,
  success: false,
  SignReqError: null,
  signUpHandler: async (url: string, method: string, credentials: BodyInit) => {
    set((state) => ({ ...state, loading: true, SignReqError: null }));
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "Application/json"
        },
        method,
        body: credentials,
      });

      if (!response.ok) {
        const httpReqErrorData = await response.json();
        set((state) => ({ ...state, loading: false, success: false, SignReqError: httpReqErrorData }));
        return;
      }

      const data = await response.json();
      // Handle successful response
      console.log(data);
      set((state) => ({ ...state, loading: false, success: true, SignReqError: null }));
    } catch (httpReqError:any) {
      // Handle other httpReqErrors
      set((state) => ({
        ...state,
        loading: false,
        success: false,
        SignReqError: httpReqError.message,
      }));
    }
  },
}));

export default useSignUp;
