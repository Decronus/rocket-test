export interface Tokens {
    access_token: string,
    refresh_token: string
};

export interface UpdateTokensBody {
    client_id: string,
    client_secret: string,
    grant_type: string,
    refresh_token: string,
    redirect_uri: string
};

export interface MainDataElement {
    created_at: string,
    pipeline_id: number,
    contact_id: number,
    lead_name: string,
    price: number,
    responsible_user_id: number,
    responsible_user_name: string,
    status_id: number,
    status_name: string,
    status_color: string,
};
