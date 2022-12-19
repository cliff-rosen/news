const prod = {
  url: {
    //API_URL: "https://api-staging.trippersalmanac.com",
    API_URL: "https://api.trippersalmanac.com",
  },
};

const dev = {
  url: {
    API_URL: "http://192.168.1.108:4000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
