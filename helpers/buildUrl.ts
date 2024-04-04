function buildUrl(baseUrl : string, endpoint :string, params = {}) {
    const url = `${baseUrl}${endpoint}`;
    const searchParams = new URLSearchParams();
  
    // Loop through each parameter key-value pair
    for (const [key, value] of Object.entries(params)) {
      // Check if value is defined before adding
      if (value !== undefined) {
        searchParams.append(key, value?.toString() || "");
      }
    }
  
    return url + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  }
  export default buildUrl;