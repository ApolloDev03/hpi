// "use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { apiUrl } from "../config";


export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  module: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PhotoGalleryItem = {
  title: string;
  slug: string;
  image_url: string;
};

export type TestimonialItem = {
  name: string;
  category_name: string;
  comments: string;
};

export type BlogItem = {
  title: string;
  slug: string;
  image_url: string;
  description: string;
};

export type HomeApiData = {
  photo_gallery: PhotoGalleryItem[];
  testimonials: TestimonialItem[];
  blogs: BlogItem[];
};

type CategoriesApiResponse = {
  success: boolean;
  message: string;
  data: ApiCategory[];
};

type HomeApiResponse = {
  success: boolean;
  message: string;
  data: HomeApiData;
};

type HomeDataContextValue = {
  categories: ApiCategory[];
  activeCategoryId: number | null;
  activeCategory: ApiCategory | null;
  homeData: HomeApiData;

  categoriesLoading: boolean;
  homeDataLoading: boolean;

  categoriesError: string;
  homeDataError: string;

  selectCategory: (categoryId: number) => void;
  retryCategories: () => Promise<void>;
  retryHomeData: () => Promise<void>;
};

const EMPTY_HOME_DATA: HomeApiData = {
  photo_gallery: [],
  testimonials: [],
  blogs: [],
};

const HomeDataContext =
  createContext<HomeDataContextValue | null>(null);

function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error && error.message
      ? error.message
      : fallbackMessage;
  }

  const responseMessage = error.response?.data?.message;

  if (
    typeof responseMessage === "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return error.message || fallbackMessage;
}

export function HomeDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, setCategories] = useState<ApiCategory[]>(
    [],
  );

  const [activeCategoryId, setActiveCategoryId] = useState<
    number | null
  >(null);

  const [homeData, setHomeData] =
    useState<HomeApiData>(EMPTY_HOME_DATA);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [homeDataLoading, setHomeDataLoading] =
    useState(false);

  const [categoriesError, setCategoriesError] =
    useState("");

  const [homeDataError, setHomeDataError] = useState("");

  const categoriesAbortController =
    useRef<AbortController | null>(null);

  const homeAbortController =
    useRef<AbortController | null>(null);

  const fetchCategories = useCallback(async () => {
    categoriesAbortController.current?.abort();

    const controller = new AbortController();
    categoriesAbortController.current = controller;

    setCategoriesLoading(true);
    setCategoriesError("");

    try {
      const response =
        await axios.post<CategoriesApiResponse>(
          `${apiUrl}/categorieslist`,
          {},
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );

      if (
        !response.data.success ||
        !Array.isArray(response.data.data)
      ) {
        throw new Error(
          response.data.message ||
            "Invalid categories response received.",
        );
      }

      const activeCategories = response.data.data.filter(
        (category) =>
          category.status?.toLowerCase() === "active" &&
          category.module?.toLowerCase() ===
            "photo_gallery",
      );

      if (controller.signal.aborted) {
        return;
      }

      setCategories(activeCategories);

      setActiveCategoryId((currentCategoryId) => {
        const selectedCategoryStillExists =
          activeCategories.some(
            (category) =>
              category.id === currentCategoryId,
          );

        if (selectedCategoryStillExists) {
          return currentCategoryId;
        }

        /*
         * Select the first API category by default.
         * Its ID is then automatically sent to /api/home.
         */
        return activeCategories[0]?.id ?? null;
      });
    } catch (error: unknown) {
      if (
        controller.signal.aborted ||
        (axios.isAxiosError(error) &&
          error.code === "ERR_CANCELED")
      ) {
        return;
      }

      setCategories([]);
      setActiveCategoryId(null);
      setHomeData(EMPTY_HOME_DATA);

      setCategoriesError(
        getApiErrorMessage(
          error,
          "Unable to load project categories.",
        ),
      );
    } finally {
      if (!controller.signal.aborted) {
        setCategoriesLoading(false);
      }
    }
  }, []);

  const fetchHomeData = useCallback(
    async (categoryId: number) => {
      homeAbortController.current?.abort();

      const controller = new AbortController();
      homeAbortController.current = controller;

      setHomeDataLoading(true);
      setHomeDataError("");
      setHomeData(EMPTY_HOME_DATA);

      try {
        const response = await axios.post<HomeApiResponse>(
          `${apiUrl}/home`,
          {
            category_id: String(categoryId),
          },
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.data.success || !response.data.data) {
          throw new Error(
            response.data.message ||
              "Invalid home data response received.",
          );
        }

        const normalizedData: HomeApiData = {
          photo_gallery: Array.isArray(
            response.data.data.photo_gallery,
          )
            ? response.data.data.photo_gallery
            : [],

          testimonials: Array.isArray(
            response.data.data.testimonials,
          )
            ? response.data.data.testimonials
            : [],

          blogs: Array.isArray(
            response.data.data.blogs,
          )
            ? response.data.data.blogs
            : [],
        };

        if (controller.signal.aborted) {
          return;
        }

        setHomeData(normalizedData);
      } catch (error: unknown) {
        if (
          controller.signal.aborted ||
          (axios.isAxiosError(error) &&
            error.code === "ERR_CANCELED")
        ) {
          return;
        }

        setHomeData(EMPTY_HOME_DATA);

        setHomeDataError(
          getApiErrorMessage(
            error,
            "Unable to load category-wise home data.",
          ),
        );
      } finally {
        if (!controller.signal.aborted) {
          setHomeDataLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    void fetchCategories();

    return () => {
      categoriesAbortController.current?.abort();
      homeAbortController.current?.abort();
    };
  }, [fetchCategories]);

  /*
   * Runs after the first category is selected and whenever
   * the user clicks another category inside Projects.
   */
  useEffect(() => {
    if (activeCategoryId === null) {
      setHomeData(EMPTY_HOME_DATA);
      return;
    }

    void fetchHomeData(activeCategoryId);
  }, [activeCategoryId, fetchHomeData]);

  const activeCategory = useMemo(
    () =>
      categories.find(
        (category) =>
          category.id === activeCategoryId,
      ) ?? null,
    [activeCategoryId, categories],
  );

  const selectCategory = useCallback(
    (categoryId: number) => {
      const categoryExists = categories.some(
        (category) => category.id === categoryId,
      );

      if (
        !categoryExists ||
        categoryId === activeCategoryId
      ) {
        return;
      }

      setActiveCategoryId(categoryId);
    },
    [activeCategoryId, categories],
  );

  const retryCategories = useCallback(async () => {
    await fetchCategories();
  }, [fetchCategories]);

  const retryHomeData = useCallback(async () => {
    if (activeCategoryId === null) {
      return;
    }

    await fetchHomeData(activeCategoryId);
  }, [activeCategoryId, fetchHomeData]);

  const value = useMemo<HomeDataContextValue>(
    () => ({
      categories,
      activeCategoryId,
      activeCategory,
      homeData,

      categoriesLoading,
      homeDataLoading,

      categoriesError,
      homeDataError,

      selectCategory,
      retryCategories,
      retryHomeData,
    }),
    [
      categories,
      activeCategoryId,
      activeCategory,
      homeData,
      categoriesLoading,
      homeDataLoading,
      categoriesError,
      homeDataError,
      selectCategory,
      retryCategories,
      retryHomeData,
    ],
  );

  return (
    <HomeDataContext.Provider value={value}>
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData(): HomeDataContextValue {
  const context = useContext(HomeDataContext);

  if (!context) {
    throw new Error(
      "useHomeData must be used inside HomeDataProvider.",
    );
  }

  return context;
}