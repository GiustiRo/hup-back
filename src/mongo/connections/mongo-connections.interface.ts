export enum MONGO_DATABASE {
    MAIN = 'hupDB',
}

export enum MONGO_CONNECTIONS {
    USERS = 'users',
    PLANTS = 'plants'
}

export const MONGO_CREDS = { // Should be treated as secrets/env variables.
    user: 'admin',
    pwd: 'admin'
}