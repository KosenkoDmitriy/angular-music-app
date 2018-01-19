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
  token: Object;
  secret: string;

  constructor(public http: Http) {
  }
//https://accounts.spotify.com/authorize/?client_id=a4dca9adb7e641a7b66c1b0800de6636&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:4200%2F#%2Fsearch?query=mozart&scope=&state=34fFs29kd09
  //https://accounts.spotify.com/authorize/?client_id=a4dca9adb7e641a7b66c1b0800de6636&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200&scope=&state=


  //worked
  // https://api.spotify.com/v1/search?q=mozart&type=track&access_token=BQB1KadliIxj8n3VHu4-b4Z0pvXt7AVLSp8_TvzJ7J707yXVsCl1skItPBKLTMchu3HT-glvZc7-bp-ZJrvXQDzr-MD87NG4qrKjfTVNBjji8t0WpwDjx-b2D2x0Cwj8Aj0466XwZ7XEDF5wvo9iv4T30NKsvQZ3uCoTjWI6ca6G5rb4Tz5_nP25V2v_MVAxmpjgqfqZkuRYVw_EyLeIFIzm_rZQIhzVMXOoGH4PCf5wSdz9jTA74agJn2p25qjsraKgaYfj8zuUNY6NUNBD4DEj65lStg
  makePostAuth(): void {
    'https://accounts.spotify.com/authorize'
    this.http.post(
      'https://accounts.spotify.com/api/token',
      JSON.stringify({
        response_type: 'code',
        show_dialog: 'false',
        redirect_uri: 'http://localhost:4200',
        client_id: 'a4dca9adb7e641a7b66c1b0800de6636',
        scope: '',
        state: '',
      }))
      .map((res: Response) => {
        //this.token = res.json();
        this.secret = res.json();
        console.log('token secret: ', this.secret);
        this.makePostToken();
      });
  }

  makePostToken(): void {
    //this.loading = true;
    this.http.post(
      'https://accounts.spotify.com/api/token',
      JSON.stringify({
        grant_type: 'client_credentials',
        code: this.secret,
        //redirect_uri: 'http://localhost:4200/#/search?query=mozart',
        redirect_uri: 'http://localhost:4200',
        client_id: 'a4dca9adb7e641a7b66c1b0800de6636',
        client_secret: '28e576a74eb04f6a9d748d55360d5529',
      }))
      .map((res: Response) => {
        this.token = res.json();
        console.log('token: ', this.token);
      });
  }

  query(Url: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${SpotifyService.API_BASE_URL}${Url}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;

      const apiKeyWithdd = 'YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk=';// environment.spotifyApiKey;
      // get accessToken
      // curl -X "POST" -H "Authorization: Basic YTRkY2E5YWRiN2U2NDFhN2I2NmMxYjA4MDBkZTY2MzY6MjhlNTc2YTc0ZWIwNGY2YTlkNzQ4ZDU1MzYwZDU1Mjk=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
      const accessToken = 'BQAx4M33d8Wm9lOS2kWDQYnFtM0fs_7ZUkHxXgRQvRXnrypvzAHqaudAT8ccR3aeh1Nzf0qGXoWnMqzDmOU';
      const headers = new Headers({
        //'Authorization': `Bearer ${apiKeyWithdd}`
        'Authorization': `Bearer ${accessToken}`
        //'Authorization': `Basic ${apiKeyWithdd}`
      });
      const options = new RequestOptions({ headers: headers });
      return this.http.request(queryUrl, options).map((res: any) => {
        return res.json();
      });

      //TODO: use env variable instead of access_token
      //queryUrl += `&access_token=${accessToken}`;
      //return this.http.request(queryUrl).map((res: any) => res.json() );
    }
  }

  search(query: string, type: string): Observable<any[]> {
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
