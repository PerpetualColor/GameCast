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
import xyz.advtopics.objects.User;
import xyz.advtopics.objects.DTOs.GameDTO;
import xyz.advtopics.websocket.SocketHandler;

@Service
public class GameService {
        
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private SocketHandler socketHandler;

    @Autowired
    private UserService uService;

    private boolean userIsAuthorized(Game g, String username) {
        Hibernate.initialize(g.getAuthoUsers());
        for (User u : g.getAuthoUsers()) {
            if (u.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }

    public void createGame(GameDTO gameto) {
        Session session = sessionFactory.openSession();
        User user = session.get(User.class, uService.getCurrentUsername());
        Game game = new Game();
        game.setAuthoUsers(new ArrayList<>());
        game.getAuthoUsers().add(user);

        //Set the teams 
        // for(int i = 0; i < gameto.teamIds.length;i++){
        //     Team team = session.get(Team.class, gameto.teamIds[i]);
        //     game.addTeamToGame(team);
        // }
        game.setHomeTeam(session.get(Team.class, gameto.teamIds[0]));
        game.setGuestTeam(session.get(Team.class, gameto.teamIds[1]));
        //Set the time
        game.setDateTime(gameto.dateTime);

        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();
    }

    // public void addTeamToGame(long gameID, long teamID) {
    //     Session session = sessionFactory.openSession();

    //     Game game = session.get(Game.class, gameID);
    //     Team team = session.get(Team.class, teamID);
    //     game.addTeamToGame(team);

    //     session.beginTransaction();
    //     session.persist(game);
    //     session.getTransaction().commit();
    //     session.close();
    // }

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
            Hibernate.initialize(g.getHomeTeam());
            Hibernate.initialize(g.getGuestTeam());
        }
        session.close();
        return games;
    }

    public void createAndAddEvent(String eventData, long eventDate, long gameId) {
        Session session = sessionFactory.openSession();
        Event e = new Event();
        e.setData(eventData);
        e.setDateTime(eventDate);
        
        Game g = session.get(Game.class, gameId);
        if (!userIsAuthorized(g, uService.getCurrentUsername())) {
            return;
        }
        e.setGame(g);
        g.addEvents(e);


        session.beginTransaction();
        session.persist(e);
        session.update(g);
        session.getTransaction().commit();
        session.close();
        
        e.setId(e.getId());
        socketHandler.sendToGame(g, e);
    }

    public String addAuthorizedUser(long gameId, String username) {
        Session session = sessionFactory.openSession();
        Game g = session.get(Game.class, gameId);
        if (!userIsAuthorized(g, uService.getCurrentUsername())) {
            return "Not authorized to do that";
        }
        User u = session.get(User.class, username);
        if (u == null) {
            return "No user of that username";
        }
        g.getAuthoUsers().add(u);
        session.beginTransaction();
        session.update(g);
        session.getTransaction().commit();
        session.close();
        return username;
    }

    public boolean getCanControl(long gameId) {
        Session session = sessionFactory.openSession();
        boolean canControl = userIsAuthorized(session.get(Game.class, gameId), uService.getCurrentUsername());
        session.close();
        return canControl;
    }
}