package xyz.advtopics.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

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

    public void createGame(GameDTO gameto) {
        Session session = sessionFactory.openSession();
        Game game = new Game();
        game.setTeams(new ArrayList<Team>());

        //Set the teams 
        for(int i = 0; i < gameto.teamIds.length;i++){
            Team team = session.get(Team.class, gameto.teamIds[i]);
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

    public void setEvents(long gameID, List<Event> events) {
        Session session = sessionFactory.openSession();
        Game game = session.get(Game.class, gameID);
        game.setEvents(events);
        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();
    }

    public Game getGame(long gameId) {
        Session session = sessionFactory.openSession();
        Game game = session.get(Game.class, gameId);
        Hibernate.initialize(game.getTeams());
        session.close();
        return game;
    }
    
    public List<Game> getAllGames() {
        Session session = sessionFactory.openSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Game> criteria = builder.createQuery(Game.class);
        criteria.from(Game.class);
        List<Game> games = session.createQuery(criteria).getResultList();
        for (Game g : games) {
            Hibernate.initialize(g.getTeams());
        }
        session.close();
        return games;
    }
}