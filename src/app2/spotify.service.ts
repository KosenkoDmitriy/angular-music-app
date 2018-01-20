import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class SpotifyService {
  static API_BASE_URL = 'https://api.spotify.com/v1';
  access_token: string;
  secret: string;

  constructor(public http: Http) {
  }
  // worked
  // https://api.spotify.com/v1/search?q=mozart&type=track&access_token=BQB1KadliIxj8n3VHu4-b4Z0pvXt7AVLSp8_TvzJ7J707yXVsCl1skItPBKLTMchu3HT-glvZc7-bp-ZJrvXQDzr-MD87NG4qrKjfTVNBjji8t0WpwDjx-b2D2x0Cwj8Aj0466XwZ7XEDF5wvo9iv4T30NKsvQZ3uCoTjWI6ca6G5rb4Tz5_nP25V2v_MVAxmpjgqfqZkuRYVw_EyLeIFIzm_rZQIhzVMXOoGH4PCf5wSdz9jTA74agJn2p25qjsraKgaYfj8zuUNY6NUNBD4DEj65lStg
  makePostAuth(): void {
    this.http.post(
      //'https://accounts.spotify.com/api/token',
      'https://accounts.spotify.com/authorize',
    JSON.stringify({
        response_type: 'code',
        show_dialog: 'false',
        redirect_uri: 'http://localhost:4200',
        client_id: 'a4dca9adb7e641a7b66c1b0800de6636',
        scope: '',
        state: '',
      }))
      .subscribe(
      (res: Response) => {
          this.secret = res.json()['code'];
          console.log('token secret: ', this.secret);
          console.log('makePostAuth(): ', res.json());
          //this.makePostToken();
        },
      (err: any) => {
          console.log('makePostAuth() error', err.json());
        }
      );
  }

  makePostToken(): void {
    //this.loading = true;
    this.http.post(
      'https://accounts.spotify.com/api/token',
      JSON.stringify({
        grant_type: 'client_credentials',
        //code: this.secret,
        //redirect_uri: 'http://localhost:4200/#/search?query=mozart',
        redirect_uri: 'http://localhost:4200',
        client_id: 'a4dca9adb7e641a7b66c1b0800de6636',
        client_secret: '28e576a74eb04f6a9d748d55360d5529',
      }))
      .subscribe((res: Response) => {
        this.access_token = res.json();
        console.log('token: ', this.access_token);
      },err=>{
        console.log("makePostToken() err", err);
      });
  }

  getAccessToken(): Observable<any[]> {
    const queryUrl = `https://accounts.spotify.com/api/token?grant_type=client_credentials`;

    const apiKey = 'YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk=';// environment.spotifyApiKey;
    // get accessToken
    // curl -X "POST" -H "Authorization: Basic YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk="
    // -d grant_type=client_credentials https://accounts.spotify.com/api/token
    const headers = new Headers({
      'Authorization': `Basic ${apiKey}`,
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.request(queryUrl, options).map((res: any) => {
      //console.log("query() http.request", res.json());
      this.access_token = res.json().access_token;
      return res.json();
    });
  }

  getPostAccessToken(): any {
    const queryUrl = `https://accounts.spotify.com/api/token`;
    //const queryUrl = `https://accounts.spotify.com/api/token?grant_type=client_credentials`;
    const apiKey = 'YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk=';// environment.spotifyApiKey;
    const headers = new Headers({
      'Authorization': `Basic ${apiKey}`,
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });
    //return this.http.request(queryUrl, options).map((res: any) => {
    //  //console.log("query() http.request", res.json());
    //  this.access_token = res.json().access_token;
    //  return this.access_token;
    //});
    let data = JSON.stringify({
      grant_type: 'client_credentials',
    });
    //let config = {
    //  headers : {
    //    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    //  }
    //}
    console.log("getPostAccessToken() queryUrl: ", queryUrl);

    return this.http.post(queryUrl, data, options)
      .subscribe(
      (res: Response) => {
        console.log("query() http.request", res.json());
        this.access_token = res.json()['access_token'];
        return res.json();
      },
      err => {
        console.log("getPostAccessToken() error: ", err, err.status);
        return "ERROR";
      });
  }

  query(Url: string, params?: Array<string>): Observable<any[]> {

    let queryUrl = `${SpotifyService.API_BASE_URL}${Url}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;

      const apiKey = 'YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk=';// environment.spotifyApiKey;
      // get accessToken
      // curl -X "POST" -H "Authorization: Basic YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
      const accessToken = 'BQDNhQ4GhT6KUm0_z2xYEnJusIOOPAx8Y78RESYNq7nXxf3MwWmJEP57g9H85HPtoemhuh7IfAqqYx1JN24';
      const headers = new Headers({
        'Authorization': `Bearer ${accessToken}`
        //'Authorization': `Basic ${apiKey}`
      });
      const options = new RequestOptions({ headers: headers });
      return this.http.request(queryUrl, options).map((res: any) => {
        console.log("query() http.request", res.json());
        return res.json();
      });

      //TODO: use env variable instead of access_token
      //queryUrl += `&access_token=${accessToken}`;
      //return this.http.request(queryUrl).map((res: any) => res.json() );
    }
  }

  search(query: string, type: string): Observable<any[]> {
    //this.makePostAuth();
    //let at = this.getPostAccessToken();
    //console.log("at: ", at);
    //return at;
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`,
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  searchTrackOld(query: string) {
    // this.makePostAuth();

    console.log("searchTrack: ", query);
    let params: string = [
      `q=${query}`,
      `type=track`,
      'access_token=BQB1KadliIxj8n3VHu4-b4Z0pvXt7AVLSp8_TvzJ7J707yXVsCl1skItPBKLTMchu3HT-glvZc7-bp-ZJrvXQDzr-MD87NG4qrKjfTVNBjji8t0WpwDjx-b2D2x0Cwj8Aj0466XwZ7XEDF5wvo9iv4T30NKsvQZ3uCoTjWI6ca6G5rb4Tz5_nP25V2v_MVAxmpjgqfqZkuRYVw_EyLeIFIzm_rZQIhzVMXOoGH4PCf5wSdz9jTA74agJn2p25qjsraKgaYfj8zuUNY6NUNBD4DEj65lStg',
    ].join("&");
    let queryUrl: string = `https://api.spotify.com/v1/search?${params}`;
    return this.http.request(queryUrl).map(res => res.json());
  }
}
