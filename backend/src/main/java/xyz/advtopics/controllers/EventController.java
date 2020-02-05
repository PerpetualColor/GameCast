package xyz.advtopics.controllers;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Event;
import xyz.advtopics.services.EventService;

@RestController
public class EventController{

    @Autowired
    private EventService eventService;
    
    // server/getPlayer
    @PostMapping("/addEvent")
    public ResponseEntity<String> addEvent(){
        eventService.addEvent("example", LocalDateTime.ofInstant(Instant.ofEpochMilli(System.currentTimeMillis()), TimeZone.getTimeZone("UTC").toZoneId()));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully created event: ");
    }

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

    /**
     * @param eventData what happened
     * @param eventDate when it happened, in unix timestamp format
     * @param gameId which game it happened in
     * @return
     */
    @PostMapping("/createAndAddEvent")
    public ResponseEntity<String> createAndAddEvent(@RequestParam String eventData, @RequestParam long eventDate, @RequestParam long gameId) {
        eventService.createAndAddEvent(eventData, LocalDateTime.ofInstant(Instant.ofEpochMilli(eventDate), TimeZone.getTimeZone("UTC").toZoneId()), gameId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Success");
    }


}