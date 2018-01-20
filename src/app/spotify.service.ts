import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: Http) {
  }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    //return this.http.request(queryURL).map((res: any) => res.json());
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
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];
