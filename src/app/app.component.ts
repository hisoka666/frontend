import { Component, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Token } from './token';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements AfterViewInit {

  constructor (
    private _zone: NgZone,
    private userService: UserService
    ) {}

  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';

  public auth2: any;
  public user: any;
  public gIsSignedIn:boolean = false;
  public token;
  public tokenstring;
  public error;
  public gSignOut(){

    this.user = gapi.auth2.getAuthInstance()
    this.user.signOut()
    this._zone.run(() => {
    this.gIsSignedIn = false
    })

  }
  public googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
      })
    });
    gapi.signin2.render('gsignin', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
        // 'onsuccess': param => this._zone.run(() => {this.onSignIn(param)})
    });
  }
 
 public onSignIn(googleUser){
    this.userService.getToken(googleUser.getAuthResponse().id_token)
                    .subscribe(
                      token => {
                        this.token = token; 
                        this.tokenstring = token.token; 
                        localStorage.setItem('token', this.tokenstring)
                        console.log(this.tokenstring);
                      },
                      error => {
                        this.error = error;
                        console.log(error);
                      })
    this._zone.run(() => {this.gIsSignedIn = true})
    console.log('signin: ' + this.gIsSignedIn)
    
 }

  ngAfterViewInit() {
    this.googleInit();
    console.log('Signin: ' + this.gIsSignedIn)
  }

}
