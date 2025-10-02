import Album, { AlbumFile } from "@/types/album";
import { createJSONStorage, persist } from "zustand/middleware";

import Track from "@/types/track";
import { create } from "zustand";
import { deleteAlbum } from "@/api/album/delete-album";
import { getAlbum } from "@/api/album/get-album";
import { getAlbumFiles } from "@/api/album/get-album-files";
import { getAlbums } from "@/api/album/get-albums";
import { getTracks } from "@/api/track/get-tracks";
import { postAlbum } from "@/api/album/post-album";
import { postAlbumDdex } from "@/api/album/post-album-ddex";
import { postAlbumFile } from "@/api/album/post-album-file";
import { putAlbum } from "@/api/album/put-album";
import { searchAlbums } from "@/api/album/search-albums";
import toast from "react-hot-toast";

// DDEX 발행 시 필수값 검증 함수
const validateDdexRequiredFields = async (album: Album): Promise<string[]> => {
  const errors: string[] = [];

  // 앨범 필수값 검증
  if (!album.UPC) errors.push("• UPC");
  if (!album.releaseArtistList || album.releaseArtistList.length === 0) {
    errors.push("• releaseArtistList");
  }
  if (!album.titleList || album.titleList.length === 0) {
    errors.push("• titleList");
  }
  if (!album.albumType) errors.push("• albumType");
  if (!album.mainGenre) errors.push("• mainGenre");
  if (!album.agencyCompanyName) errors.push("• agencyCompanyName");
  if (!album.supplyRegion) errors.push("• supplyRegion");
  if (!album.utcReleasedAt) errors.push("• utcReleasedAt");
  if (!album.coverImageList || album.coverImageList.length === 0) {
    errors.push("• coverImageList");
  }

  // 트랙 필수값 검증
  try {
    if (!album._id) {
      errors.push("• 앨범 ID가 없습니다");
      return errors;
    }

    const tracksResponse = await getTracks({ albumId: album._id });
    if (
      !tracksResponse.data?.trackList ||
      tracksResponse.data.trackList.length === 0
    ) {
      errors.push("• 트랙이 등록되지 않았습니다");
    } else {
      const tracks = tracksResponse.data.trackList;

      tracks.forEach((track: Track, index: number) => {
        const trackPrefix = `트랙 ${index + 1}:`;

        if (!track.titleList || track.titleList.length === 0) {
          errors.push(`${trackPrefix} titleList`);
        }
        if (!track.discNumber) errors.push(`${trackPrefix} discNumber`);
        if (!track.trackNumber) errors.push(`${trackPrefix} trackNumber`);
        if (!track.ISRC) errors.push(`${trackPrefix} ISRC`);
        if (!track.trackFileList || track.trackFileList.length === 0) {
          errors.push(`${trackPrefix} trackFileList`);
        }
        if (!track.releaseArtistList || track.releaseArtistList.length === 0) {
          errors.push(`${trackPrefix} releaseArtistList`);
        }
        if (!track.mainGenre) errors.push(`${trackPrefix} mainGenre`);
        if (!track.releaseCountryCode)
          errors.push(`${trackPrefix} releaseCountryCode`);
        if (!track.utcReleasedAt) errors.push(`${trackPrefix} utcReleasedAt`);
        if (track.isAdultOnly === undefined)
          errors.push(`${trackPrefix} isAdultOnly`);
        if (track.isInstrumental === undefined)
          errors.push(`${trackPrefix} isInstrumental`);
        if (track.isSupportedSpatialAudio === undefined) {
          errors.push(`${trackPrefix} isSupportedSpatialAudio`);
        }

        // isInstrumental이 false일 때만 contributorList 필수
        if (track.isInstrumental === false) {
          if (!track.contributorList || track.contributorList.length === 0) {
            errors.push(
              `${trackPrefix} contributorList (일반 트랙이므로 필수)`,
            );
          }
        }

        // isSupportedSpatialAudio가 true일 때만 spatialAudioInfo 필수
        if (track.isSupportedSpatialAudio === true) {
          if (
            !track.spatialAudioInfo?.trackFileList ||
            track.spatialAudioInfo.trackFileList.length === 0
          ) {
            errors.push(
              `${trackPrefix} spatialAudioInfo.trackFileList (공간음향이므로 필수)`,
            );
          }
          if (!track.spatialAudioInfo?.ISRC) {
            errors.push(
              `${trackPrefix} spatialAudioInfo.ISRC (공간음향이므로 필수)`,
            );
          }
        }
      });
    }
  } catch (error) {
    errors.push("• 트랙 정보를 불러올 수 없습니다");
  }

  return errors;
};

interface AlbumStore {
  newAlbum: Album | null;
  albums: Album[];
  albumFiles: AlbumFile[];
  isLoading: boolean;
  error: string | null;

  // 페이지네이션 상태
  currentPage: number;
  hasMore: boolean;
  totalCount: number;
  searchParams: {
    __searchKeyword: string;
    __kstStartDate?: string;
    __kstEndDate?: string;
    __searchFields?: string;
    __sortOption?: string;
  } | null;

  fetchAlbum: (albumId: string) => Promise<Album | null>;
  fetchAlbums: (page?: number, reset?: boolean) => Promise<void>;
  fetchAllAlbums: () => Promise<Album[]>;
  createAlbum: (album: Album) => Promise<void>;
  updateAlbum: (album: Album, isNewAlbum: boolean) => Promise<void>;
  deleteAlbum: (albumId: string) => Promise<void>;
  searchAlbums: (
    params: {
      __searchKeyword: string;
      __kstStartDate?: string;
      __kstEndDate?: string;
      __searchFields?: string;
      __sortOption?: string;
      __skip?: number;
      __limit?: number;
    },
    page?: number,
    reset?: boolean,
  ) => Promise<void>;
  uploadAlbumFile: (name: string, filePath: string) => Promise<void>;
  sendAlbumDdex: (albumId: string) => Promise<void>;
  fetchAlbumFiles: (params?: {
    __skip?: number;
    __limit?: number;
    __sortOption?: string;
  }) => Promise<void>;

  resetNewAlbum: () => void;
  resetAlbums: () => void;
}

export const useAlbumStore = create<AlbumStore>()(
  persist(
    (set) => ({
      newAlbum: null,
      albums: [],
      albumFiles: [],
      isLoading: false,
      error: null,

      // 페이지네이션 초기 상태
      currentPage: 1,
      hasMore: true,
      totalCount: 0,
      searchParams: null,

      fetchAlbum: async (albumId: string) => {
        set({ isLoading: true });
        try {
          const response = await getAlbum({ albumId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return response.data.album;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/fetchAlbum] Fetch album failed.",
            error,
          );

          return null;
        } finally {
          set({ isLoading: false });
        }
      },
      fetchAlbums: async (page = 1, reset = false) => {
        set({ isLoading: true });
        try {
          const limit = 100;
          const skip = (page - 1) * limit;

          const response = await getAlbums({
            __skip: skip,
            __limit: limit,
            __sortOption: "createdAtDESC", // 최신순 정렬
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const newAlbums = response.data.albumList || [];
          const totalCount = response.data.totalCount || 0;

          // totalCount가 0이면 서버에서 제공하지 않는 것으로 간주하고
          // 받은 데이터가 limit과 같은지로만 판단
          const hasMore =
            totalCount > 0
              ? newAlbums.length === limit &&
                skip + newAlbums.length < totalCount
              : newAlbums.length === limit;

          console.log("fetchAlbums debug:", {
            page,
            skip,
            limit,
            newAlbumsLength: newAlbums.length,
            totalCount,
            hasMore,
            condition1: newAlbums.length === limit,
            condition2:
              totalCount > 0
                ? skip + newAlbums.length < totalCount
                : "N/A (totalCount=0)",
            usingFallback: totalCount === 0,
          });

          set((state) => ({
            albums: reset ? newAlbums : [...state.albums, ...newAlbums],
            currentPage: page,
            hasMore,
            totalCount,
            searchParams: null, // 일반 조회이므로 검색 파라미터 초기화
            error: null,
          }));
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
      fetchAllAlbums: async () => {
        set({ isLoading: true });
        try {
          const allAlbums: Album[] = [];
          let page = 1;
          let hasMore = true;
          const limit = 100;

          while (hasMore) {
            const skip = (page - 1) * limit;

            const response = await getAlbums({
              __skip: skip,
              __limit: limit,
              __sortOption: "createdAtDESC",
            });

            if (!response || response.error || !response.data) {
              throw new Error(response.message);
            }

            const newAlbums = response.data.albumList || [];
            const totalCount = response.data.totalCount || 0;

            allAlbums.push(...newAlbums);

            // 더 이상 가져올 데이터가 없으면 종료
            hasMore =
              totalCount > 0
                ? newAlbums.length === limit &&
                  skip + newAlbums.length < totalCount
                : newAlbums.length === limit;

            page++;
          }

          return allAlbums;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "전체 앨범 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/fetchAllAlbums] Fetch all albums failed.",
            error,
          );

          throw error;
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
            albums: [response.data!.albumList[0], ...state.albums],
            newAlbum: response.data!.albumList[0],
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
      updateAlbum: async (album: Album, isNewAlbum: boolean = false) => {
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

          if (isNewAlbum) {
            set({ newAlbum: response.data.album });
          }
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
      searchAlbums: async (
        params: {
          __searchKeyword: string;
          __kstStartDate?: string;
          __kstEndDate?: string;
          __searchFields?: string;
          __sortOption?: string;
          __skip?: number;
          __limit?: number;
        },
        page = 1,
        reset = false,
      ) => {
        set({ isLoading: true });
        try {
          const limit = 1000;
          const skip = (page - 1) * limit;

          const searchParams = {
            ...params,
            __skip: skip,
            __limit: limit,
            __sortOption: params.__sortOption || "createdAtDESC", // 기본값: 최신순 정렬
          };

          const response = await searchAlbums(searchParams);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const newAlbums = response.data.albumList || [];
          const totalCount = response.data.totalCount || 0;

          // totalCount가 0이면 서버에서 제공하지 않는 것으로 간주하고
          // 받은 데이터가 limit과 같은지로만 판단
          const hasMore =
            totalCount > 0
              ? newAlbums.length === limit &&
                skip + newAlbums.length < totalCount
              : newAlbums.length === limit;

          set((state) => ({
            albums: reset ? newAlbums : [...state.albums, ...newAlbums],
            currentPage: page,
            hasMore,
            totalCount,
            searchParams: {
              __searchKeyword: params.__searchKeyword,
              __kstStartDate: params.__kstStartDate,
              __kstEndDate: params.__kstEndDate,
              __searchFields: params.__searchFields,
              __sortOption: params.__sortOption,
            },
            error: null,
          }));
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
        } finally {
          set({ isLoading: false });
        }
      },
      uploadAlbumFile: async (name: string, filePath: string) => {
        set({ isLoading: true });
        try {
          const response = await postAlbumFile({ name, filePath });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          toast.success("앨범 파일이 업로드되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 파일 업로드 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/uploadAlbumFile] Upload album file failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      sendAlbumDdex: async (albumId: string) => {
        set({ isLoading: true });
        try {
          // DDEX 발행 전 필수값 검증
          const albumResponse = await getAlbum({ albumId });
          if (!albumResponse || albumResponse.error || !albumResponse.data) {
            throw new Error("앨범 정보를 찾을 수 없습니다.");
          }

          const validationErrors = await validateDdexRequiredFields(
            albumResponse.data.album,
          );
          if (validationErrors.length > 0) {
            const errorMessage = `다음 필수값이 누락되었습니다:\n${validationErrors.join(
              "\n",
            )}`;
            toast.error(errorMessage);
            throw new Error(errorMessage);
          }

          const response = await postAlbumDdex(albumId);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          toast.success("앨범 DDEX가 전송되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 DDEX 전송 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/sendAlbumDdex] Send album DDEX failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      fetchAlbumFiles: async (params?: {
        __skip?: number;
        __limit?: number;
        __sortOption?: string;
      }) => {
        set({ isLoading: true });
        try {
          const response = await getAlbumFiles(params);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ albumFiles: response.data.albumFileList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "앨범 파일 목록 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAlbumStore/fetchAlbumFiles] Fetch album files failed.",
            error,
          );

          set({ albumFiles: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      resetNewAlbum: () => {
        set({ newAlbum: null });
      },
      resetAlbums: () => {
        set({
          albums: [],
          currentPage: 1,
          hasMore: true,
          totalCount: 0,
          searchParams: null,
        });
      },
    }),
    {
      name: "album-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ newAlbum: state.newAlbum }),
    },
  ),
);
