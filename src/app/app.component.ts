import { Component, AfterViewInit, ElementRef} from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';

  private scope = [
    'profile',
    // 'email',
    // 'https://www.googleapis.com/auth/plus.me',
    // 'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;

  public googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        fetch_basic_profile: false,
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element){
    this.auth2.attachClickHandler(element, {}, 
    (googleUser) => {
      let profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      localStorage.setItem('googletoken', googleUser.getAuthResponse.id_token)
      console.log('ID: ' + profile.getId());

    }, function(error){
      console.log(JSON.stringify(error, undefined, 2));
    });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element)
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
