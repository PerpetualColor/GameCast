package xyz.advtopics.controllers;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.advtopics.objects.Game;

@RestController
public class HelloController {

    @Autowired
    // private SessionFactory sessionFactory;

    @RequestMapping("/helloworld")
    public String greet() {
        // Session session = sessionFactory.openSession();
        // session.beginTransaction();
        // for (long i = 1; i <= 3; i++) {
        //     Game g = session.get(Game.class, i);
        //     session.delete(g);
        // }
        // session.getTransaction().commit();
        // session.close();
        return "Hello World!";
    }
}