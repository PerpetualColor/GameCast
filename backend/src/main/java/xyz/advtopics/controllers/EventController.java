package xyz.advtopics.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Event;
import xyz.advtopics.services.EventService;

@RestController
public class EventController{

    @Autowired
    private EventService eventService;
    
    // server/getPlayer
    // @PostMapping("/addEvent")
    // public ResponseEntity<String> addEvent(){
    //     eventService.addEvent("example", System.currentTimeMillis());
    //     return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully created event: ");
    // }

    // returns the event
    @GetMapping("/getEvent")
    public ResponseEntity<Event> getEvent(@RequestParam long eventId){
        Event e = eventService.getEvent(eventId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(e);
    }

    @GetMapping("/getEventsOfGame")
    public ResponseEntity<List<Event>> getEventsOfGame(@RequestParam long gameId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(eventService.getEventsOfGame(gameId));
    }

}