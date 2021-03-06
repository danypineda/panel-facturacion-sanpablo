import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { TOKEN_KEY } from '../../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';

export function tokenGetter() {
    let local = localStorage.getItem(TOKEN_KEY);
    if (local) {
        return JSON.parse(local).token;
    } else {
        
        return local;
    }
}

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:4050', '206.189.215.246:4050'],
                blacklistedRoutes: ['localhost:3001/auth/']
            }
        }),
    ],
    declarations: [LoginComponent, HeaderComponent, NotFoundComponent],
    exports: [
        RouterModule,
        HeaderComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuardService
    ]
})
export class CoreModule { }
