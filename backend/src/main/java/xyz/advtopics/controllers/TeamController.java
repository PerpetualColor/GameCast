package xyz.advtopics.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Player;
import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.TeamDTO;
import xyz.advtopics.services.TeamService;

@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/createTeam")
    public ResponseEntity<String> createTeam(@RequestBody TeamDTO teamdto) {
        long id = teamService.createTeam(teamdto).getId();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Long.toString(id));
    }

    @GetMapping("/getTeam")
    public ResponseEntity<Team> getTeam(@RequestParam long teamID) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teamService.getTeam(teamID));
    }

    @GetMapping("/getAllTeams")
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teamService.getAllTeams());
    }

    // @PostMapping("/createAndAddPlayer")
    // public ResponseEntity<String> createAndAddPlayer(@RequestParam String name, @RequestParam int number, @RequestParam long teamId) {
    //     teamService.createAndAddPlayer(name, number, teamId);
    //     return ResponseEntity.status(HttpStatus.ACCEPTED).body("Success");
    // }

    @PostMapping("/updateRoster")
    public ResponseEntity<String> updateRoster(@RequestBody Player[] roster, @RequestParam long teamId) {
        teamService.updateRoster(roster, teamId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Success");
    }

    @GetMapping("/getCanEditTeam")
    public ResponseEntity<Boolean> getCanEditTeam(@RequestParam long teamId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teamService.getCanEditTeam(teamId));
    }

}