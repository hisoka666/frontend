import { Injectable } from '@angular/core';

var gapi:any
const clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';
@Injectable()
export class GoogleLoginService {
  
  // private user:any
  private auth2:any
  // public res: any
  constructor() { }
  
  public gInit(): any {

     gapi.load('auth2', () => {
       this.auth2 = gapi.auth2.init({
         clien_id: clientId
       })
     })
     return this.auth2
  }



    //   gapi.load('auth2', () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: this.clientId,
    //   });
    // });
    // gapi.signin2.render('gsignin', {
    //     'scope': 'profile email',
    //     'width': 240,
    //     'height': 50,
    //     'longtitle': true,
    //     'theme': 'light',
    //     'onsuccess': param => this.onSignIn(param)
    // });
}
