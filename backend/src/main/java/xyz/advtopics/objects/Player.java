package xyz.advtopics.objects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Player")
public class Player{

    private int number;
    private String name;
    // private int ranking; (may or may not be used)
    private String teamName;


    public Player(int number, String name, String teamName /*,int ranking*/){
        this.number = number;
        this.name = name;
        // this.ranking = ranking;
        this.teamName = teamName;
    }

    /**
     * @return the id
     */
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")

    // @return the player's number
    public int getNumber(){
        return number;
    }

    //@return the player name
    public String getName(){
        return name;
    }

    //hypothetically returns the ranking of the player
    // public int getRanking(){
    // }

    // @return the teamName
    public String getTeamName(){
        return teamName;
    }

    // changes the number
    public void changeNumber(int newNum){
        number = newNum
    }
}

