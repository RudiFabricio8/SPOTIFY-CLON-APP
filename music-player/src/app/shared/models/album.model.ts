import { Track } from './track.model';

export interface Album {
id: string;
name: string;
images: {
url: string;
height: number;
width: number;
}[];
release_date?: string;
artists: {
id: string;
name: string;
}[];
tracks?: {
items: Track[];
};
}
