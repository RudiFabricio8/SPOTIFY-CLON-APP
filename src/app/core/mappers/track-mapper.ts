import { Track } from '../models/track';

export class TrackMapper {
  static fromSpotifyItem(item: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string; images?: { url: string }[] };
    duration_ms: number;
    preview_url: string | null;
  }): Track {
    return {
      id: item.id,
      name: item.name ?? 'Desconocido',
      artistNames: (item.artists ?? []).map(a => a.name),
      albumName: item.album?.name ?? 'Álbum desconocido',
      albumImage: item.album?.images?.[0]?.url ?? '',
      durationMs: item.duration_ms ?? 0,
      previewUrl: item.preview_url
    };
  }
}