import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import MediaPlayer from '../components/Media/MediaPlayer';
import './Home.css';

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
        <MediaPlayer/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
