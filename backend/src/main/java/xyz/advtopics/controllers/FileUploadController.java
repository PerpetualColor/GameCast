package xyz.advtopics.controllers;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.User;
import xyz.advtopics.services.UserService;
import xyz.advtopics.storage.StorageService;

@Controller
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @Autowired 
    private UserService uService;

    @Autowired
    private SessionFactory sessionFactory;

    @GetMapping("/getImage")
    @ResponseBody
    public ResponseEntity<Object> getImage(@RequestParam long teamId) {
        Resource file;
        try {
            file = storageService.loadAsResource(Long.toString(teamId) + ".png");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/png")
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Image not found");
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> handleFileUpload(@RequestParam long teamId,
            @RequestParam("file") MultipartFile file) {
        try {
            Session session = sessionFactory.openSession();
            Team t = session.get(Team.class, teamId);
            User u = session.get(User.class, uService.getCurrentUsername());
            if (!t.getOwner().getUsername().equals(u.getUsername())) {
                session.close();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are not the owner of the team");
            }
            session.close();
            storageService.store(file, Long.toString(teamId) + ".png");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully uploaded");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}