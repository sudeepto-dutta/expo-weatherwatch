export interface GeocodingData {
  results: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    country_code: string;
    admin1: string;
    admin2: string;
    timezone: string;
  }[];
}
