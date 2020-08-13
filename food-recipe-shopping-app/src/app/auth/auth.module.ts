import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ])
    ],
    
})
export class AuthModule {}