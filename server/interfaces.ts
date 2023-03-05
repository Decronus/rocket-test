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
    name: string,
    price: number,
    pipeline_id: number,
    responsible_user_id: number,
    responsible_user_name: string,
    status_id: number,
    status_name: string,
    status_color: string,
};
