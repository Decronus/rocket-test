import { Injectable } from "@nestjs/common";
import { tokens, database } from "firebase";
import { ref, set } from "firebase/database";

interface Tokens {
    access_token: string;
    refresh_token: string;
}

@Injectable()
export class AppService {
    async getLeads() {
        const leads = await fetch(process.env.AMO_API_URL + "api/v4/leads", {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
                }
            })

        if (leads.status === 401) {
            return leads.ok ? leads.json() : `Response error: ${leads.status}`
        } else {
            const body = {
                client_id: "b9859249-ccaf-4197-8eb6-d26d42140026",
                client_secret: "Ujq1NhZSQJFh9ZIanee1ai1Mvd3ewZ4uMgon6r0yHRONEqkraDqXJQCqCgzMRE5s",
                grant_type: "refresh_token",
                refresh_token: `${tokens.refresh_token}`,
                redirect_uri: "https://localhost.com"

            }
            const updateTokensResponse = await fetch(process.env.AMO_API_URL + "oauth2/access_token", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                    "Content-Type": 'application/json'
                    },
                body: JSON.stringify(body)
            })

            const tokensResponseJson: Tokens = await updateTokensResponse.json()
            console.log('body', updateTokensResponse);

            if (updateTokensResponse.ok) {
                set(ref(database, '/'), {
                    access_token: tokensResponseJson.access_token,
                    refresh_token: tokensResponseJson.refresh_token
                })
                .then(() => {
                    fetch(process.env.AMO_API_URL + "api/v4/leads", {
                        headers: {
                            Authorization: `Bearer ${tokensResponseJson.access_token}`
                            }
                        })

                    if (leads.status !== 401) {
                        return leads.ok ? leads.json() : `Response error: ${leads.status}`
                    }
                })
                .catch((error) => {
                // The write failed...
                });
            }
        }

    }
}
