import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    isLoginMode = true;
    isLoading = false;
    error: string = '';

    constructor(private authService: AuthService,
                private router: Router){}

    authForm: FormGroup;

    ngOnInit() {
        this.authForm = new FormGroup ({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    onSwitch() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        if(!this.authForm.valid){
            return;
        }
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;

        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        this.authForm.reset();
    }

    
}