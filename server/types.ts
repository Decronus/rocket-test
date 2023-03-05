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
    key: number,
    created_at: string,
    pipeline_id: number,
    contact_name: string,
    contact_id: number,
    contact_phone: string,
    contact_mail: string,
    lead_name: string,
    price: string,
    responsible_user_id: number,
    responsible_user_name: string,
    status_id: number,
    status_name: string,
    status_color: string,
};
