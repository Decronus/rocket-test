import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { tokens, updateTokens } from "firebase";
import { Tokens, UpdateTokensBody, MainDataElement } from "interfaces";
import Queries from './queries.service'

@Injectable()
export class AppService {
    async getMainData() {
        let mainData: Array<any> = []

        const leads: AxiosResponse = await Queries.getLeads();

        if (leads.status !== 401 && leads.statusText === "OK") {

            leads.data._embedded.leads.forEach((lead: any) => {
                let leadObj: MainDataElement = {
                    name: lead.name,
                    price: lead.price,
                    pipeline_id: lead.pipeline_id,
                    responsible_user_id: lead.responsible_user_id,
                    responsible_user_name: null,
                    status_id: lead.status_id,
                    status_name: null,
                    status_color: null
                }

                mainData.push(leadObj);
            })

            const pipeline: AxiosResponse = await Queries.getPipelineByID(mainData[0].pipeline_id);
            mainData.forEach((lead) => {
               const leadStatus = pipeline.data._embedded.statuses.find((status: any) => {
                    return status.id === lead.status_id
                });
                mainData[mainData.indexOf(lead)].status_name = leadStatus.name;
                mainData[mainData.indexOf(lead)].status_color = leadStatus.color;
            })

            const users: AxiosResponse  = await Queries.getUsers();
            mainData.forEach((lead) => {
                const responsibleUser = users.data._embedded.users.find((user: any) => {
                     return user.id === lead.responsible_user_id
                 });
                 mainData[mainData.indexOf(lead)].responsible_user_name = responsibleUser.name;
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
