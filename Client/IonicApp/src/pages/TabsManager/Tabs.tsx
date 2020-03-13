import { IonTab, IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet, IonLabel } from "@ionic/react";
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Route, Redirect } from "react-router";
import Home from "../Home";
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
                    <Route path="/home" component={Home} exact={true} />
                    
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton href="/home" tab="search">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        <p style={{ fontSize: "10px", padding: "0 auto", margin: "0 auto" }}>
                            Search
                        </p>
                    </IonTabButton>
                    <IonTabButton href ="/import" tab="import">
                        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                        <p style={{ fontSize: "10px", padding: "0 auto", margin: "0 auto" }}>
                            Library
                        </p>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        );
    }
}

export default Tabs;