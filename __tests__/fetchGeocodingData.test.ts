import {fetchGeocodingData} from '../src/api/api';
import {GeocodingData} from '../src/types/GeocodingData';

jest.mock('node-fetch', () => {
  return jest.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              id: 1,
              name: 'Mumbai',
              latitude: 19.0759837,
              longitude: 72.8776559,
              country: 'India',
              country_code: 'IN',
              admin1: 'Maharashtra',
              admin2: 'Mumbai',
              timezone: 'Asia/Kolkata',
            },
          ],
        }),
    });
  });
});

describe('fetchGeocodingData', () => {
  it('should return geocoding data', async () => {
    const cityName = 'Mumbai';
    const expectedData: GeocodingData = {
      generationtime_ms: 0,
      results: [
        {
          admin1: 'Maharashtra',
          admin1_id: 1264418,
          country: 'India',
          country_code: 'IN',
          country_id: 1269750,
          elevation: 8,
          feature_code: 'PPLA',
          id: 1275339,
          latitude: 19.07283,
          longitude: 72.88261,
          name: 'Mumbai',
          population: 12691836,
          timezone: 'Asia/Kolkata',
        },
        {
          admin1: 'Maharashtra',
          admin1_id: 1264418,
          admin2: 'Mumbai Suburban',
          admin2_id: 1270836,
          country: 'India',
          country_code: 'IN',
          country_id: 1269750,
          elevation: 11,
          feature_code: 'AIRP',
          id: 6301032,
          latitude: 19.08869,
          longitude: 72.86792,
          name: 'Mumbai Airport',
          timezone: 'Asia/Kolkata',
        },
      ],
    };

    const data = await fetchGeocodingData(cityName);
    expect(data).toEqual(
      expect.objectContaining({
        results: expectedData.results,
      }),
    );
  });
});
