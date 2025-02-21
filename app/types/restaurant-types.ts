// Base restaurant information
export interface RestaurantInfo {
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
interface InspectionDetails {
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
export interface RestaurantWithInspections extends RestaurantInfo {
  inspections: FullInspectionData[];
}

// API response for list of restaurants
export interface RestaurantListResponse {
  restaurants: RestaurantInfo[];
  // Add pagination info if applicable
}

// API response for a single restaurant with all inspections
export interface SingleRestaurantResponse {
  restaurant: RestaurantWithInspections;
}

// API response for a single inspection
export interface SingleInspectionResponse {
  restaurant: RestaurantInfo;
  inspection: FullInspectionData;
}
