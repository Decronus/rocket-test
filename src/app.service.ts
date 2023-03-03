import { Injectable } from "@nestjs/common";
import { tokens, updateTokens } from "firebase";
import { Tokens, UpdateTokensBody } from "interfaces";

@Injectable()
export class AppService {
    async getLeads() {
        const leads: Response = await fetch(process.env.AMO_API_URL + "api/v4/leads", {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
                }
            });

        if (leads.status !== 401) {
            return leads.ok ? leads.json() : `Response error: ${leads.status}`;
        } else {

            const body: UpdateTokensBody = {
                client_id: "b9859249-ccaf-4197-8eb6-d26d42140026",
                client_secret: "Ujq1NhZSQJFh9ZIanee1ai1Mvd3ewZ4uMgon6r0yHRONEqkraDqXJQCqCgzMRE5s",
                grant_type: "refresh_token",
                refresh_token: `${tokens.refresh_token}`,
                redirect_uri: "https://localhost.com"
            };
            const updateTokensResponse: Response = await fetch(process.env.AMO_API_URL + "oauth2/access_token", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                    "Content-Type": 'application/json'
                    },
                body: JSON.stringify(body)
            });

            if (updateTokensResponse.ok) {
                const tokensResponseJson: Tokens = await updateTokensResponse.json();
                updateTokens(tokensResponseJson.access_token, tokensResponseJson.refresh_token);

                const leads = await fetch(process.env.AMO_API_URL + "api/v4/leads", {
                        headers: {
                            Authorization: `Bearer ${tokensResponseJson.access_token}`
                            }
                        });

                return leads.ok ? leads.json() : `Response error: ${leads.status}`;

            }
        }

    }
}
