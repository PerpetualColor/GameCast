package xyz.advtopics.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.Team;
import xyz.advtopics.services.GameService;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

@RestController
public class GameController {
    @Autowired 
    private GameService gameService;
    
    @Autowired
    private SessionFactory sessionFactory;

    //Doesn't this need some form of name?
    @PostMapping("/createGame")
    public ResponseEntity<String> createGame() {
        gameService.createGame();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created");               
    }

    @PostMapping("/addTeamToGame")
    public ResponseEntity<String> addTeamToGame(long gameID, long teamID, long groupID){
        Session session = sessionFactory.openSession();
        
        gameService.addTeamToGame(gameID, teamID);

        session.close();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created"); 
    }

    @PostMapping("/addEventToGame") 
    public ResponseEntity<String> addEventToGame(long gameID, long eventID, long groupID){
        Session session = sessionFactory.openSession();
        
        gameService.addTeamToGame(gameID, eventID);

        session.close();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created"); 
    }

    @PostMapping("/getTeams")

    public ResponseEntity<List<Team>> getTeams(long gameID, long groupID){
        Session session = sessionFactory.openSession();
        
        List<Team> teams = gameService.getTeams(gameID);

        session.close();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teams); 
    }

    @PostMapping("/getEvents")
    public ResponseEntity<List<Event>> getEvents(long gameID, long groupID){
        Session session = sessionFactory.openSession();
        
        List<Event> events = gameService.getEvents(gameID);

        session.close();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(events); 
    }




}