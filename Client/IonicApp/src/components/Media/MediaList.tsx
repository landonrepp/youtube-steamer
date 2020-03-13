import * as React from 'react';
import { Component } from 'react';
import {MediaListItemValues} from '../../models/MediaModels'
import { IonItem } from '@ionic/react';
import MediaListItem from './MediaListItem';

export interface MediaListProps {
    lineItems:MediaListItemValues[]
}
 
export interface MediaListState {
    
}
 
class MediaList extends React.Component<MediaListProps, MediaListState> {
    constructor(props: MediaListProps) {
        super(props);
        this.state = {
            lineItems:[]
        }
    }
    render() { 
        
        return ( 
            <div>
                {this.props.lineItems.map(item=>{
                    return <MediaListItem mediaListItemValues = {item}></MediaListItem>
                })}
            </div>
         );
    }
}
 
export default MediaList;