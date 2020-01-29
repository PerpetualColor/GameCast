package xyz.advtopics.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.TeamDTO;
import xyz.advtopics.services.TeamService;

@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/createTeam")
    public ResponseEntity<String> createTeam(@RequestBody TeamDTO teamdto) {
        teamService.createTeam(teamdto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Accepted");
    }

    @GetMapping("/getTeam")
    public ResponseEntity<Team> getTeam(@RequestParam long teamID) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(teamService.getTeam(teamID));
    }

}