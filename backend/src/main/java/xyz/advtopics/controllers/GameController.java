package xyz.advtopics.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.Game;
import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.GameDTO;
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
    public ResponseEntity<String> createGame(@RequestBody GameDTO game) {
        gameService.createGame(game);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created");               
    }

    // unnecessary - contained in createGame
    // @PostMapping("/addTeamToGame")
    // public ResponseEntity<String> addTeamToGame(long gameID, long teamID, long groupID){
    //     Session session = sessionFactory.openSession();
        
    //     gameService.addTeamToGame(gameID, teamID);

    //     session.close();
    //     return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created"); 
    // }

    // ????
    // @PostMapping("/addEventToGame") 
    // public ResponseEntity<String> addEventToGame(long gameID, long eventID, long groupID){
    //     gameService.addEventToGame(gameID, eventID);
    //     return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created"); 
    // }

    @PostMapping("/getTeams")
    public ResponseEntity<List<Team>> getTeams(long gameID, long groupID){
        List<Team> teams = gameService.getTeams(gameID);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teams); 
    }

    @PostMapping("/getEvents")
    public ResponseEntity<List<Event>> getEvents(long gameID, long groupID){
        Session session = sessionFactory.openSession();
        
        List<Event> events = gameService.getEvents(gameID);

        session.close();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(events); 
    }

    @GetMapping("/getGame") 
    public ResponseEntity<Game> getGame(long gameId) {
        Game g = gameService.getGame(gameId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(g);
    }

    @GetMapping("/getAllGames")
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(gameService.getAllGames());
    }

    /**
     * @param eventData what happened
     * @param eventDate when it happened, in unix timestamp format
     * @param gameId which game it happened in
     * @return
     */
    @PostMapping("/createAndAddEvent")
    public ResponseEntity<String> createAndAddEvent(@RequestParam String eventData, @RequestParam long eventDate, @RequestParam long gameId) {
        gameService.createAndAddEvent(eventData, eventDate, gameId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Success");
    }

    @PostMapping("/addAuthorizedUser")
    public ResponseEntity<String> addAuthorizedUser(@RequestParam long gameId, @RequestParam String username) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(gameService.addAuthorizedUser(gameId, username));
    }

}