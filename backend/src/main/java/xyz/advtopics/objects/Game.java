package xyz.advtopics.objects;

import java.util.List;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Games")
public class Game {
    
    private long id;
    private Date dateTime;
    // private List<Team> teams;
    // private List<Event> events;

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
     * @return what happened
     */
    // public List<Team> getTeams() {
    //     return teams;
    // }

    // public void addTeams(Team team) {
    //     teams.add(team);
    // }

    // public void addEvents(Event event) {
    //     events.add(event);
    // }

    // public List<Event> getEvents() {
    //     return events;
    // }


    public Date getDateTime() {
        return dateTime;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

}