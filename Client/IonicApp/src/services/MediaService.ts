import {GETURL} from '../Constants'
export class MediaService {
    //convert 2d arrray created by csv file/ sql table into json object
    static arrToObject:any = (arr:any[][])=>{
        //assuming header
        var keys = arr[0];
        //vacate keys from main array
        var newArr = arr.slice(1, arr.length);
    
        var formatted = [],
        data = newArr,
        cols = keys,
        l = cols.length;
        for (var i=0; i<data.length; i++) {
                var d = data[i],
                        o:any = {};
                for (var j=0; j<l; j++)
                        o[cols[j]] = d[j];
                formatted.push(o);
        }
        return formatted;
    }

    static getVideoInformation: (searchString?:string) => any = (searchString?:string)=>{
        let baseUrl = GETURL+"/getvideo";
        if(searchString){
            baseUrl += `?s=${searchString}`;
        }
        var promise = fetch(baseUrl)
        .then((result)=>{
            return result.json()
            .then(result=>{
                return MediaService.arrToObject(result);
            })
            .catch(err=>{
                console.log(err);
                throw err;
            })
        })
        .catch((err)=>{
            console.log(err);
            throw err;
        })
        return promise;
    }

}