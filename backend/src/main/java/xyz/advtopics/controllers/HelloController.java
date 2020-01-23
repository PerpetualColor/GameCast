package xyz.advtopics.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.services.EventService;

@RestController
public class HelloController {

    @Autowired
    private EventService eventService;

    @RequestMapping("/helloworld")
    public String greet() {
        eventService.addTeam("Hello");
        return "Hello World!";
    }
}