import {Video} from '../models/MediaModels';
import { GETURL } from '../Constants';
import { MediaService } from '../services/MediaService';
import {Howl, Howler} from 'howler';
import {EventEmitter} from './EventEmitter';
export class MediaController{
    events = new EventEmitter();
    private _videos: Video[] = [];
    private _playing:boolean = false;
    Sounds = new Howl({src: [""], format:["mp3"],html5: true});
    songSelected = false;
    private static _mediaController:MediaController;
    //mediacontroller should be a singleton to allow music to be paused and played from multiple components
    constructor(){
        if(!MediaController._mediaController){
            MediaController._mediaController = this;
        }
        this.refresh().then(_result=>{
            if(this.Videos.length>0){
                this.playSong(this.Videos[0], false);
                
            }
        });
        return MediaController._mediaController;
    }
    get playing(){
        return this._playing;
    }
    play = (spriteOrId?: string|number|undefined)=>{
        let playValue = this.Sounds.play(spriteOrId);
        this._playing = true;
        this.events.dispatch("SoundPlayed",undefined);
        return playValue;
    }
    pause = (spriteOrId?: number|undefined)=>{
        let pause = this.Sounds.pause(spriteOrId);
        this._playing = false;
        this.events.dispatch("SoundPaused",undefined);
        return pause;
    }
    seek = (seek?:number|undefined,id?:number|undefined)=>{
        if(!seek){
            return this.Sounds.seek();
        }
        let seeknum;
        if(id)
            seeknum = this.Sounds.seek(seek,id);
        else
            seeknum = this.Sounds.seek(seek);
        this.events.dispatch("SoundSeeked",undefined);
        return seeknum;
    }
    refresh = async(searchString?:string)=>{
        let videoInformation = await MediaService.getVideoInformation(searchString);
        this.Videos = videoInformation;
    };

    get duration(){
        return ()=>{
            return this.Sounds.duration();
        }
    }

    CreateHowl = (video:Video)=>{
        let videoUrl = `${GETURL}/youtube?v=${video.videoID}&f=${video.ext}`;
        return new Howl({
            src:[videoUrl], format:"mp3", volume:1, html5: true,
            onend: (id)=>{
                this.nextSong();
            }
        });
    };

    get Videos(){
        return this._videos;
    }
    // todo: learn about events to create a listenable event here for parent compoenents
    set Videos(val){
        this._videos = val;
        console.log("SetVideos event fired")
        this.events.dispatch("SetVideos",val);
    }

    nextSong = ()=>{
        this.jumpSongs(1);
    };
    previousSong = ()=>{
        this.jumpSongs(-1);
    }
    
    jumpSongs:(numOfSongs:number)=>void = (numOfSongs:number)=>{
        let i = 0;
        const len = this.Videos.length;
        let selectedVideo:Video|undefined;
        for(i = 0; i < len; i++){
            if(this.Videos[i].selected){
                let idx = (i+numOfSongs)%len;
                if(idx<0) idx = this.Videos.length+idx;
                selectedVideo = this.Videos[idx];
                this.playSong(selectedVideo);
                break;
            }
        }
        this.events.dispatch("SetSong",null);
    }
    
    playSong = (video:Video, playing = true)=>{
        this.Videos.forEach((element,index) => {
            if(element.videoID === video.videoID){
                this.Videos[index].selected = true;
            }
            else{
                this.Videos[index].selected = false;
            }
        });
        this.songSelected = true;
        let videoID = video.videoID;
        let ext = video.ext;
        

        this.Sounds.unload();
        this.Sounds = this.CreateHowl(video);
        if(playing)
            this.play();
        video.selected = true;

    };
}