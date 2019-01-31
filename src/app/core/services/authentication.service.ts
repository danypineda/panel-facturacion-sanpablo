import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaApi } from '../models/respuesta-api.model';
import { ApiRestService } from './api-rest.service';
import { TOKEN_KEY } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
    token = {
        refresh_token: 'refreshtokencode',
        exp: new Date((new Date().getDate() + 1)),
        access_token: {
            username: 'user',
            roles: ['Admin', 'RegisteredUser', 'Super User']
        }
    };

    tokenKey: string = TOKEN_KEY;

    constructor(
        private router: Router,
        private readonly apiRest: ApiRestService,
        private readonly jwtHelper: JwtHelperService,
    ) { }

    login(data) {

        this.apiRest.loginWeb(data).then(
            (res: RespuestaApi) => {
                switch (res.status) {
                    case 'ok':
                        this.setToken(res.response);
                        this.router.navigate(['admin', 'dashboard']);

                        break;
                    case 'fail':
                        console.log("Error Autenticación", res.response);
                        break;
                }
            },
            (err) => {
                console.error("loginWeb", err);
            }
        );

    }

    logout() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    getToken() {
        let local = localStorage.getItem(TOKEN_KEY);
        if (local) {
            return JSON.parse(local).token;
        } else {

            return local;
        }
    }

    setToken(token) {
        console.log("setToken", token);

        localStorage.setItem(this.tokenKey, JSON.stringify(token));
    }

    getAccessToken() {
        let local = localStorage.getItem(TOKEN_KEY);
        if (local) {
            return JSON.parse(local).token;
        } else {

            return local;
        }
    }

    isAuthenticated() {
        let token = this.getToken();
        console.log("prueba", this.jwtHelper.isTokenExpired(token));

        if (this.jwtHelper.isTokenExpired(token)) {
            return false;
        }
        else {
            return true;
        }
    }

    refreshToken() {
        this.token.exp = new Date((new Date().getDate() + 1));
        this.setToken(this.token);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

}
