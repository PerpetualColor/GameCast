export class Event {
    id: number;
    data: string;
    dateTime: any;

    public toString = () : string => {
        return this.data;
    }
}
