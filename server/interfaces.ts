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
