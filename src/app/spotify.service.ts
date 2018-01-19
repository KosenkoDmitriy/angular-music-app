import { Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SpotifyService {
  constructor(public http: Http) {
  }

  searchTrack(query: string) {
    let params: string = [
      `q=${query}`,
      `type=track`,
    ].join("&");
    let queryUrl: string = `https://api.spotify.com/v1/search?${params}`;
    return this.http.request(queryUrl).map(res => res.json());
  }
}
