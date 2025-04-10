import { createJSONStorage, persist } from "zustand/middleware";

import { Artist } from "@/types/artist";
import { create } from "zustand";
import { deleteArtist } from "@/api/artist/delete-artist";
import { getArtist } from "@/api/artist/get-artist";
import { getArtists } from "@/api/artist/get-artists";
import { postArtist } from "@/api/artist/post-artist";
import { putArtist } from "@/api/artist/put-artist";
import { searchArtists } from "@/api/artist/search-artists";
import toast from "react-hot-toast";

interface ArtistStore {
  artists: Artist[];
  isLoading: boolean;
  error: string | null;

  fetchArtist: (artistId: string) => Promise<Artist | null>;
  fetchArtists: () => Promise<void>;
  createArtist: (artist: Artist) => Promise<void>;
  updateArtist: (artist: Artist) => Promise<void>;
  deleteArtist: (artistId: string) => Promise<void>;
  searchArtists: (
    searchKeyword: string,
    searchFields?: string,
  ) => Promise<void>;
}

export const useArtistStore = create<ArtistStore>()(
  persist(
    (set) => ({
      artists: [],
      isLoading: false,
      error: null,

      fetchArtist: async (artistId: string) => {
        set({ isLoading: true });
        try {
          const response = await getArtist({ artistId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return response.data.artist;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "아티스트 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useArtistStore/fetchArtist] Fetch artist failed.",
            error,
          );

          return null;
        } finally {
          set({ isLoading: false });
        }
      },
      fetchArtists: async () => {
        set({ isLoading: true });
        try {
          const response = await getArtists();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ artists: response.data.artistList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "아티스트 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useArtistStore/fetchArtists] Fetch artists failed.",
            error,
          );

          set({ artists: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createArtist: async (artist: Artist) => {
        set({ isLoading: true });
        try {
          const response = await postArtist({ artistList: [artist] });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.artistList.length === 0) {
            throw new Error("아티스트 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            artists: [response.data!.artistList[0], ...state.artists],
            error: null,
          }));

          toast.success("아티스트가 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "아티스트 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useArtistStore/postArtist] Post artist failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      updateArtist: async (artist: Artist) => {
        set({ isLoading: true });
        try {
          const response = await putArtist({ artist });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getArtists();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            artists: fetchResponse.data!.artistList,
            error: null,
          }));

          toast.success("아티스트가 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "아티스트 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useArtistStore/updateArtist] Update artist failed.",
            error,
          );
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteArtist: async (artistId: string) => {
        set({ isLoading: true });
        try {
          const response = await deleteArtist({ artistId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            artists: state.artists.filter((artist) => artist._id !== artistId),
            error: null,
          }));

          toast.success("아티스트가 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "아티스트 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useArtistStore/deleteArtist] Delete artist failed.",
            error,
          );
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      searchArtists: async (searchKeyword: string, searchFields?: string) => {
        set({ isLoading: true });
        try {
          const __searchKeyword = searchKeyword;
          const __searchFields = searchFields;

          const response = await searchArtists({
            __searchKeyword,
            __searchFields,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            artists: response.data.artistList,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "아티스트 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useArtistStore/searchArtists] Search artists failed.",
            error,
          );
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "artist-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
