import { UpdateTokensBody } from "types";
import axiosInstance from "./axiosInstance";
import { auth } from "./axiosInstance";

class Queries {
    getLeads() {
        return axiosInstance.get(
            "api/v4/leads?with=contacts",
            { headers: auth() }
        );
    }

    getPipelineByID(id: number) {
        return axiosInstance.get(
            `api/v4/leads/pipelines/${id}`,
            { headers: auth() }
        );
    }

    getUsers() {
        return axiosInstance.get(
            `/api/v4/users`,
            { headers: auth() }
        );
    }

    getContacts() {
        return axiosInstance.get(
            `/api/v4/contacts`,
            { headers: auth() }
        );
    }

    postUpdateTokenResponse(body: UpdateTokensBody) {
        return axiosInstance.post(
            `oauth2/access_token`,
            body,
            { headers: auth() }
        );
    }
}

export default new Queries();
