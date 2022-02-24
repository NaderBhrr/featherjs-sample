export interface ISignupRequest {
    email: string;
    password: string;
}

export interface IUpdateIdentityRequest {
    email?: string;
    password?: string
}