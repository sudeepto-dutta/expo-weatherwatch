import objectToQueryString from '../src/helpers/objectToQueryString';

describe('objectToQueryString', () => {
  it('converts an object to a query string', () => {
    const obj = {
      latitude: 51.50853,
      longitude: -0.12574,
    };

    const queryString = objectToQueryString(obj);

    expect(queryString).toBe('latitude=51.50853&longitude=-0.12574');
  });
});
