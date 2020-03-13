import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import MediaPlayer from '../components/Media/MediaPlayer';
import './Home.css';
import MediaListItem from '../components/Media/MediaListItem';
import MediaList from '../components/Media/MediaList';
import { MediaListItemValues, Video } from '../models/MediaModels'
import { MediaController } from '../controllers/MediaController'
import { verify } from 'crypto';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { promises } from 'fs';



export interface HomeProps {

}

export interface HomeState {
  videoListItemValues: MediaListItemValues[]
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      videoListItemValues: []
    }
  }
  mediaController = new MediaController();
  componentDidMount = () => {
    console.log("home mounted")
    let setVideos = () => {
      this.setState({
        videoListItemValues: this.mediaController.Videos.map(element => {
          let val: MediaListItemValues = {
            selected: element.selected,
            title: element.title,
            subtitle: element.author,
            image: element.thumbnail,
            onSelect: () => {
              let video = element;
              console.log(video);
              this.mediaController.playSong(video);
              this.mediaController.play();
              setVideos();
            }
          }
          return val;
        })
      })
    }
    this.mediaController.events.subscribe("SetVideos", setVideos);
    setVideos();
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cecil Reborn</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Cecil Reborn</IonTitle>
            </IonToolbar>
          </IonHeader>
          <MediaList lineItems={this.state.videoListItemValues}></MediaList>
          <div style={{ margin: "0 auto" }}>
            <MediaPlayer />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
export default Home;
