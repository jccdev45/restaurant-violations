import axios from "redaxios";

import { isRedaxiosError } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import type {
  SingleRestaurantResponse,
  RestaurantListResponse,
  RestaurantInfo,
  RestaurantWithInspections,
  Violation,
  FullInspectionData,
} from "@/types/restaurant-types";
const BASE_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

export const fetchRestaurants = createServerFn({ method: "GET" }).handler(
  async (): Promise<RestaurantListResponse> => {
    console.info("Fetching restaurants...");
    try {
      const response = await axios.get<any[]>(BASE_URL, {
        headers: {
          Accept: "application/json",
          "X-App-Token": process.env.RESTAURANT_API_APP_TOKEN!,
        },
      });

      const restaurants: RestaurantInfo[] = response.data.map((item: any) => ({
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
      }));

      return { restaurants };
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
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
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Accept: "application/json",
          "X-App-Token": process.env.RESTAURANT_API_APP_TOKEN!,
        },
        params: { camis },
      });

      if (response.data.length === 0) {
        throw notFound();
      }

      const restaurantData = response.data.reduce(
        (acc: RestaurantWithInspections, item: any) => {
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

          const existingInspection = acc.inspections.find(
            (insp) => insp.inspection_date === inspection.inspection_date
          );

          if (existingInspection) {
            existingInspection.violations.push(violation);
          } else {
            acc.inspections.push(inspection);
          }

          return acc;
        },
        {} as RestaurantWithInspections
      );

      return { restaurant: restaurantData };
    } catch (error) {
      console.error(`Error fetching restaurant with CAMIS ${camis}:`, error);
      if (isRedaxiosError(error) && error.response?.status === 404) {
        throw notFound();
      }
      throw error;
    }
  });

export const restaurantQueryOptions = (camis: string) =>
  queryOptions({
    queryKey: ["restaurant", camis],
    queryFn: () => fetchRestaurant({ data: camis }),
  });
