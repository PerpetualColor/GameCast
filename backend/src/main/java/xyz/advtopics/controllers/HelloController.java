package xyz.advtopics.controllers;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/helloworld")
    public String greet() {
        // Session session = sessionFactory.openSession();
        // session.beginTransaction();
        // User u = session.get(User.class, "nolan");
        // for (long i = 1; i <= 14; i++) {
        //     Team g = session.get(Team.class, i);
        //     g.setOwner(u);
        //     session.update(g);
        // }
        // session.getTransaction().commit();
        // session.close();
        return "Hello World!";
    }
}