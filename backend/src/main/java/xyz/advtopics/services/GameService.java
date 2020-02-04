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

@Service
public class GameService {
        
    @Autowired
    private SessionFactory sessionFactory;

    public void createGame() {
        Session session = sessionFactory.openSession();
        Game game = new Game();

        List<Team> teams = new ArrayList<Team>();
        game.setTeams(teams);
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
        List<Team> teams = game.getTeams();
        Hibernate.initialize(game.getTeams());
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

    
}