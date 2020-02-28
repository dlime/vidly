import httpService from "./httpService";

const apiEndpoint = "/movies";

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
  const movieWithoutId = { ...movie };
  delete movieWithoutId._id;

  // New movies have empty _id
  if (movie._id === "") {
    return httpService.post(apiEndpoint, movieWithoutId);
  }

  return httpService.put(toMovieUrl(movie._id), movieWithoutId);
}
