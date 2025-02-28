import type { restaurantSearchSchema } from "@/schema/restaurantSchema";
import type { z } from "zod";

// Base restaurant information
export interface RestaurantBase {
  camis: string;
  dba: string;
  boro: string;
  building: string;
  street: string;
  zipcode?: string;
  phone?: string;
  cuisine_description?: string;
  latitude?: string;
  longitude?: string;
  community_board?: string;
  council_district?: string;
  census_tract?: string;
  bin?: string;
  bbl?: string;
  nta?: string;
}

// Inspection details
export interface InspectionDetails {
  inspectionId: string;
  inspection_date: string;
  action?: string;
  critical_flag?: string;
  score?: number;
  grade?: string;
  grade_date?: string;
  inspection_type?: string;
}

// Violation information
export interface Violation {
  violation_code: string;
  violation_description: string;
  critical_flag: string;
}

// Full inspection data
export interface FullInspectionData extends InspectionDetails {
  violations: Violation[];
}

// Restaurant with all inspections
export interface Restaurant extends RestaurantBase {
  inspections: FullInspectionData[];
}

// API response for list of restaurants
export interface RestaurantListResponse {
  restaurants: Restaurant[];
}

// API response for a single restaurant with all inspections
export interface SingleRestaurantResponse {
  restaurant: Restaurant;
}

export type RestaurantSearchParams = Partial<
  z.infer<typeof restaurantSearchSchema>
>;
