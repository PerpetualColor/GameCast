package xyz.advtopics.services;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import xyz.advtopics.objects.User;
import xyz.advtopics.objects.DTOs.UserDTO;

@Service
public class UserService {

    @Autowired
    private SessionFactory sessionFactory;

    private static boolean isValidString(String s) {
        for (Character c : s.toCharArray()) {
            if (!Character.isLetterOrDigit(c) && !" !#$%&()*+,-./:;<=>?@[]^_{}|~".contains(Character.toString(c))) {
                return false;
            }
        }
        return true;
    }

    public String getCurrentUsername() {
        if (SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken) {
            return null;
        }
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public void registerUser(UserDTO userdata) throws Exception {
        if (userdata.getUsername() == null || userdata.getPassword() == null) {
            throw new Exception("Bad user data");
        }
        if (userdata.getUsername().length() > 32 || userdata.getUsername().length() < 2) {
            throw new Exception("Username bad length");
        }
        if (!isValidString(userdata.getUsername()) || !isValidString(userdata.getPassword())) {
            throw new Exception("Bad username or password");
        }
        Session session = sessionFactory.openSession();
        if (session.get(User.class, userdata.getUsername()) != null) {
            throw new Exception("User exists");
        }
        User newUser = new User();
        newUser.setUsername(userdata.getUsername());
        String encryptedPassword = new BCryptPasswordEncoder().encode(userdata.getPassword());
        newUser.setPassword(encryptedPassword);
        newUser.setRole("USER");
        session.beginTransaction();
        session.save(newUser);
        session.getTransaction().commit();
        session.close();
    }

}