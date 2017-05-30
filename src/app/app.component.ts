import { Component, AfterViewInit, ElementRef} from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private clientId:string = '10718751586-vfcuu6r4jcn6ge5l6dh28jmr4p7fesa0.apps.googleusercontent.com';

  private scope = ['profile'].join(' ');

  public auth2: any;

  public googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        fetch_basic_profile: false,
        scope: this.scope    
      })
    //   .then(
    //   function (googleUser) {
    //     let token = googleUser.getAuthResponse().id_token;
    //     console.log('Token: ' + token);
    //   },
    //   function (error) {
    //     alert(JSON.stringify(error, undefined, 2))
    //   });
    // });
      .attachClickHandler("gsignin", {},
      function (googleUser) {
        let token = googleUser.getAuthResponse().id_token
        console.log('Token: ' + token)
      },
      function (error) {
        alert(JSON.stringify(error, undefined, 2))
      });
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
