export interface Track {
  id: string;
  name: string;
  artistNames: string[];
  albumName: string;
  albumImage: string;
  durationMs: number;
  previewUrl: string | null;
}