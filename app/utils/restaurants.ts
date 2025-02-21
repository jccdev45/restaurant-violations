import axios from "redaxios";

import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const BASE_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

export const fetchRestaurants = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching restaurants...");
    return axios
      .get(BASE_URL, {
        headers: {
          Accept: "application/json",
          "X-App-Token": process.env.RESTAURANT_API_APP_TOKEN!,
        },
      })
      .then((r) => r.data.slice(0, 10));
  }
);

export const restaurantsQueryOptions = () =>
  queryOptions({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants(),
  });

export const fetchRestaurant = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching restaurant with id ${data}`);
    const RESTAURANT_QUERY_PARAMS = {
      camis: data,
    };
    const restaurant = await axios
      .get(BASE_URL, {
        headers: {
          Accept: "application/json",
          "X-App-Token": process.env.RESTAURANT_API_APP_TOKEN!,
        },
        params: RESTAURANT_QUERY_PARAMS,
      })
      .then((r) => r.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });

    return restaurant;
  });

export const restaurantQueryOptions = (restaurantId: string) =>
  queryOptions({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => fetchRestaurant({ data: restaurantId }),
  });
