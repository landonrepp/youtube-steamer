import React, { useState, Suspense } from 'react';
import { IonIcon, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react';
import ReactDOM from 'react-dom'
import { arrowBackCircleOutline, arrowForwardCircleOutline, play, } from 'ionicons/icons'
import {Howl, Howler} from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MediaService } from '../../services/MediaService'
import { faCoffee, faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons'
import './MediaPlayer.css'
import { GETURL } from '../../Constants';

interface MeadiaPlayerProps {}


export interface ProgressBarProps {
    
}
 
export interface ProgressBarState {
    
}
 
class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
    state = { 
        progress:0
    }

    setProgress = (pro:number) =>{
        this.state.progress = pro;
        this.setState(this.state);
    }
    render() { 
        return (
            <div id="progressContainer">
                <div id="progressBar" style={{width: this.state.progress + "%"}}></div>
            </div>
        );
    }
}
 

export interface MediaPlayerProps {
    
}
 
export interface MediaPlayerState {
    
}
interface State{
    playing:boolean,
    videos:any[]
}
 
class MediaPlayer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    Sounds = new Howl({src: ["http://localhost:5000/youtube?v=h1sCiXTlR8Q&f=mp3","http://localhost:5000/youtube?v=h1sCiXTlR8Q&f=mp3"], format:["mp3"]});

    state:State = {
        playing:true, 
        videos:[]
    }
    MusicList = async()=>{
        let videoInformation = await MediaService.getVideoInformation();
        let results:any[] = videoInformation;
        this.state.videos = results;
        this.setState({videos:results})
    }
    togglePlaying = () =>{
        this.Sounds.pause();
        console.log(this.Sounds.playing());
        this.MusicList();
        this.state.playing = !this.state.playing;
        this.setState(this.state);
        
    }

    playSong = (videoID:string, ext:string)=>{
        let videoUrl = `${GETURL}/youtube?v=${videoID}&f=${ext}`
        console.log(videoUrl);
        // this.Sounds = new Howl({src: ["http://localhost:5000/youtube?v=h1sCiXTlR8Q&f=mp3"], format:"mp3"})
        this.setState({})
        this.Sounds.play();
    }
    render() { 
        this.Sounds.play();

        const element = (
            <div>
                <IonGrid>
                    
                    <IonRow>
                        <IonCol>
                            <div>
                                <Suspense fallback= {<div>Loading...</div>}>
                                    {this.state.videos.map(result =>{
                                        return <IonItem onClick={this.playSong.bind(this,result.videoID, result.ext)}>{result.title}</IonItem>;
                                    })}
                                </Suspense>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        </IonCol>
                        <IonCol size="8" sizeLg="4">
                            <ProgressBar></ProgressBar>
                        </IonCol>
                        <IonCol>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol sizeLg="5">
                        </IonCol>
                        <IonCol size="1">
                            <FontAwesomeIcon size="2x" icon={faBackward} />
                        </IonCol>
                        <IonCol size="1">
                            <FontAwesomeIcon className="pausePlay" onClick={this.togglePlaying} size="2x" icon={this.state.playing? faPlay : faPause} />
                        </IonCol>
                        <IonCol size="1">
                            <FontAwesomeIcon size="2x" icon={ faForward } />
                        </IonCol>
                        <IonCol sizeLg="5">
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        );
        return element;
    }
}
 
export default MediaPlayer;
