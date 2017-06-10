import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pasien } from './pasien';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private urlLogin: string = 'http://2.igdsanglah.appspot.com/test'
  private url100: string = 'http://2.igdsanglah.appspot.com/testuser'
  constructor(
    private http: Http
  ) { }

  getToken(token: string): Observable<any> {
    // let bodyString = JSON.stringify(body);
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions ({headers: headers});
        return this.http.get(this.urlLogin+`?token=${token}`)
                        .map(this.extractData)
                        .catch(this.handleError);
  }


  getListMain(token: string): Observable<Pasien[]> {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      let options = new RequestOptions({headers: headers})

      return this.http.get(this.url100, options)
                          .map(this.extractData)
                          .catch(this.handleError)
  }
  
  private extractData(res: Response) {
    // return res.json()
    let body = res.json();
    return body.resp || { };
  }

private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
}


}
