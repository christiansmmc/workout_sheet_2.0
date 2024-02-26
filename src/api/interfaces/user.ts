export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  access_token: string;
}

export interface RegisterRequestPayload {
  email: string;
  password: string;
  client: {
    name: string;
    height: number;
    weight: number;
  };
}
