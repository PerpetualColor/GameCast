package xyz.advtopics.objects;
//Author: Robert Walker

import java.util.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Teams")
public class Team {
    private long id;
    private List<Player> players;
    private String name;

    public Team() {
    }

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

    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER)
    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}