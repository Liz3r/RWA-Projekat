export interface Announcement{
    id: number
    title: string
    category: number
    condition: string
    currency: string
    datePosted: Date
    price: number
    userId: number
    description: string
    picture: string
    page?: number
}
