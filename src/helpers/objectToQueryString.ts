const objectToQueryString = (obj: { [key: string]: any }): string => {
    const params = new URLSearchParams();
    for (const key in obj) {
      params.append(key, obj[key]);
    }
    return params.toString();
  };
  
  export default objectToQueryString;