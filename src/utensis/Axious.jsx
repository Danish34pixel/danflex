import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZiYzI1NDczZWVkOGVhNTU2MDY5NWUzNjgyZDAwNyIsIm5iZiI6MTc0NDcxNDk4Ni40NTEsInN1YiI6IjY3ZmUzY2VhN2MyOWFlNWJjM2Q5OTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Y7TrWAseJf24IMmqkQDCze43jWFBT4pHXUP9Sgs5LI",
  },
});

export default api;
