
export interface AnnouncementDetails {
    title: string
    category: number
    condition: string
    currency: string
    datePosted: Date
    price: number
    description: string
    picture: string

    user_email: string;
    first_name: string;
    last_name?: string;
    bio?: string;
    phone_number?: string;
    country?: string;
    city?: string;
    address?: string;
}