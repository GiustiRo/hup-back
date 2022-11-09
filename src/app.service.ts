import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  private m2mAPI = {
    client_id: this.configService.get('auth.clientId_M2M'),
    client_secret: this.configService.get('auth.clientSecret_M2M'),
    audience: `${this.configService.get('auth.audience_MGMT_API')}/`,
    grant_type: "client_credentials",
    scope: 'read:users update:users'
  }

  /*After M2M authentication goes OK, accesToken will be part of a stream (right now I don't need expires_in, scopes..*/
  public accessToken$: BehaviorSubject<string> = new BehaviorSubject('non-authorized');

  constructor(
    private configService: ConfigService,
    private http: HttpService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  authenticate(): Observable<AxiosResponse> {
    return this.http.post(`https://${this.configService.get<string>('auth.domain')}/oauth/token`, this.m2mAPI)
    // .pipe(map((res: AxiosResponse<accessToken>) => {
    //   // At this point, if Auth goes OK, I need to store Access Token to reuse it along the API => Reused from Client side (avoid XXS attacks).
    //   // this.accessToken$.next(res.data.access_token);
    //   return res
    // })
  }

}