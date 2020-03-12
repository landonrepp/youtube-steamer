import * as React from 'react';
import { Component } from 'react';
import {MediaListItemValues} from '../../models/MediaModels'

export interface MediaListProps {
    
}
 
export interface MediaListState {
    lineItems:MediaListItemValues[]
}
 
class MediaList extends React.Component<MediaListProps, MediaListState> {
    constructor(props: MediaListProps) {
        super(props);
    }
    render() { 
        return ( <div>d</div> );
        this.state = {
            lineItems:[]
        }
    }
}
 
export default MediaList;