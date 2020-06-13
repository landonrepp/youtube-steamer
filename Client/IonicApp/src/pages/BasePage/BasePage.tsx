import * as React from 'react';
import { Component } from 'react';
import { IonContent, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, withRouter, Redirect, Switch, Router } from 'react-router';
import Tabs from '../TabsManager/Tabs';
import VideoImport from '../VideoImport/VideoImport';
import Library from '../Library/Library';
import MediaPlayer from '../../components/Media/MediaPlayer';
import { BrowserRouter } from 'react-router-dom';


export interface BasePageProps {
    
}
 
export interface BasePageState {
    
}
 
class BasePage extends React.Component<BasePageProps, BasePageState> {
    constructor(props: BasePageProps) {
        super(props);
        this.state = { };
    }
    playerHeight = 120;
    render() { 
        return (
            <IonContent>
                <div style={{height:`calc(100% - ${this.playerHeight}px)`}}>
                    <IonRouterOutlet >
                        <Switch>
                            <Route path="/import" component={VideoImport} exact={true} />
                            <Route path="/library" component={Library} exact={true} />
                            <Redirect path="/" to='/library' exact={true} />
                        </Switch>
                    </IonRouterOutlet>
                </div>
                <div style={{height:`${this.playerHeight}px`}}>
                    <MediaPlayer/>
                </div>
            </IonContent>
        );
    }
}
 
export default BasePage;