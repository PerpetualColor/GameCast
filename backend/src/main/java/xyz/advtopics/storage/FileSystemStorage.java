package xyz.advtopics.storage;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileSystemStorage implements StorageService {
    
    private final static Path baseDir = Paths.get("../../../img-uploads");

    @Override
    public void init() {
        File directory = new File(baseDir.toString());
        if (!directory.exists()) {
            directory.mkdir();
        }
        System.out.println("Created " + directory.getAbsolutePath());
    }

    @Override
    public void store(MultipartFile file) throws Exception {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new Exception("Failed to store file: empty");
            }
            if (filename.contains("..")) {
                throw new Exception("File contains relative path");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, baseDir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (Exception e) {
            throw new Exception("Failed to store: " + e.getMessage());
        }
    }

    @Override
    public void store(MultipartFile file, String filename) throws Exception {
        filename = StringUtils.cleanPath(filename);
        try {
            if (file.isEmpty()) {
                throw new Exception("Failed to store file: empty");
            }
            if (filename.contains("..")) {
                throw new Exception("File contains relative path");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, baseDir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (Exception e) {
            throw new Exception("Failed to store: " + e.getMessage());
        }

    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public Path load(String filename) {
        return baseDir.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) throws Exception {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new Exception("Failed to load resource");
            }
        } catch (Exception e) {
            throw new Exception("Could not load resource: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {

    }

}