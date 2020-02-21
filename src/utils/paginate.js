import _ from "lodash";

export function paginate(items, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return _(items)
    .slice(startIndex)
    .take(itemsPerPage)
    .value();
}

export function filterMovies(movies, noFilterToken, filter) {
  if (noFilterToken === filter) {
    return movies;
  }
  return movies.filter(item => item.genre.name === filter);
}
