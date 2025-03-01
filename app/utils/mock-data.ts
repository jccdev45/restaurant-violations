import type { HeroImage } from "@/types/hero-image";
import type { Restaurant } from "@/types/restaurant-types";

export const RESTAURANT_DATA: Restaurant[] = [
  {
    camis: "40423571",
    dba: "ARTUSO PASTRY SHOP",
    boro: "Bronx",
    building: "670",
    street: "EAST  187 STREET",
    zipcode: "10458",
    phone: "7183672515",
    cuisine_description: "Bakery Products/Desserts",
    latitude: "40.854310632862",
    longitude: "-73.885040241969",
    community_board: "206",
    council_district: "15",
    census_tract: "039100",
    bin: "2012519",
    bbl: "2030890031",
    nta: "BX06",
    inspections: [
      {
        inspectionId: "40423571-2024-09-08T00:00:00.000",
        inspection_date: "2024-09-08T00:00:00.000",
        action: "No violations were recorded at the time of this inspection.",
        critical_flag: "Not Applicable",
        score: 0,
        grade: "",
        grade_date: "",
        inspection_type: "Inter-Agency Task Force / Initial Inspection",
        violations: [
          {
            violation_code: "",
            violation_description: "",
            critical_flag: "Not Applicable",
          },
        ],
      },
    ],
  },
  {
    camis: "40567856",
    dba: "STARBUCKS",
    boro: "Queens",
    building: "6151",
    street: "188 STREET",
    zipcode: "11365",
    phone: "7182640658",
    cuisine_description: "Coffee/Tea",
    latitude: "40.73937721415",
    longitude: "-73.78575728482",
    community_board: "408",
    council_district: "23",
    census_tract: "134700",
    bin: "4444049",
    bbl: "4071170004",
    nta: "QN41",
    inspections: [
      {
        inspectionId: "40567856-2024-12-12T00:00:00.000",
        inspection_date: "2024-12-12T00:00:00.000",
        action: "No violations were recorded at the time of this inspection.",
        critical_flag: "Not Applicable",
        score: 0,
        grade: "A",
        grade_date: "2024-12-12T00:00:00.000",
        inspection_type: "Cycle Inspection / Re-inspection",
        violations: [
          {
            violation_code: "",
            violation_description: "",
            critical_flag: "Not Applicable",
          },
        ],
      },
    ],
  },
  {
    camis: "40535738",
    dba: "NEIL SIMON THEATRE",
    boro: "Manhattan",
    building: "250",
    street: "WEST   52 STREET",
    zipcode: "10019",
    phone: "2123544624",
    cuisine_description: "American",
    latitude: "40.763063073345",
    longitude: "-73.984091228514",
    community_board: "105",
    council_district: "03",
    census_tract: "013100",
    bin: "1024820",
    bbl: "1010230054",
    nta: "MN17",
    inspections: [
      {
        inspectionId: "40535738-2023-02-08T00:00:00.000",
        inspection_date: "2023-02-08T00:00:00.000",
        action: "No violations were recorded at the time of this inspection.",
        critical_flag: "Not Applicable",
        score: 0,
        grade: "A",
        grade_date: "2023-02-08T00:00:00.000",
        inspection_type: "Cycle Inspection / Initial Inspection",
        violations: [
          {
            violation_code: "",
            violation_description: "",
            critical_flag: "Not Applicable",
          },
        ],
      },
    ],
  },
];

export const HERO_IMAGES: HeroImage[] = [
  {
    src: "/images/chinatown.jpg",
    type: "image",
    alt: "Chinatown in the daytime, in Chinatown, Manhattan. Numerous signs are advertising the various Chinese businesses in the area. Photo by Wes Hicks.",
  },
  {
    src: "/images/cosmic-diner.jpg",
    type: "image",
    alt: "Cosmic Diner at night in Manhattan. A man with an umbrella is walking towards the restaurant. Photo by Luiz Guimaraes.",
  },
  {
    src: "/images/dallas-bbq.jpg",
    type: "image",
    alt: "Dallas BBQ at night in Chelsea, Manhattan. Diners are seen inside eating and drinking. Photo by Nathalia Segato.",
  },
  {
    src: "/images/nathans.jpg",
    type: "image",
    alt: "Nathan's Famous in the daytime at Coney Island, Brooklyn. Photo by Paulo Silva.",
  },
  {
    src: "/images/sidewalk-dining.jpg",
    type: "image",
    alt: "Nighttime sidewalk dining in Manhattan, with a view of the Empire State Building in the background. Photo by Megan Bucknall.",
  },
  {
    src: "/images/silver-diner.jpg",
    type: "image",
    alt: "The Empire Diner at night in Chelsea, Manhattan, NYC. Photographed in January, a sidewalk vestibule is seen in front of the entrance to insulate diners from the cold winter air. Photo by Lee Ball.",
  },
];
