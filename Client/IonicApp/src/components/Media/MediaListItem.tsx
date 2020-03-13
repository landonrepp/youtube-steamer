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
            <IonItem button color="primary" onSelect = {this.props.mediaListItemValues.onSelect}>
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
                            <IonLabel>
                                {this.props.mediaListItemValues.subtitle}
                            </IonLabel>
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