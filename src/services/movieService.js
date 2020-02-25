import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function toMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function getMovie(id) {
  return httpService.get(toMovieUrl(id));
}

export function deleteMovie(id) {
  return httpService.delete(toMovieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id !== "") {
    console.log(movie._id);
    const movieWithoutId = { ...movie };
    delete movieWithoutId._id;
    return httpService.put(toMovieUrl(movie._id), movieWithoutId);
  }

  const movieWithoutId = { ...movie };
  movieWithoutId._id = null;
  return httpService.post(apiEndpoint, movieWithoutId);
}
