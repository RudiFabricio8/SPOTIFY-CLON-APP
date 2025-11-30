import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Track } from '../../shared/models/track.model';
import { Album } from '../../shared/models/album.model';
import { Artist } from '../../shared/models/artist.model';

interface SearchResponse {
  tracks: {
    items: Track[];
  };
  albums: {
    items: Album[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private baseUrl = environment.spotifyApiUrl;

  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'track,album')
      .set('limit', '20');
    return this.http.get<SearchResponse>(`${this.baseUrl}/search`, { params });
  }

  getTrack(id: string): Observable<Track> {
    return this.http.get<Track>(`${this.baseUrl}/tracks/${id}`);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/albums/${id}`);
  }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/artists/${id}`);
  }

  getArtistTopTracks(id: string, market: string = 'US'): Observable<{ tracks: Track[] }> {
    const params = new HttpParams().set('market', market);
    return this.http.get<{ tracks: Track[] }>(`${this.baseUrl}/artists/${id}/top-tracks`, { params });
  }
}
