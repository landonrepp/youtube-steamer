export interface Video {
    selected: boolean,
    title: string,
    videoID: string,
    thumbnail: string,
    author: string
};
export interface MediaListItemValues {
    title: string,
    subtitle: string,
    image: string,
    selected: boolean,
    onSelect?: () => any

};
export interface VideoStream{
    url:string,
    extention:string
}