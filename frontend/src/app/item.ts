export interface Item {
    _id?: string;
    name: string;
    url: string;
    img?: string;
    oldImg?: string;
    newImg?: string;
    manufacturer: string;
    price: number;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
}
