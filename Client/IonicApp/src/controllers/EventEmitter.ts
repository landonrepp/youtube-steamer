export class EventEmitter{
    private events:any = {};
    constructor(){
        //todo: use this to type events for intellesense?
    }
    dispatch = (event:string, data:any) => {
        if(!this.events[event]) return;
        this.events[event].forEach((callback:(x:any)=>any) => {
            callback(data);
        });
    };

    subscribe = (event:string, callback:(x:any)=>any)=>{
        console.log(`Event subscribed: ${event}`);
        if(!this.events[event]) this.events[event] = []
        this.events[event].push(callback);
    };
}