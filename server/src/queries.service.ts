import axiosInstance from "./axiosInstance";
import { auth } from "./axiosInstance";

class Queries {
    getLeads() {
        return axiosInstance.get("api/v4/leads", {
            headers: auth(),
        });
    }

    // getAllCourseLessons(id) {
    //     return axiosIns.get(`courses/${id}/lessons/`, {
    //         headers: auth(),
    //     });
    // }

    // getLessonById(lesson_id) {
    //     return axiosIns.get(`courses/lesson/${lesson_id}`, {
    //         headers: auth(),
    //     });
    // }

    // getCourseById(id) {
    //     return axiosIns.get(`courses/${id}`, {
    //         headers: auth(),
    //     });
    // }

    // postAddToWishlist(body) {
    //     return axiosIns.post(
    //         "courses/wishlist/add/",
    //         body,
    //         {headers: auth()}
    //     );
    // }

    // postDeleteFromWishlist(body) {
    //     return axiosIns.post(
    //         "courses/wishlist/delete/",
    //         body,
    //         {headers: auth()}
    //     );
    // }

    // postAddLike(body) {
    //     return axiosIns.post(
    //         "courses/like/add/",
    //         body,
    //         {headers: auth()}
    //     );
    // }

    // postDeleteLike(body) {
    //     return axiosIns.post(
    //         "courses/like/delete/",
    //         body,
    //         {headers: auth()}
    //     );
    // }

}

export default new Queries();
