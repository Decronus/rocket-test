import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { tokens, updateTokens } from "firebase";
import { Tokens, UpdateTokensBody, MainDataElement } from "types";
import Queries from './queries.service'

@Injectable()
export class AppService {
    async getMainData() {
        let mainData: Array<any> = []

        const leads: AxiosResponse = await Queries.getLeads();

        if (leads.status !== 401 && leads.statusText === "OK") {

            leads.data._embedded.leads.forEach((lead: any) => {
                let leadObj: MainDataElement = {
                    created_at: new Date(lead.created_at * 1000).toLocaleDateString(),
                    pipeline_id: lead.pipeline_id,
                    contact_id: lead._embedded.contacts[0].id,
                    lead_name: lead.name,
                    price: lead.price,
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

             const contacts: AxiosResponse  = await Queries.getContacts();
             mainData.forEach((lead) => {
                const contact = contacts.data._embedded.contacts.find((contact_el: any) => {
                     return contact_el.id === lead.contact_id
                 });
                 mainData[mainData.indexOf(lead)].contact_name = contact.name;
                 mainData[mainData.indexOf(lead)].contact_phone = contact.custom_fields_values[0].values[0].value;
                 mainData[mainData.indexOf(lead)].contact_mail = contact.custom_fields_values[1].values[0].value;
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
