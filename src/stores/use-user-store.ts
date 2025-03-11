import { User } from "@/types/user";
import { create } from "zustand";
import { login } from "@/api/user/login";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface UserStore {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  jsonWebToken: string | null;
  login: (account: string, password: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      user: null,
      jsonWebToken: null,
      login: async (account: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await login(account, password);

          if (!response.status || !response.data) {
            toast.error(response.message.error);
            console.error(
              "[useUserStore/login] Login failed. !status or !data",
              response,
            );
          }

          set({
            user: response.data!.user,
            jsonWebToken: response.data!.jsonWebToken,
          });
        } catch (error) {
          toast.error(error);
          console.error("[useUserStore/login] Login failed.", error);
          set({ error: "Login failed", user: null, jsonWebToken: null });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "user" },
  ),
);
