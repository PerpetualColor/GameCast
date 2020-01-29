package xyz.advtopics.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.property.ResourceExistsPropertyDefiner;
import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.DTOs.GameDTO;
import xyz.advtopics.services.EventService;

@RestController
public class EventController{

    @Autowired
    private EventService eventService;
    
    // server/getPlayer
    @PostMapping("/addEvent")
    public ResponseEntity<String> addEvent(){
        eventService.addEvent();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully created event: ");
    }

    // returns the event
    @PostMapping("/getEvent")
    public ResponseEntity<String> getEvent(@RequestParam long eventId){
        eventService.getEvent(eventId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Event successfully returned");
    }


}