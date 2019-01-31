import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authentication: AuthenticationService,
        private router: Router
    ) {
        this.loginForm = formBuilder.group({
            'usuario': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        });
    }

    ngOnInit() {
    }

    login(data: any) {
        this.authentication.login(data);
    }

}