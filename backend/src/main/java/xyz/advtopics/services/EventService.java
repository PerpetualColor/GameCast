package xyz.advtopics.services;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.Game;

@Service
public class EventService{
    @Autowired
    private SessionFactory sessionFactory;

    // adds an event
    public void addEvent(String eventData, LocalDateTime eventDate){
        Session session = sessionFactory.openSession();
        Event e = new Event();
        e.setData(eventData);
        e.setDateTime(eventDate);
        session.beginTransaction();
        session.persist(e);
        session.getTransaction().commit();
        session.close();
    } 

    public void createAndAddEvent(String eventData, LocalDateTime eventDate, long gameId) {
        Session session = sessionFactory.openSession();
        Event e = new Event();
        e.setData(eventData);
        e.setDateTime(eventDate);
        
        Game g = session.get(Game.class, gameId);
        e.setGame(g);
        g.addEvents(e);

        session.beginTransaction();
        session.persist(e);
        session.update(g);
        session.getTransaction().commit();
        session.close();
    }

    // returns the event 
    public Event getEvent(long eventId){
        Session session = sessionFactory.openSession();
        Event e = session.get(Event.class, eventId);
        session.close();
        return e;
    }

    public List<Event> getEventsOfGame(long gameId) {
        Session session = sessionFactory.openSession();
        Game g = session.get(Game.class, gameId);
        // Hibernate.initialize(g.getEvents());
        // for (Event e : g.getEvents()) {
        //     Hibernate.initialize(e);
        // }
        List<Event> events = g.getEvents();
        session.close();
        return events;
    }
}
