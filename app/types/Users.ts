
export interface User {
    id: number;
    name: string;
    email: string;
    is_admin?: boolean;
    roles: string[];
    permissions: string[];
    email_verified_at?: string;
    created_at: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface RegisterResponse {
    message: string;
    access_token: string;
    token_type: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    aceitou_termos: boolean;
}