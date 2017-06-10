import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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
export class MainComponent implements OnInit, AfterViewInit {
  user: any
  auth2: any
  error: any
  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';
  listPasien: Pasien[];
  token = localStorage.getItem('token')
  pasien = Pasien
  // listpasien: Pasien[]
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.token)
    this.userService.getListMain(this.token)
         .subscribe(
           list => this.listPasien = list
         ) 
  }

  ngAfterViewInit(){
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: this.clientId,
        })
      })
  }
    gSignOut(){
      this.user = gapi.auth2.getAuthInstance()
      this.user.signOut()
      this.router.navigateByUrl('/login')

    }


  }

