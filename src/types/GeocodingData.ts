export interface GeocodingData {
  generationtime_ms?: number;
  results: {
    id: number;
    admin1_id?: number;
    admin2_id?: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    country_code?: string;
    country_id: number;
    elevation: number;
    feature_code?: string;
    population?: number;
    admin1: string;
    admin2?: string;
    timezone: string;
  }[];
}
