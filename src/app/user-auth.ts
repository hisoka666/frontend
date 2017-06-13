import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()

export class UserAuth implements CanActivate{

    constructor (private userService: UserService){}
    // public token = localStorage.getItem('token')

    canActivate(){
        console.log('Checking if user logged in')
      return this.userService.isLoggedIn()
    }
}