export interface LoginRequestPayload {
    email: string;
    password: string;
}

export interface LoginResponsePayload {
    token: string;
}

export interface RegisterRequestPayload {
    firstName: string;
    lastName?: string;
    weight?: number;
    height?: number;
    user: {
        email: string;
        password: string;
    };
}
