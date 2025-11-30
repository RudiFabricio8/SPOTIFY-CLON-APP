export interface Track {
id: string;
name: string;
preview_url: string | null;
duration_ms: number;
track_number?: number;
artists: {
id: string;
name: string;
}[];
album: {
id: string;
name: string;
images: {
url: string;
height: number;
width: number;
}[];
release_date?: string;
};
}
