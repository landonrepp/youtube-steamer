import React, { useState, Suspense } from 'react';
import { IonIcon, IonGrid, IonRow, IonCol, IonItem, IonRange, IonVirtualScroll, IonContent } from '@ionic/react';
import ReactDOM from 'react-dom'
import { arrowBackCircleOutline, arrowForwardCircleOutline, play, } from 'ionicons/icons'
import {Howl, Howler} from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MediaService } from '../../services/MediaService'
import { faCoffee, faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons'
import './MediaPlayer.css'
import { GETURL } from '../../Constants';
import { ScrollView } from 'react-native';
import ListHandler from '../ListHandler/ListHandler';
import { Video } from '../../Models/MediaModels';

interface MeadiaPlayerProps {}


export interface ProgressBarProps {
    progress:number
}
 
export interface ProgressBarState {
    
}
 

export interface MediaPlayerProps {
    videos:Video[]
}
 
export interface MediaPlayerState {
    
}
export interface State{
    playing:boolean,
    progress:number
}
 
class MediaPlayer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    Sounds = new Howl({src: [""], format:["mp3"]});
    songSelected = false;
    state:State = {
        playing:false, 
        progress:0
    };
    nextSong = ()=>{
        let i = 0;
        const len = this.props.videos.length;
        for(i = 0; i < len; i++){
            if(this.props.videos[i].selected){
                this.playSong(this.props.videos[(i+1)%len]);
                return;
            }
        }
    };
    previousSong =()=>{
        let i = 0;
        const len = this.props.videos.length;
        for(i = 0; i < len; i++){
            if(this.props.videos[i].selected){
                this.playSong(this.props.videos[(i-1)%len]);
            }
        }
    }
    setProgress = () =>{
        if(this.Sounds.state() == "loaded"){
            this.setState({progress:Number(this.Sounds.seek())/this.Sounds.duration()*100});
        }
        
    };
    
    CreateHowl = (video:Video)=>{
        let videoUrl = `${GETURL}/youtube?v=${video.videoID}&f=${video.ext}`
        return new Howl({
            src:videoUrl, format:"mp3", volume:0.1,
            onend: (id)=>{
                console.log("song ended");
                this.nextSong();
            }
        });
    };
    togglePlaying = () =>{
        if(!this.songSelected && this.props.videos.length > 0){
            this.songSelected = true;
            this.playSong(this.props.videos[0]);
        }
        else if(this.state.playing){
            this.Sounds.pause();
            this.state.playing = false;
        }
        else{
            this.Sounds.play();
            this.state.playing = true;
        }
        this.setState(this.state);
    };

    playSong = (video:Video)=>{
        this.props.videos.forEach((element,index) => {
            if(element.videoID == video.videoID){
                this.props.videos[index].selected = true;
            }
            else{
                this.props.videos[index].selected = false;
            }
        });
        this.songSelected = true;
        let videoID = video.videoID;
        let ext = video.ext;
        

        this.Sounds.unload();
        this.Sounds = this.CreateHowl(video);
        this.Sounds.play();
        this.state.playing = true;
        video.selected = true;
        this.setState({videos:this.props.videos});
    };
    changeSongProgress = (e:any)=>{
        let val = (e.target as any).value as number;
        if(val && val != this.state.progress){
            this.state.progress = val;
            this.Sounds.seek(val/100 * this.Sounds.duration())
        }
    }
    MusicList = async()=>{
        let videoInformation = await MediaService.getVideoInformation();
        let results:any[] = videoInformation;
        this.props.videos = results;
        this.setState({videos:results})
    };
    
    componentDidMount(){
        
        setInterval(this.setProgress,1000);
    };

    render() { 
        const element = (
            <div onMouseUp={this.changeSongProgress}>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                        </IonCol>
                        <IonCol size="8" sizeLg="4">
                            <IonRange className="media-progress-bar" value={this.state.progress} onIonChange={this.changeSongProgress} color="secondary" pin={false} />
                        </IonCol>
                        <IonCol>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol sizeLg="3">
                        </IonCol>
                        <IonCol size="1" style={{"min-width":"max-content"}}>
                            <FontAwesomeIcon size="2x" onClick={this.previousSong} icon={faBackward} />
                        </IonCol>
                        <IonCol size="1" style={{"min-width":"max-content"}}>
                            <FontAwesomeIcon className="pause-play" onClick={this.togglePlaying} size="2x" icon={this.state.playing? faPause:faPlay} />
                        </IonCol>
                        <IonCol size="1" style={{"min-width":"max-content"}}>
                            <FontAwesomeIcon size="2x" onClick={this.nextSong} icon={ faForward } />
                        </IonCol>
                        <IonCol sizeLg="3">
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        );
        return element;
    }
}
 
export default MediaPlayer;
