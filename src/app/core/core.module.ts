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
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:3000'],
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
