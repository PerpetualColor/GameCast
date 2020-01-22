package xyz.advtopics.objects;
import java.util.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

public class Team {
    private long id;
    private String teamName;
    private ArrayList<Player> players;

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

    public void addPlayer(Player player){
        players.add(player);
    }
    public void removePlayer(Player player) {
        players.remove(player);
    }
}