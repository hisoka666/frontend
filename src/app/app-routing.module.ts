import { NgModule }  from '@angular/core';
import { RouterModule, Routes, CanActivate} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UserAuth } from './user-auth';
import { UserService } from './user.service';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [UserAuth] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ UserService, UserAuth ]
})

export class AppRoutingModule {}