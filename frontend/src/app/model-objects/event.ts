export class Event {
    id: number;
    data: string;
    dateTime: Date;

    public toString = () : string => {
        return this.data;
    }
}
