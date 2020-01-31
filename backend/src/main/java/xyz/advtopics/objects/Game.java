package xyz.advtopics.objects;

import java.util.List;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Games")
public class Game {
    
    private long id;
    private Date dateTime;
    private List<Team> teams;
    private List<Event> events;

    public Game() {
    }

    /**
     * @return the id
     */
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public long getId() {
        return id;
    }

    /**
     * @param id the id to be set
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * @return teams playing in the game
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "game_teams")
    public List<Team> getTeams() {
        return teams;
    }

    public void addTeamToGame(Team team) {
        teams.add(team);
    }

    public void addEvents(Event event) {
        events.add(event);
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "game_events")
    public List<Event> getEvents() {
        return events;
    }


    @Temporal(TemporalType.TIMESTAMP)
    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

}