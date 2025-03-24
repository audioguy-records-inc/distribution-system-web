import Album from "@/types/album";
import { create } from "zustand";
import { deleteAlbum } from "@/api/album/delete-album";
import { getAlbums } from "@/api/album/get-albums";
import { persist } from "zustand/middleware";
import { postAlbum } from "@/api/album/post-album";
import { putAlbum } from "@/api/album/put-album";
import { searchAlbum } from "@/api/album/search-album";
import toast from "react-hot-toast";

interface AlbumStore {
  albums: Album[];
  isLoading: boolean;
  error: string | null;

  fetchAlbums: () => Promise<void>;
  createAlbum: (album: Album) => Promise<void>;
  updateAlbum: (album: Album) => Promise<void>;
  deleteAlbum: (albumId: string) => Promise<void>;
  searchAlbums: (
    searchKeyword: string,
    searchFields?: string,
  ) => Promise<Album[]>;
}

export const useAlbumStore = create<AlbumStore>()(
  persist(
    (set) => ({
      albums: [],
      isLoading: false,
      error: null,

      fetchAlbums: async () => {
        set({ isLoading: true });
        try {
          const response = await getAlbums();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ albums: response.data.albumList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/fetchAlbums] Fetch albums failed.",
            error,
          );

          set({ albums: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createAlbum: async (album: Album) => {
        set({ isLoading: true });
        try {
          const response = await postAlbum({ albumList: [album] });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.albumList.length === 0) {
            throw new Error("앨범 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            albums: [...state.albums, response.data!.albumList[0]],
            error: null,
          }));

          toast.success("앨범이 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useAlbumStore/postAlbum] Post album failed.", error);
        } finally {
          set({ isLoading: false });
        }
      },
      updateAlbum: async (album: Album) => {
        set({ isLoading: true });
        try {
          const response = await putAlbum({ album });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getAlbums();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            albums: fetchResponse.data!.albumList,
            error: null,
          }));

          toast.success("앨범이 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/updateAlbum] Update album failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      deleteAlbum: async (albumId: string) => {
        set({ isLoading: true });
        try {
          const response = await deleteAlbum({ albumId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            albums: state.albums.filter((album) => album._id !== albumId),
            error: null,
          }));

          toast.success("앨범이 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/deleteAlbum] Delete album failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      searchAlbums: async (searchKeyword: string, searchFields?: string) => {
        set({ isLoading: true });
        try {
          const __searchKeyword = searchKeyword;
          const __searchFields = searchFields;

          const response = await searchAlbum({
            __searchKeyword,
            __searchFields,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            error: null,
          });

          return response.data!.albumList;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/searchAlbums] Search albums failed.",
            error,
          );
          set({ error: errorMessage });
          return [];
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "album-store",
    },
  ),
);
