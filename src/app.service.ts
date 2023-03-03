import { Injectable } from "@nestjs/common";
import { getTokens } from '../firebase.js'

interface Tokens {
    access_token: string;
    refresh_token: string;
}

@Injectable()
export class AppService {
    async getLeads() {
        // const tokens = await getTokens();

        // setTimeout(() => {
        //     console.log('tokens', tokens);
        // }, 5000);


        const leads = await fetch(process.env.AMO_API_URL + "api/v4/leads", {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        })
        return leads.ok ? leads.json() : `Response error: ${leads.status}`;
    }
}
