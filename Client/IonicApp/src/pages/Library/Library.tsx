import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonSearchbar } from '@ionic/react';
import React from 'react';
import MediaPlayer from '../../components/Media/MediaPlayer';
import './Library.css';
import MediaListItem from '../../components/Media/MediaListItem';
import MediaList from '../../components/Media/MediaList';
import { MediaListItemValues} from '../../models/MediaModels'
import { MediaController } from '../../controllers/MediaController'
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
  setVideos = () => {
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
            this.setVideos();
          }
        }
        return val;
      })
    })
  }
  mediaController = new MediaController();
  componentDidMount = () => {
    console.log("home mounted")
    this.mediaController.events.subscribe("SetVideos", this.setVideos);
    this.setVideos();
    this.mediaController.events.subscribe("SetSong",this.setVideos);
  }
  search(e:any){
    console.log(e.target.value)
    this.mediaController.refresh(e.target.value);
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cecil Reborn</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{overflow:"none"}}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Cecil Reborn</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div style={{display:'block'}}>
            <IonSearchbar id="searchbar" debounce = {400} onIonChange= {this.search.bind(this)}></IonSearchbar>
          </div>
          <div style={{height:"calc(100% - 250px)", overflow:"auto"}}>
            <MediaList lineItems={this.state.videoListItemValues}></MediaList>
          </div>
          <div>
            <MediaPlayer />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
export default Home;
