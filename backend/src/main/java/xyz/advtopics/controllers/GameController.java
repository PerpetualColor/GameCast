package xyz.advtopics.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.DTOs.GameDTO;

@RestController
public class GameController {
    
    @PostMapping("/createGame")
    public ResponseEntity<String> createGame(@RequestBody GameDTO gameInfo) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Created");
    }

}