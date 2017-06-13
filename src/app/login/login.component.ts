import { Component, AfterViewInit, ElementRef, NgZone, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GoogleLoginService } from '../google-login.service';

declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private _zone: NgZone,
    private userService: UserService,
    private router: Router,
    private gLog: GoogleLoginService
  ) { }
  
  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';
  public res: any;
  public auth2: any;
  public user: any;
  // public gIsSignedIn:boolean = false;
  public token;
  public tokenstring;
  public error;
  ngAfterViewInit() {
    // if (localStorage.getItem('token') == null){
    //   console.log('token is null')
    //   //this.gSignOut()
    //   gapi.signin2.render('gsignin', {
    //     'scope': 'profile email',
    //     'width': 240,
    //     'height': 50,
    //     'longtitle': true,
    //     'theme': 'light',
    //     'onsuccess': param => this.onSignIn(param)
    // })
    // } else {
    //   console.log('token exist')
    //   this.router.navigateByUrl('/main')
    // }
    this.googleInit()

  }

  // @Input() 
// fungsi untuk signout
  gSignOut(){
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: this.clientId
        });
        this.auth2.signOut()
        // this.user = this.auth2.getAuthInstance()
        // this.user.signOut()
      })
  }

  public googleInit(){

    // gapi.load('auth2', () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: this.clientId,
    //   });
    // });
    this.auth2 = this.gLog.gInit()
    gapi.signin2.render('gsignin', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
    });
  }
 
 public onSignIn(googleUser){
    this.userService.getToken(googleUser.getAuthResponse().id_token)
                    .subscribe(
                      res => {
                        this.res = res; 
                        this.tokenstring = res.token; 
                        if (this.tokenstring == 'no-access') {
                          // this.gSignOut()
                          alert("Maaf, Anda tidak terdaftar sebagai staf IGD");
                        } else {
                        localStorage.setItem('token', this.tokenstring);
                        console.log(localStorage.getItem('token'))
                        this.router.navigateByUrl('/main')

                      }
                      console.log(this.tokenstring);
                      },
                      error => {
                        this.error = error;
                        console.log(error);
                      })
    
    // console.log('signin: ' + this.gIsSignedIn)
    
 }
}
