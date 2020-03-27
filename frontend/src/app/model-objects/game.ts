import { Team } from './team';
import { Event } from './event';

export class Game {
    id: number;
    dateTime: Date | number;
    teams: Team[];
    events: Event[];
}