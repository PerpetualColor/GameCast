package xyz.advtopics.objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Players")
public class Player{

    private long id;
    private int number;
    private String name;
    // private int ranking; (may or may not be used)
    private Team team;


    public Player(int number, String name, String teamName /*,int ranking*/){
        this.number = number;
        this.name = name;
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

    // @return the player's number
    public int getNumber(){
        return number;
    }

    //@return the player name
    public String getName(){
        return name;
    }

    // hypothetically returns the ranking of the player
    // public int getRanking(){
    // }

    // changes the number
    public void changeNumber(int newNum){
        number = newNum;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
