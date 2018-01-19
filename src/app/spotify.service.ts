import {
  Http,
  Response,
  //RequestOptions,
} from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SpotifyService {
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

  searchTrack(query: string) {
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
