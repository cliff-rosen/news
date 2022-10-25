const prod = {
  url: {
    API_URL: "http://ec2-54-208-253-109.compute-1.amazonaws.com:4000",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:4000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
