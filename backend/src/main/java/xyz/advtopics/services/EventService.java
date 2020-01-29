package xyz.advtopics.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.Game;
import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.GameDTO;
import xyz.advtopics.objects.DTOs.TeamDTO;

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
        System.out.println("Getting event");
        Event e = session.get(Event.class, eventId);
        session.close();
        return e;
    }
}
