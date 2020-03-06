import * as React from 'react';
import { Component } from 'react';
import { IonRow, IonGrid, IonCol, IonContent, IonItem, IonRange } from '@ionic/react';

export interface ListHandlerProps {
    endpoint:string,
    clicked: (e:any) => any,
    listHeight: string
}
 
export interface ListHandlerState {
    listElements:ListElement[]
}

export interface ListElement{
    selected:boolean,
    title:string,
    subtitle:string
}

export class ListHandler extends React.Component<ListHandlerProps, ListHandlerState> {
    state:ListHandlerState = { listElements:[] }
    render() { 
        return (
            <IonContent style={{height:this.props.listHeight}}>
                <React.Suspense fallback= {(<div>Loading...</div>)}>
                    {this.state.listElements.map((result,index) =>{
                        return (
                            <IonItem key={index} button className={`${result.selected?"button-selected":""}`}  onClick={this.props.clicked.bind(this,result)}>{result.title}</IonItem>
                        );
                    })}
                </React.Suspense>
            </IonContent>
        );
    }
}
 
export default ListHandler;