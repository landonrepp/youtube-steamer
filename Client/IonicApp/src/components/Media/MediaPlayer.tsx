import React, { useState, Suspense } from 'react';
import { IonIcon, IonGrid, IonRow, IonCol, IonItem, IonRange, IonVirtualScroll, IonContent } from '@ionic/react';
import ReactDOM from 'react-dom'
import { arrowBackCircleOutline, arrowForwardCircleOutline, play, } from 'ionicons/icons'
import {Howl, Howler} from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MediaService } from '../../services/MediaService'
import { faCoffee, faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons'
import './MediaPlayer.css';
import { ScrollView } from 'react-native';
import ListHandler from '../ListHandler/ListHandler';
import { Video } from '../../models/MediaModels';
import { MediaController } from '../../controllers/MediaController';

interface MeadiaPlayerProps {}


export interface ProgressBarProps {
    progress:number
}

export interface ProgressBarState {
    
}
 

export interface MediaPlayerProps {
}
 
export interface MediaPlayerState {
    playing:boolean,
    progress:number   
}
 
class MediaPlayer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    mediaController = new MediaController();
    constructor(props:MediaPlayerProps){
        super(props);
        this.state = {
            playing:false,
            progress:0
        };
    }
    setProgress = () =>{
        if(this.mediaController.Sounds.state() == "loaded"){
            this.setState({progress:Number(this.mediaController.seek())/this.mediaController.Sounds.duration()*100});
        }
    };
    changeSongProgress = (e:any)=>{
        let val = (e.target as any).value as number;
        if(val && val != this.state.progress){
            this.setState({progress:val});
            this.mediaController.seek(val/100 * this.mediaController.duration())
        }
    }
    
    togglePlaying = () =>{
        if(this.state.playing){
            this.mediaController.pause();
        }
        else{
            this.mediaController.play();
        }
        // this.setState(this.state);
    };
    
    updatePlayButton = ()=>{
        // console.log(`${this.mediaController.playing?"playing":"paused"}`)
        this.setState({playing:this.mediaController.playing},()=>{
            console.log(this.state);
        });
        // this.setState({})
    }
    
    componentDidMount(){
        setInterval(this.setProgress,1000);
        this.mediaController.events.subscribe("SoundPlayed",this.updatePlayButton)
        this.mediaController.events.subscribe("SoundPaused",this.updatePlayButton)
        this.mediaController.events.subscribe("SoundSeeked",(_event)=>{
            console.log("sound Seeked");
        })
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
                        <IonCol size="1" style={{"minWidth":"max-content"}}>
                            <FontAwesomeIcon size="2x" onClick={this.mediaController.previousSong} icon={faBackward} />
                        </IonCol>
                        <IonCol size="1" style={{"minWidth":"max-content"}}>
                            <FontAwesomeIcon className="pause-play" onClick={this.togglePlaying} size="2x" icon={this.state.playing? faPause:faPlay} />
                        </IonCol>
                        <IonCol size="1" style={{"minWidth":"max-content"}}>
                            <FontAwesomeIcon size="2x" onClick={this.mediaController.nextSong} icon={ faForward } />
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
