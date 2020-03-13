import * as React from 'react';
import { IonThumbnail, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { MediaListItemValues, Video } from '../../models/MediaModels';


export interface MediaListItemProps {
    mediaListItemValues:MediaListItemValues
}
 
export interface MediaListItemState {
    
}
 
class MediaListItem extends React.Component<MediaListItemProps, MediaListItemState> {
    constructor(props: MediaListItemProps) {
        super(props);
    }
    render() { 
        return ( 
            <IonItem button color={this.props.mediaListItemValues.selected?"primary":"secondary"} onClick = {()=>{
                console.log("got here");
                (this.props.mediaListItemValues.onSelect || function (){})()
            }}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="2">
                            <IonThumbnail item-start>
                                <IonImg src={this.props.mediaListItemValues.image} />
                            </IonThumbnail>
                        </IonCol>
                        <IonCol>
                            <IonLabel>
                                {this.props.mediaListItemValues.title}
                            </IonLabel>
                            <p style={{fontSize:"10px"}}>
                                By - {this.props.mediaListItemValues.subtitle}
                            </p>
                        </IonCol>
                        <IonCol>

                        </IonCol>
                    </IonRow>
                </IonGrid>
          </IonItem>
        );
    }
}
 
export default MediaListItem;