package xyz.advtopics.services;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.Team;

@Service
public class EventService {
    
    @Autowired
    private SessionFactory sessionFactory;

    public void addEvent(String data) {
        Session session = sessionFactory.openSession();
        Event e = new Event();
        e.setData(data);
        session.beginTransaction();
        session.persist(e);
        session.getTransaction().commit();
        session.close();
    }

    public void addTeam(String data) {
        Session session = sessionFactory.openSession();
        Team team = new Team();
        session.beginTransaction();
        session.persist(team);
        session.getTransaction().commit();
        session.close();
    }

}