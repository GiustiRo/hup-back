import { iPaymentMethod, iPurchease } from "./purchease.entity";

export class User { }



export class iUser {
    _id?: any;
    created_at: string;
    email: string;
    email_verified: boolean;
    identities: iIdentitiesUser[];
    family_name: string;
    gender: string;
    given_name: string;
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
    last_ip: string;
    last_login: string;
    logins_count: number;
    app_metadata?: {
        [key: string]: any;
    };
    user_metadata?: {
        [key: string]: any;
    };
    custom_metadata?: Partial<iCustom_Metadata>;
    birthdate?: string;
}
export interface iUserHuerta extends iUser {
    req: boolean
}

export interface iCustom_Metadata {
    paymentMethods: iPaymentMethod[],
    shippingAddress: iShippingAddress[],
    purcheases: iPurchease[]
    [key: string]: any;
    // TODO: favoritos, reseñas, etc.

}

// AUTH0
interface iIdentitiesUser {
    connection: string | "Username-Password-Authentication",
    provider: string | "auth0",
    user_id: string,
    isSocial: boolean
}

// ADDRESS USER
export interface iAddressUser {
    _id?: any,
    street: string,
    doorNr: number,
    city: string,
    country: string,
    department: string,
    locality: string,
    postalCode: number
}

export interface iShippingAddress extends iAddressUser {

}

export interface iBillingAddress extends iAddressUser {

}