package xyz.advtopics.objects;

import java.util.Arrays;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Games")
public class Game {
    
    private long id;
    private long dateTime;
    private List<Event> events;
    private List<User> authoUsers;
    private Team homeTeam;
    private Team guestTeam;

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
    @Transient
    @JsonGetter(value="teams")
    public List<Team> getTeams() {
        return Arrays.asList(homeTeam, guestTeam);
    }

    public void addEvents(Event event) {
        events.add(event);
    }

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public List<Event> getEvents() {
        return events;
    }

    public long getDateTime() {
        return dateTime;
    }

    public void setDateTime(long dateTime) {
        this.dateTime = dateTime;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name="game_users", joinColumns=@JoinColumn(name="game_id"), inverseJoinColumns=@JoinColumn(name="user_id"))
    @JsonIgnore
    public List<User> getAuthoUsers() {
        return authoUsers;
    }

    public void setAuthoUsers(List<User> authoUsers) {
        this.authoUsers = authoUsers;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    public Team getGuestTeam() {
        return guestTeam;
    }

    public void setGuestTeam(Team guestTeam) {
        this.guestTeam = guestTeam;
    }

}