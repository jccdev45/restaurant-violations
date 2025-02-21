import { isRedaxiosError } from "@/lib/utils";
import type {
  FullInspectionData, Restaurant, RestaurantListResponse,
  SingleRestaurantResponse, Violation,
} from "@/types/restaurant-types";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import axios from "redaxios";

const BASE_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

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
      $limit: "500",
      $order: "inspection_date DESC", // Get the latest inspection first
    };
    const data = await fetchData<any[]>(params);

    const restaurants: Restaurant[] = data.map((item) => ({
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
      inspections: [
        {
          inspection_date: item.inspection_date,
          action: item.action,
          critical_flag: item.critical_flag,
          score: item.score,
          grade: item.grade,
          grade_date: item.grade_date,
          inspection_type: item.inspection_type,
          violations: item.violation_code
            ? [
                {
                  violation_code: item.violation_code,
                  violation_description: item.violation_description,
                  critical_flag: item.critical_flag,
                },
              ]
            : [],
        },
      ],
    }));

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

    const restaurantData: Restaurant = data.reduce<Restaurant>((acc, item) => {
      // Initialize the accumulator if it's empty
      if (!acc.camis) {
        acc = {
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

      const violation: Violation = {
        violation_code: item.violation_code,
        violation_description: item.violation_description,
        critical_flag: item.critical_flag,
      };

      const inspection: FullInspectionData = {
        inspection_date: item.inspection_date,
        action: item.action,
        critical_flag: item.critical_flag,
        score: item.score,
        grade: item.grade,
        grade_date: item.grade_date,
        inspection_type: item.inspection_type,
        violations: [violation],
      };

      // Find an existing inspection with the same date
      const existingInspection = acc.inspections.find(
        (insp) => insp.inspection_date === inspection.inspection_date
      );

      // If an inspection with the same date exists, add the violation to it
      if (existingInspection) {
        existingInspection.violations.push(violation);
      } else {
        // Otherwise, add the new inspection to the list
        acc.inspections.push(inspection);
      }

      return acc;
    }, {} as Restaurant); // Explicitly type the accumulator as `Restaurant`

    return { restaurant: restaurantData };
  });

export const restaurantQueryOptions = (camis: string) =>
  queryOptions({
    queryKey: ["restaurant", camis],
    queryFn: () => fetchRestaurant({ data: camis }),
  });
