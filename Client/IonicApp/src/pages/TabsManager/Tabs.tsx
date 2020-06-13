import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import * as React from 'react';
import { Redirect, Route } from "react-router";
import Library from "../Library/Library";
import VideoImport from "../VideoImport/VideoImport";

export interface TabsProps {

}

export interface TabsState {

}

class Tabs extends React.Component<TabsProps, TabsState> {
    constructor(props: TabsProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/import" component={VideoImport} exact={true} />
                    <Route path="/library" component={Library} exact={true} />
                    <Redirect path="/" to='/library' exact={true} />
                </IonRouterOutlet>
                
                <IonTabBar slot="bottom">
                    <IonTabButton href="/library" tab="search" selected={true}>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        <p style={{ fontSize: "10px", padding: "0 auto", margin: "0 auto" }}>
                            Library
                        </p>
                    </IonTabButton>
                    <IonTabButton href ="/import" tab="import">
                        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                        <p style={{ fontSize: "10px", padding: "0 auto", margin: "0 auto" }}>
                            Import
                        </p>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        );
    }
}

export default Tabs;