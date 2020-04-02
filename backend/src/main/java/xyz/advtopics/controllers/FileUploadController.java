package xyz.advtopics.controllers;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import xyz.advtopics.storage.StorageService;

@Controller
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @GetMapping("/getImage")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@RequestParam long teamId) {
        Resource file;
        try {
            file = storageService.loadAsResource(Long.toString(teamId) + ".png");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> handleFileUpload(@RequestParam long teamId,
            @RequestParam("file") MultipartFile file) {
        try {
            storageService.store(file, Long.toString(teamId) + ".png");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully uploaded");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}