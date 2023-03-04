import axiosInstance from "./axiosInstance";
import { auth } from "./axiosInstance";

class Queries {
    getLeads() {
        return axiosInstance.get(
            "api/v4/leads",
            { headers: auth() }
        );
    }

    getPipelineByID(id: string) {
        return axiosInstance.get(
            `api/v4/leads/pipelines/${id}`,
            { headers: auth() }
        );
    }

    postUpdateTokenResponse(body) {
        return axiosInstance.post(
            `oauth2/access_token`,
            body,
            { headers: auth() }
        );
    }
}

export default new Queries();
