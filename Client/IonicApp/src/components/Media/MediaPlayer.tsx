import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonCol, IonGrid, IonRange, IonRow, IonText } from '@ionic/react';
import * as React from 'react';
import { MediaController } from '../../controllers/MediaController';
import './MediaPlayer.css';


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
        console.log(e.target.class)
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
        console.log(this.mediaController.Volume);
        const element = (
            
                <IonGrid>
                    <div onMouseUp={this.changeSongProgress}>
                        <IonRow style={{marginBottom:"0"}}>
                            <IonCol>
                            </IonCol>
                            <IonCol size="8">
                                <IonRange className="media-progress-bar" value={this.state.progress} color="secondary" pin={false} />
                            </IonCol>
                            <IonCol>
                            </IonCol>
                        </IonRow>
                        <IonRow style={{marginTop:"0"}}>
                            <IonCol>
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
                            <IonCol>
                            </IonCol>
                        </IonRow>
                    </div>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol size="4">
                            <IonText>
                                Volume: 
                            </IonText>
                            <IonRange onMouseUp={(e)=>this.mediaController.Volume = ((e.target as any).value as number)/100} value={this.mediaController.Volume * 100}></IonRange>
                        </IonCol>
                    </IonRow>
                </IonGrid>
        );
        return element;
    }
}
 
export default MediaPlayer;
