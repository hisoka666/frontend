import { Component, AfterViewInit, ElementRef, NgZone } from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor (private _zone: NgZone) {}
  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';

  public auth2: any;
   public user: any;
  public gIsSignedIn:boolean = false
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
        'onsuccess': param => this._zone.run(() => {this.onSignIn(param)})
    });
  }
 
 public onSignIn(googleUser){
    console.log('Email: ' + googleUser.getId())
    console.log('Token: ' + googleUser.getAuthResponse().id_token)
    
    this._zone.run(() => {
      this.gIsSignedIn = true
      console.log('signin: ' + this.gIsSignedIn)
    })
 }

  ngAfterViewInit() {
    this.googleInit();
    console.log('Signin: ' + this.gIsSignedIn)
  }

}
