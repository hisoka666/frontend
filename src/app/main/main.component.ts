import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, DoCheck, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Pasien } from '../pasien';
import { UserService } from '../user.service';
import { LoginComponent } from '../login/login.component';

declare var gapi:any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ UserService ]
})
export class MainComponent implements OnInit {
  user: any
  auth2: any
  error: any
  gIsSignedIn: boolean = true
  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';
  listPasien: Pasien[];
  token:string
  pasien = Pasien
  // listpasien: Pasien[]
  constructor(
    private userService: UserService,
    private router: Router,
    private _zone: NgZone
  ) { }

  ngOnInit() {

      // this._zone.run(() => {
    //    if (this.gIsSignedIn == false) {
    //      this.router.navigateByUrl('/login')
    //    } else {
    //      console.log(this.gIsSignedIn)
    //    }
    //    })
  }


    gSignOut(){
      // this.user = gapi.auth2.init()
      localStorage.clear()
      // this._zone.run(() => {this.token = localStorage.getItem('token')})
      console.log(localStorage.getItem('token'))
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: this.clientId
        });
      })
      this.user = gapi.auth2.getAuthInstance()
      this.user.signOut()
      // this.auth2 = this.user.getAuthInstance()
      // this.auth2.signOut()
      // this.user = gapi.auth2.getAuthInstance()
      // this.user.signOut()
      
      this.router.navigateByUrl('/login')
      
    }


  }

