package xyz.advtopics.services;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.advtopics.objects.Event;

@Service
public class EventService{
    @Autowired
    private SessionFactory sessionFactory;

    // adds an event
    public void addEvent(){
        Session session = sessionFactory.openSession();
        Event e = new Event();
        e.setData("Example");
        session.beginTransaction();
        session.persist(e);
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
}
