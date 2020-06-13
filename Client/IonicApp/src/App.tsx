import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Library/Library';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tabs from './pages/TabsManager/Tabs';
import MediaPlayer from './components/Media/MediaPlayer';

const App: React.FC = () => (
  <IonApp>
    <IonContent>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="*" component={Tabs} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonContent>
  </IonApp>
);

export default App;
