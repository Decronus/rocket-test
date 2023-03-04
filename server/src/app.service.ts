import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { tokens, updateTokens } from "firebase";
import { Tokens, UpdateTokensBody } from "interfaces";
import Queries from './queries.service'

@Injectable()
export class AppService {
    async getMainData() {
        let mainData: any[] = []

        const leads: AxiosResponse = await Queries.getLeads();

        if (leads.status !== 401 && leads.statusText === "OK") {

            leads.data._embedded.leads.forEach((lead) => {
                let leadObj = {
                    name: null,
                    price: null,
                    responsible_user_id: null,
                    status_id: null,
                    status_name: null,
                    status_color: null
                }

                leadObj.name = lead.name;
                leadObj.price = lead.price;
                leadObj.responsible_user_id = lead.responsible_user_id;
                leadObj.status_id = lead.status_id;

                mainData.push(leadObj);

                console.log(mainData)
            })

            const pipeline: AxiosResponse = await Queries.getPipelineByID("6531006")

            mainData.forEach((lead) => {
               const leadStatus = pipeline.data._embedded.statuses.find((status) => {
                    return status.id === lead.status_id
                })
                // console.log("lead", lead)
                // console.log("leadStatus", leadStatus);
                // console.log("mainData[lead]", mainData[mainData.indexOf(lead)]);
                mainData[mainData.indexOf(lead)].status_name = leadStatus.name;
                mainData[mainData.indexOf(lead)].status_color = leadStatus.color;
            })

            return mainData;
        } else {

            const body: UpdateTokensBody = {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: `${tokens.refresh_token}`,
                redirect_uri: "https://localhost.com"
            };
            const updateTokensResponse: AxiosResponse = await Queries.postUpdateTokenResponse(body);

            if (updateTokensResponse.statusText === "OK") {
                updateTokens(updateTokensResponse.data.access_token, updateTokensResponse.data.refresh_token);

                const leads = await Queries.getLeads();

                return leads.data;
            }
        }
    }
}
