package xyz.advtopics.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.TeamDTO;
import xyz.advtopics.services.DataService;

@RestController
public class TeamController {

    @Autowired
    private DataService dataService;

    @PostMapping("/createTeam")
    public ResponseEntity<String> createTeam(@RequestBody TeamDTO team) {
        try {
            dataService.addTeam(team);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully created team: " + team.name);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create: " + e.getMessage());
        }
    }

    @GetMapping("/getTeams")
    public ResponseEntity<List<Team>> getAllTeams() {
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dataService.getAllTeams());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}