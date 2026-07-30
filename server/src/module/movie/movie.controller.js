import ApiResponse from "../../common/utils/api-response.js"
import * as movieService from "./movie.service.js";


const searchMovies = async(req, res) => {
    const { q } = req.query
    const data = await movieService.search(q)
    ApiResponse.ok(res, "Movie Searched Successfully", data)
}

const searchDetails = async(req, res) => {
    const { imdbId } = req.params
    const data = await movieService.detail(imdbId)
    ApiResponse.ok(res, "Movie details", data)
}

const searchShows = async(req, res) => {
    const {imdbId} = req.params
    const data = await movieService.shows(imdbId)
    ApiResponse.ok(res, "Show Details", data)
}
export { searchMovies, searchDetails }