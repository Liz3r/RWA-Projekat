export interface User{
    id: number;
    user_email: string;
    first_name: string;
    last_name?: string;
    bio?: string;
    phone_number?: string;
    country?: string;
    city?: string;
    address?: string;
}
