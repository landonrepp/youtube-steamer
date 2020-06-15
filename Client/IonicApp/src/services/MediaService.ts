import { GETURL } from '../Constants'
import { Video, VideoStream } from '../models/MediaModels';
export class MediaService {
    //convert 2d arrray created by csv file/ sql table into json object
    static arrToObject: any = (arr: any[][]) => {
        if (arr.length == 0) {
            return []
        }
        //assuming header
        let keys = arr[0];
        //vacate keys from main array
        let newArr = arr.slice(1, arr.length);

        let formatted = [],
            data = newArr,
            cols = keys,
            l = cols.length;
        for (let i = 0; i < data.length; i++) {
            let d = data[i],
                o: any = {};
            for (let j = 0; j < l; j++)
                o[cols[j]] = d[j];
            formatted.push(o);
        }
        return formatted;
    }

    static getVideoInformation: (searchString?: string) => any = (searchString?: string) => {
        let baseUrl = GETURL + "/video";
        if (searchString) {
            baseUrl += `?s=${searchString}`;
        }
        console.log(baseUrl);
        let promise = fetch(baseUrl)
            .then((result) => {
                return result.json()
                    .then(result => {
                        console.debug(result);
                        return result;
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
        return promise;
    }

    static async getVideoPlayerStreamer(video: Video): Promise<VideoStream> {
        if (!video) {
            throw "error";
        }
        let baseUrl = GETURL + "/youtube";
        if (video) {
            baseUrl += `?v=${video.videoID}`;
        }
        let promise = fetch(baseUrl)
            .then((result) => {
                return result.json()
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
        return promise;
    }
}