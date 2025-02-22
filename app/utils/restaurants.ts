import { generateInspectionId, isRedaxiosError } from "@/lib/utils";
import type {
  FullInspectionData,
  Restaurant,
  RestaurantListResponse,
  SingleRestaurantResponse,
  Violation,
} from "@/types/restaurant-types";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import axios from "redaxios";

const BASE_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

function transformRestaurantData(data: any[]): Restaurant[] {
  const restaurantsMap = data.reduce<Record<string, Restaurant>>(
    (acc, item) => {
      if (!acc[item.camis]) {
        acc[item.camis] = {
          camis: item.camis,
          dba: item.dba,
          boro: item.boro,
          building: item.building,
          street: item.street,
          zipcode: item.zipcode,
          phone: item.phone,
          cuisine_description: item.cuisine_description,
          latitude: item.latitude,
          longitude: item.longitude,
          community_board: item.community_board,
          council_district: item.council_district,
          census_tract: item.census_tract,
          bin: item.bin,
          bbl: item.bbl,
          nta: item.nta,
          inspections: [],
        };
      }

      if (item.inspection_date !== "1900-01-01T00:00:00.000") {
        const violation: Violation = {
          violation_code: item.violation_code,
          violation_description: item.violation_description,
          critical_flag: item.critical_flag,
        };

        // Find an existing inspection with the same date
        const existingInspection = acc[item.camis].inspections.find(
          (insp) => insp.inspection_date === item.inspection_date
        );

        if (existingInspection) {
          // If an inspection with the same date exists, add the violation to it
          existingInspection.violations.push(violation);
        } else {
          // Otherwise, create a new inspection
          const inspection: FullInspectionData = {
            inspectionId: generateInspectionId(
              item.camis,
              item.inspection_date
            ),
            inspection_date: item.inspection_date,
            action: item.action,
            critical_flag: item.critical_flag,
            score: item.score,
            grade: item.grade,
            grade_date: item.grade_date,
            inspection_type: item.inspection_type,
            violations: [violation],
          };

          acc[item.camis].inspections.push(inspection);
        }
      }

      return acc;
    },
    {}
  );

  return Object.values(restaurantsMap);
}

const fetchData = async <T>(params: Record<string, string>): Promise<T> => {
  try {
    const response = await axios.get<T>(BASE_URL, {
      headers: {
        Accept: "application/json",
        "X-App-Token": process.env.RESTAURANT_API_APP_TOKEN!,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (isRedaxiosError(error) && error.response?.status === 404) {
      throw notFound();
    }
    throw error;
  }
};

export const fetchRestaurants = createServerFn({ method: "GET" }).handler(
  async (): Promise<RestaurantListResponse> => {
    console.info("Fetching restaurants...");
    const params = {
      // $limit: "500",
      $order: "inspection_date DESC", // Get the latest inspection first
    };
    const data = await fetchData<any[]>(params);

    const restaurants = transformRestaurantData(data);

    return { restaurants };
  }
);

export const restaurantsQueryOptions = () =>
  queryOptions({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants(),
  });

export const fetchRestaurant = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data: camis }): Promise<SingleRestaurantResponse> => {
    console.info(`Fetching restaurant with CAMIS ${camis}`);
    const data = await fetchData<any[]>({ camis });

    if (data.length === 0) {
      throw notFound();
    }

    const [restaurant] = transformRestaurantData(data);

    return { restaurant };
  });

export const restaurantQueryOptions = (camis: string) =>
  queryOptions({
    queryKey: ["restaurant", camis],
    queryFn: () => fetchRestaurant({ data: camis }),
  });
