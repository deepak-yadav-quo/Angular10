import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = '';
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver){}

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
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );

        this.authForm.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        // const 
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy() {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}