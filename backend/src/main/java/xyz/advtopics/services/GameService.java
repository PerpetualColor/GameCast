package xyz.advtopics.services;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.advtopics.objects.Event;
import xyz.advtopics.objects.Game;
import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.GameDTO;

@Service
public class GameService {
        
    @Autowired
    private SessionFactory sessionFactory;

    public void createGame(GameDTO gameto, long gameID) {
        Session session = sessionFactory.openSession();
        Game game = new Game();
        List<Team> teams = new ArrayList<Team>();

        //Set the teams 
        for(int i = 0; i < gameto.teamIds.length;i++){
            Team team = session.get(Team.class, gameID);
            game.addTeamToGame(team);
        }
        //Set the time
        game.setDateTime(gameto.dateTime);

        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();
    }

    public void addTeamToGame(long gameID, long teamID) {
        Session session = sessionFactory.openSession();

        Game game = session.get(Game.class, gameID);
        Team team = session.get(Team.class, teamID);
        game.addTeamToGame(team);

        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();

    }

    public void addEvent(long gameID, long eventID) {
        Session session = sessionFactory.openSession();
        Game game = session.get(Game.class, gameID);
        Event event = session.get(Event.class, eventID);
        game.addEvents(event);

        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();
    }

    public List<Team> getTeams(long gameID) {
        Session session = sessionFactory.openSession();
        Game game = session.get(Game.class, gameID);
        Hibernate.initialize(game.getTeams());
        List<Team> teams = game.getTeams();
<<<<<<< HEAD
        Hibernate.initialize(game.getTeams());
=======
>>>>>>> 463900bf2be9d0e8e5ec599b6596fbef2af11f64
        session.close();
        
        return teams;
    }

    public List<Event> getEvents(long gameID) {
        Session session = sessionFactory.openSession();
        Game game = session.get(Game.class, gameID);
        List<Event> events = game.getEvents();
        session.close();
        
        return events;
    }

<<<<<<< HEAD
    
=======
    public void setEvents(long gameID, List<Event> events) {
        Session session = sessionFactory.openSession();
        Game game = session.get(Game.class, gameID);
        game.setEvents(events);
        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();
    }
>>>>>>> 463900bf2be9d0e8e5ec599b6596fbef2af11f64
}