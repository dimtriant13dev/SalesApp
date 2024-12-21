import { User } from "./user";

export interface Customer{
    id:string;
    position : number;
    firstName: string;
    lastName: string;
    title: string;
    vatNumber: string;
    phoneNumber:string;
    comments:string;
    appUser? :User;
}