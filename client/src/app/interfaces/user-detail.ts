export interface UserDetails{
    id: number,
    name: string,
    email: string,
    //password_digest: string,
    bio?: string,
    website?: string,
    created_at?: string,
    updated_at: string,
    active: boolean,
}

export interface NewUserDetails {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    bio?: string, 
    website?: string,
}

export interface LoginDetails {
    email : string,
    password : string,
}
