// import { AuthGuard } from '@nestjs/passport';

import { CanActivate } from '@nestjs/common';
import { Type } from '@nestjs/passport/dist/interfaces/index';
import { IAuthModuleOptions } from '@nestjs/passport/dist/interfaces/auth-module.options';
export declare type IAuthGuard = CanActivate & {
    logIn<TRequest extends {
        logIn: Function;
    } = any>(request: TRequest): Promise<void>;
    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser;
    getAuthenticateOptions(context: any): IAuthModuleOptions | undefined;
};
export declare const AuthGuard_M2M: (type?: string | string[]) => Type<IAuthGuard>;
export declare const AuthGuard_AUTH: (type?: string | string[]) => Type<IAuthGuard>;

