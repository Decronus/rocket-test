import { Injectable } from "@nestjs/common";
import { tokens, updateTokens } from "firebase";
import { Tokens, UpdateTokensBody } from "interfaces";
import Queries from './queries.service'

@Injectable()
export class AppService {
    async getMainData() {
        // let leads: object = {}

        const leads = await Queries.getLeads()

        // console.log("leads.status", leads.status);

        return leads.data;

        // const leads: Response = await fetch(process.env.AMO_API_URL + "api/v4/leads", {
        //     headers: {
        //         Authorization: `Bearer ${tokens.access_token}`
        //         }
        //     });
        // const leadsJson = await leads.json()

        // if (leads.status !== 401 && leads.ok) {
        //     // return leads.ok ? leads.json() : `Response error: ${leads.status}`;
        //     leadsJson._embedded.leads.forEach((lead) => {
        //         let leadObj = {
        //             name: null,
        //             price: null,
        //             responsible_user_id: null,
        //             status_name: null,
        //             status_color: null
        //         }

        //         leadObj.name = lead.name;
        //         leadObj.price = lead.price;
        //         leadObj.responsible_user_id = lead.responsible_user_id;

        //         mainData.push(leadObj);

        //         console.log(mainData)
        //     })

        //     const pipeline: Response = await fetch(process.env.AMO_API_URL + "api/v4/leads/pipelines/6531006", {
        //         headers: {
        //             Authorization: `Bearer ${tokens.access_token}`
        //             }
        //         });
        //     const pipelineJson = await pipeline.json();
        //     console.log("pipelineJson", pipelineJson)

        //     pipelineJson._embedded.statuses.forEach(status => {
        //         const index: number = pipelineJson._embedded.statuses.indexOf(status)
        //         console.log(index)
        //         console.log("mainData[index]", mainData[index])
        //         mainData[0].status_name = status.name;
        //         mainData[0].status_color = status.color;
        //     })

        //     return mainData;
        // } else {

        //     const body: UpdateTokensBody = {
        //         client_id: "b9859249-ccaf-4197-8eb6-d26d42140026",
        //         client_secret: "Ujq1NhZSQJFh9ZIanee1ai1Mvd3ewZ4uMgon6r0yHRONEqkraDqXJQCqCgzMRE5s",
        //         grant_type: "refresh_token",
        //         refresh_token: `${tokens.refresh_token}`,
        //         redirect_uri: "https://localhost.com"
        //     };
        //     const updateTokensResponse: Response = await fetch(process.env.AMO_API_URL + "oauth2/access_token", {
        //         method: "POST",
        //         headers: {
        //             Authorization: `Bearer ${tokens.access_token}`,
        //             "Content-Type": 'application/json'
        //             },
        //         body: JSON.stringify(body)
        //     });

        //     if (updateTokensResponse.ok) {
        //         const tokensResponseJson: Tokens = await updateTokensResponse.json();
        //         updateTokens(tokensResponseJson.access_token, tokensResponseJson.refresh_token);

        //         const leads: Response = await fetch(process.env.AMO_API_URL + "api/v4/leads", {
        //                 headers: {
        //                     Authorization: `Bearer ${tokens.access_token}`
        //                     }
        //                 });

        //         return leads.ok ? leads.json() : `Response error: ${leads.status}`;

        //     }
        // }

    }
}
