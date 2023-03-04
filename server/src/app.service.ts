import { Injectable } from "@nestjs/common";
import { tokens, updateTokens } from "firebase";
import { Tokens, UpdateTokensBody } from "interfaces";
import Queries from './queries.service'

@Injectable()
export class AppService {
    async getMainData() {
        let mainData: any[] = []

        const leads = await Queries.getLeads();

        if (leads.status !== 401 && leads.statusText === "OK") {

            leads.data._embedded.leads.forEach((lead) => {
                let leadObj = {
                    name: null,
                    price: null,
                    responsible_user_id: null,
                    status_name: null,
                    status_color: null
                }

                leadObj.name = lead.name;
                leadObj.price = lead.price;
                leadObj.responsible_user_id = lead.responsible_user_id;

                mainData.push(leadObj);

                console.log(mainData)
            })

            const pipeline = await Queries.getPipelineByID("6531006")

            pipeline.data._embedded.statuses.forEach(status => {
                const index: number = pipeline.data._embedded.statuses.indexOf(status)
                console.log('pipelinedata', status)
                console.log(typeof index)
                console.log("mainData", mainData)
                console.log("mainData[index]", mainData[index])
                console.log("mainData[0]", mainData[0])
                mainData[0].status_name = status.name;
                mainData[0].status_color = status.color;
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
            const updateTokensResponse = await Queries.postUpdateTokenResponse(body);

            if (updateTokensResponse.statusText === "OK") {
                updateTokens(updateTokensResponse.data.access_token, updateTokensResponse.data.refresh_token);

                const leads = await Queries.getLeads();

                return leads.data;
            }
        }
    }
}
