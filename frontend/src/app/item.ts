export interface Item {
    _id?: string;
    name: string;
    url: string;
    img?: string;
    oldImg?: string;
    newImg?: string;
    manufacturer: string;
    price: number;
    comments: Array<any>;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
}
