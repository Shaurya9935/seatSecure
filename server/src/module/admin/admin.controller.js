import ApiResponse from "../../common/utils/api-response.js";
import * as adminService from "./admin.service.js";

const createShow = async (req, res) => {
  const result = await adminService.createShowService(req.body);
  ApiResponse.created(res, "Show scheduled successfully", result);
};

const getTheatres = async (req, res) => {
  const theatres = await adminService.getTheatresService();
  ApiResponse.ok(res, "Theatres fetched successfully", theatres);
};

const getScreens = async (req, res) => {
  const screens = await adminService.getScreensService();
  ApiResponse.ok(res, "Screens fetched successfully", screens);
};

const getShows = async (req, res) => {
  const shows = await adminService.getShowsService();
  ApiResponse.ok(res, "Shows fetched successfully", shows);
};

export {
  createShow,
  getTheatres,
  getScreens,
  getShows,
};
