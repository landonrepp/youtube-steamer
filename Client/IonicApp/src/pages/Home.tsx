import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import MediaPlayer from '../components/Media/MediaPlayer';
import './Home.css';
import MediaListItem from '../components/Media/MediaListItem';
import { MediaListItemValues } from '../models/MediaModels'

const Home: React.FC = () => {
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
        <MediaListItem mediaListItemValues={{
          title:"test",
          subtitle:"subtitle",
          image:"data:image/png;base64,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",
          selected:true,
          action: () => {return new Promise((r,re)=>{return null})}
        }}/>
        <MediaPlayer/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
