"use client";

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

/* =========================================================
   CATEGORY TYPE
========================================================= */

export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  module: string;
  status: string;
  created_at: string;
  updated_at: string;
};

/* =========================================================
   PHOTO GALLERY TYPE
========================================================= */

export type PhotoGalleryItem = {
  title: string;
  slug: string;
  image_url: string;
};

/* =========================================================
   TESTIMONIAL TYPE
========================================================= */

export type TestimonialItem = {
  name: string;
  category_name: string;
  comments: string;
};

/* =========================================================
   BLOG TYPE
========================================================= */

export type BlogItem = {
  title: string;
  slug: string;
  image_url: string;
  description: string;
};

/* =========================================================
   HOME COUNTER TYPE
========================================================= */

export type HomeCountData = {
  projects_counts: number;
  clients_count: number;
  experience_count: number;
  cities_count: number;
};

/* =========================================================
   HOME DATA
========================================================= */

export type HomeApiData = {
  photo_gallery: PhotoGalleryItem[];

  testimonials: TestimonialItem[];

  blogs: BlogItem[];

  count: HomeCountData;
};

/* =========================================================
   CATEGORY API RESPONSE
========================================================= */

type CategoriesApiResponse = {
  success: boolean;
  message: string;
  data: ApiCategory[];
};

/* =========================================================
   RAW COUNTER API TYPE
========================================================= */

type ApiCountData = {
  projects_counts?:
    | number
    | string
    | null;

  clients_count?:
    | number
    | string
    | null;

  experience_count?:
    | number
    | string
    | null;

  cities_count?:
    | number
    | string
    | null;
};

/* =========================================================
   RAW HOME API DATA
========================================================= */

type HomeApiResponseData = {
  photo_gallery?:
    | PhotoGalleryItem[]
    | null;

  testimonials?:
    | TestimonialItem[]
    | null;

  blogs?:
    | BlogItem[]
    | null;

  count?:
    | ApiCountData
    | null;
};

/* =========================================================
   HOME API RESPONSE
========================================================= */

type HomeApiResponse = {
  success: boolean;
  message: string;

  data:
    | HomeApiResponseData
    | null;
};

/* =========================================================
   CONTEXT TYPE
========================================================= */

type HomeDataContextValue = {
  categories: ApiCategory[];

  activeCategoryId:
    | number
    | null;

  activeCategory:
    | ApiCategory
    | null;

  homeData: HomeApiData;

  categoriesLoading: boolean;

  homeDataLoading: boolean;

  categoriesError: string;

  homeDataError: string;

  selectCategory: (
    categoryId: number,
  ) => void;

  retryCategories: () =>
    Promise<void>;

  retryHomeData: () =>
    Promise<void>;
};

/* =========================================================
   EMPTY COUNTER DATA
   DEFAULT = 0
========================================================= */

const EMPTY_COUNT_DATA: HomeCountData = {
  projects_counts: 0,
  clients_count: 0,
  experience_count: 0,
  cities_count: 0,
};

/* =========================================================
   EMPTY HOME DATA
========================================================= */

const EMPTY_HOME_DATA: HomeApiData = {
  photo_gallery: [],

  testimonials: [],

  blogs: [],

  count: {
    ...EMPTY_COUNT_DATA,
  },
};

/* =========================================================
   CONTEXT
========================================================= */

const HomeDataContext =
  createContext<
    HomeDataContextValue | null
  >(null);

/* =========================================================
   NORMALIZE COUNTER
========================================================= */

function normalizeCount(
  value: unknown,
): number {
  /*
   * null => 0
   * undefined => 0
   * "" => 0
   * invalid => 0
   */

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const numericValue =
    Number(value);

  if (
    !Number.isFinite(
      numericValue,
    )
  ) {
    return 0;
  }

  /*
   * Negative count hoy
   * to pan 0.
   */
  return Math.max(
    0,
    numericValue,
  );
}

/* =========================================================
   API ERROR MESSAGE
========================================================= */

function getApiErrorMessage(
  error: unknown,

  fallbackMessage: string,
): string {
  if (
    !axios.isAxiosError(
      error,
    )
  ) {
    return error instanceof Error &&
      error.message
      ? error.message
      : fallbackMessage;
  }

  const responseMessage =
    error.response?.data
      ?.message;

  if (
    typeof responseMessage ===
      "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return (
    error.message ||
    fallbackMessage
  );
}

/* =========================================================
   PROVIDER
========================================================= */

export function HomeDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  /* =======================================================
     CATEGORY STATE
  ======================================================= */

  const [
    categories,
    setCategories,
  ] =
    useState<ApiCategory[]>(
      [],
    );

  const [
    activeCategoryId,
    setActiveCategoryId,
  ] =
    useState<
      number | null
    >(null);

  /* =======================================================
     HOME DATA
  ======================================================= */

  const [
    homeData,
    setHomeData,
  ] =
    useState<HomeApiData>({
      ...EMPTY_HOME_DATA,

      count: {
        ...EMPTY_COUNT_DATA,
      },
    });

  /* =======================================================
     LOADING
  ======================================================= */

  const [
    categoriesLoading,
    setCategoriesLoading,
  ] =
    useState(true);

  const [
    homeDataLoading,
    setHomeDataLoading,
  ] =
    useState(false);

  /* =======================================================
     ERROR
  ======================================================= */

  const [
    categoriesError,
    setCategoriesError,
  ] =
    useState("");

  const [
    homeDataError,
    setHomeDataError,
  ] =
    useState("");

  /* =======================================================
     ABORT CONTROLLERS
  ======================================================= */

  const categoriesAbortController =
    useRef<
      AbortController | null
    >(null);

  const homeAbortController =
    useRef<
      AbortController | null
    >(null);

  /* =======================================================
     FETCH CATEGORIES
  ======================================================= */

  const fetchCategories =
    useCallback(
      async () => {
        categoriesAbortController
          .current?.abort();

        const controller =
          new AbortController();

        categoriesAbortController.current =
          controller;

        setCategoriesLoading(
          true,
        );

        setCategoriesError(
          "",
        );

        try {
          const response =
            await axios.post<CategoriesApiResponse>(
              `${apiUrl}/categorieslist`,

              {},

              {
                signal:
                  controller.signal,

                headers: {
                  Accept:
                    "application/json",

                  "Content-Type":
                    "application/json",
                },
              },
            );

          if (
            !response.data
              .success ||
            !Array.isArray(
              response.data
                .data,
            )
          ) {
            throw new Error(
              response.data
                .message ||
                "Invalid categories response received.",
            );
          }

          /* =====================================
             ACTIVE PHOTO GALLERY CATEGORIES
          ===================================== */

          const activeCategories =
            response.data.data.filter(
              (
                category,
              ) =>
                category.status
                  ?.trim()
                  .toLowerCase() ===
                  "active" &&
                category.module
                  ?.trim()
                  .toLowerCase() ===
                  "photo_gallery",
            );

          if (
            controller.signal
              .aborted
          ) {
            return;
          }

          setCategories(
            activeCategories,
          );

          /* =====================================
             SELECT FIRST CATEGORY DEFAULT
          ===================================== */

          setActiveCategoryId(
            (
              currentCategoryId,
            ) => {
              const selectedCategoryStillExists =
                activeCategories.some(
                  (
                    category,
                  ) =>
                    category.id ===
                    currentCategoryId,
                );

              if (
                selectedCategoryStillExists
              ) {
                return currentCategoryId;
              }

              return (
                activeCategories[0]
                  ?.id ??
                null
              );
            },
          );
        } catch (
          error: unknown
        ) {
          if (
            controller.signal
              .aborted ||
            (
              axios.isAxiosError(
                error,
              ) &&
              error.code ===
                "ERR_CANCELED"
            )
          ) {
            return;
          }

          setCategories([]);

          setActiveCategoryId(
            null,
          );

          /*
           * Error hoy to counters pan 0.
           */

          setHomeData({
            ...EMPTY_HOME_DATA,

            count: {
              ...EMPTY_COUNT_DATA,
            },
          });

          setCategoriesError(
            getApiErrorMessage(
              error,

              "Unable to load project categories.",
            ),
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setCategoriesLoading(
              false,
            );
          }
        }
      },

      [],
    );

  /* =======================================================
     FETCH HOME DATA
  ======================================================= */

  const fetchHomeData =
    useCallback(
      async (
        categoryId: number,
      ) => {
        homeAbortController
          .current?.abort();

        const controller =
          new AbortController();

        homeAbortController.current =
          controller;

        setHomeDataLoading(
          true,
        );

        setHomeDataError(
          "",
        );

        /*
         * Loading time default
         * counters 0.
         */

        setHomeData({
          ...EMPTY_HOME_DATA,

          count: {
            ...EMPTY_COUNT_DATA,
          },
        });

        try {
          const response =
            await axios.post<HomeApiResponse>(
              `${apiUrl}/home`,

              {
                category_id:
                  String(
                    categoryId,
                  ),
              },

              {
                signal:
                  controller.signal,

                headers: {
                  Accept:
                    "application/json",

                  "Content-Type":
                    "application/json",
                },
              },
            );

          if (
            !response.data
              .success ||
            !response.data.data
          ) {
            throw new Error(
              response.data
                .message ||
                "Invalid home data response received.",
            );
          }

          const apiData =
            response.data.data;

          /* =====================================
             NORMALIZED HOME DATA
          ===================================== */

          const normalizedData: HomeApiData =
            {
              photo_gallery:
                Array.isArray(
                  apiData.photo_gallery,
                )
                  ? apiData.photo_gallery
                  : [],

              testimonials:
                Array.isArray(
                  apiData.testimonials,
                )
                  ? apiData.testimonials
                  : [],

              blogs:
                Array.isArray(
                  apiData.blogs,
                )
                  ? apiData.blogs
                  : [],

              /* =================================
                 DYNAMIC COUNTERS

                 null => 0
                 undefined => 0
                 invalid => 0
              ================================= */

              count: {
                projects_counts:
                  normalizeCount(
                    apiData.count
                      ?.projects_counts,
                  ),

                clients_count:
                  normalizeCount(
                    apiData.count
                      ?.clients_count,
                  ),

                experience_count:
                  normalizeCount(
                    apiData.count
                      ?.experience_count,
                  ),

                cities_count:
                  normalizeCount(
                    apiData.count
                      ?.cities_count,
                  ),
              },
            };

          if (
            controller.signal
              .aborted
          ) {
            return;
          }

          setHomeData(
            normalizedData,
          );
        } catch (
          error: unknown
        ) {
          if (
            controller.signal
              .aborted ||
            (
              axios.isAxiosError(
                error,
              ) &&
              error.code ===
                "ERR_CANCELED"
            )
          ) {
            return;
          }

          /*
           * API error =
           * counters default 0.
           */

          setHomeData({
            ...EMPTY_HOME_DATA,

            count: {
              ...EMPTY_COUNT_DATA,
            },
          });

          setHomeDataError(
            getApiErrorMessage(
              error,

              "Unable to load category-wise home data.",
            ),
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setHomeDataLoading(
              false,
            );
          }
        }
      },

      [],
    );

  /* =======================================================
     LOAD CATEGORIES
  ======================================================= */

  useEffect(() => {
    void fetchCategories();

    return () => {
      categoriesAbortController
        .current?.abort();

      homeAbortController
        .current?.abort();
    };
  }, [
    fetchCategories,
  ]);

  /* =======================================================
     LOAD HOME DATA
  ======================================================= */

  useEffect(() => {
    if (
      activeCategoryId ===
      null
    ) {
      setHomeData({
        ...EMPTY_HOME_DATA,

        count: {
          ...EMPTY_COUNT_DATA,
        },
      });

      return;
    }

    void fetchHomeData(
      activeCategoryId,
    );
  }, [
    activeCategoryId,
    fetchHomeData,
  ]);

  /* =======================================================
     ACTIVE CATEGORY
  ======================================================= */

  const activeCategory =
    useMemo(
      () =>
        categories.find(
          (
            category,
          ) =>
            category.id ===
            activeCategoryId,
        ) ??
        null,

      [
        activeCategoryId,
        categories,
      ],
    );

  /* =======================================================
     SELECT CATEGORY
  ======================================================= */

  const selectCategory =
    useCallback(
      (
        categoryId: number,
      ) => {
        const categoryExists =
          categories.some(
            (
              category,
            ) =>
              category.id ===
              categoryId,
          );

        if (
          !categoryExists ||
          categoryId ===
            activeCategoryId
        ) {
          return;
        }

        setActiveCategoryId(
          categoryId,
        );
      },

      [
        activeCategoryId,
        categories,
      ],
    );

  /* =======================================================
     RETRY CATEGORIES
  ======================================================= */

  const retryCategories =
    useCallback(
      async () => {
        await fetchCategories();
      },

      [
        fetchCategories,
      ],
    );

  /* =======================================================
     RETRY HOME
  ======================================================= */

  const retryHomeData =
    useCallback(
      async () => {
        if (
          activeCategoryId ===
          null
        ) {
          return;
        }

        await fetchHomeData(
          activeCategoryId,
        );
      },

      [
        activeCategoryId,
        fetchHomeData,
      ],
    );

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value =
    useMemo<HomeDataContextValue>(
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
    <HomeDataContext.Provider
      value={value}
    >
      {children}
    </HomeDataContext.Provider>
  );
}

/* =========================================================
   USE HOME DATA
========================================================= */

export function useHomeData(): HomeDataContextValue {
  const context =
    useContext(
      HomeDataContext,
    );

  if (!context) {
    throw new Error(
      "useHomeData must be used inside HomeDataProvider.",
    );
  }

  return context;
}