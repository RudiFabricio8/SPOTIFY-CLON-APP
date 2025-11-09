import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchResponse } from '../models/search-response';
import { map } from 'rxjs/operators';
import { TrackMapper } from '../mappers/track-mapper';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor(private http: HttpClient) { }

  searchTracks(query: string, limit: number = 7): Observable<Track[]> {
    if (!query.trim()) {
      return new Observable<Track[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    const params = new HttpParams({
      fromObject: {
        q: query,
        type: 'track',
        limit: limit.toString()
      }
    });

    return this.http.get<SearchResponse>(`${environment.spotifyApiBase}/search`, { params }).pipe(
      map((response: any) => response.tracks.items.map(TrackMapper.fromSpotifyItem))
    );
  }

  getTrackById(id: string): Observable<Track> {
    return this.http.get<any>(`${environment.spotifyApiBase}/tracks/${id}`).pipe(
      map(TrackMapper.fromSpotifyItem)
    );
  }
}