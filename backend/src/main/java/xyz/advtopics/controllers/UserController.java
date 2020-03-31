package xyz.advtopics.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.DTOs.UserDTO;
import xyz.advtopics.services.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userdata) {
        try {
            userService.registerUser(userdata);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userdata.getUsername());
    }

    @RequestMapping("/loginsuccess")
    public String getLoginSuccessMessage() {
        return userService.getCurrentUsername();
    }

    @RequestMapping("/loginfailure")
    public String getLoginFailureMessage() {
        return "Login Failed";
    }

    @RequestMapping("/logoutsuccess")
    public String getLogoutSuccessMessage() {
        return "Logout successful";
    }

    @GetMapping("/getLoggedIn")
    public ResponseEntity<String> getLoggedIn() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.getCurrentUsername());
    }
}