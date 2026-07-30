import ApiResponse from "../../common/utils/api-response.js"
import * as movieService from "./movie.service.js";


const searchMovies = async(req, res) => {
    const { q } = req.query
    const data = await movieService.search(q)
    ApiResponse.ok(res, "search movie route working", data)
}

export { searchMovies }