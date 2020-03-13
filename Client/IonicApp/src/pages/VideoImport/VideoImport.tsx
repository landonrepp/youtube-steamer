import * as React from 'react';
import { Component } from 'react';
import { IonInput, IonButton, IonPage, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/react';
import { MediaService } from '../../services/MediaService';
import {GETURL} from '../../Constants'
import { url } from 'inspector';
import { hostname } from 'os';

export interface VideoImportProps {
    initialUrl?:string
}

export interface VideoImportState {
    urlVal:string,
    urlInvalid:boolean
}

class VideoImport extends React.Component<VideoImportProps, VideoImportState> {
    constructor(props: VideoImportProps) {
        super(props);
        
        this.state = {
            urlVal: this.props.initialUrl||"",
            urlInvalid:false
        };
    }
    handleChange(event:any){
        this.setState({urlVal:event.target.value})
    }
    importVideo(){
        try{
            let url = new URL(this.state.urlVal)
            let params = new URLSearchParams(this.state.urlVal);
            let v = url.searchParams.get("v")
            
            if(!v){
                //this means that the user may have entered a url of youtu.be. we need to check.
                let hostName = url.hostname;
                if(hostName.substring(0,4) == "www."){
                    console.log(hostName.substring(4,hostName.length))
                }
                if(hostName == "youtu.be"){
                    v = url.pathname.substring(1);
                }
            }
            if(!v){
                throw "invalid url"
            }
            else{
                this.setState({urlInvalid:false});
            }
            console.log(v);
        }
        catch(ex){
            this.setState({urlInvalid:true});
        }
        // let videoUrl = `${GETURL}/youtube?v=${video.videoID}`;

    }
    render() {
        return (
            <IonPage>
                <IonGrid style={{ width: "100%" }}>
                    <IonRow style={{ height: "30%" }}>

                    </IonRow>
                    <IonRow>
                        <IonLabel style={{ margin: "0 auto" }}>Enter A Youtube Video URL</IonLabel>
                        <input style={{ width: "100%" }} type="url" name="" onChange={this.handleChange.bind(this)}></input>
                    </IonRow>
                    <IonRow>
                        <IonButton style={{ margin: "0 auto" }} onClick={this.importVideo.bind(this)}>Import</IonButton>
                    </IonRow>
                    <IonRow>
                        <IonLabel style={{ margin: "0 auto", display:this.state.urlInvalid?"block":"none", color:"red" }}>
                            An error has occured. Please check your url.
                        </IonLabel>
                    </IonRow>
                </IonGrid>
            </IonPage>
        );
    }
}

export default VideoImport;