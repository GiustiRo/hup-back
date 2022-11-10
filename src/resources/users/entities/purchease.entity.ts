import { iBillingAddress } from "./user.entity"

// PAYMENT USER
export interface iPaymentMethod {
    /* Modify as per payment services adopted. STRIPE??? */
    _id: any,
    cardNumber: number,
    cardBrand: string | "VISA" | "MASTER",
    cardType: string | "credit" | "debit",
    cvv: number,
    billingAddress: iBillingAddress
}


// PURCHEASE / ORDER USER
export interface iPurchease {
    _id?: any,
    purchease: {
        _id?: any,
        quantity: number,
        status: ePurcheaseStatus, // might be delivered separately
        last_update: string,
        product: Object // iPlant | iOtherProduct
    }[], // should be array of Plant | Other
    date_purchease: string,
    paymentMethod: iPaymentMethod,
    deliverMethod: eDeliverMethod,
    status: ePurcheaseStatus
}

export enum eDeliverMethod {
    // Analize: Track deliver status. No debería estar vinculado a la entidad de usuario. Al igual que la compra mientras esté activa
    DELIVER = "deliver",
    PICKUP = "pickup",
}

export enum ePurcheaseStatus {
    CANCELED = "canceled",
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    FINALIZED = "finalized",
    PICKUP = "pickup",
    PACKING = "packing",
    REFUSED = "refused"
}
