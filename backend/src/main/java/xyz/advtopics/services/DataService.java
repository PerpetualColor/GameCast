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
public class DataService {
    
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

    public void addTeam(TeamDTO teamInfo) {
        Session session = sessionFactory.openSession();
        Team team = new Team();
        team.setName(teamInfo.name);
        session.beginTransaction();
        session.persist(team);
        session.getTransaction().commit();
        session.close();
    }

    public void createGame(GameDTO gameInfo) {
        Session session = sessionFactory.openSession();
        Game game = new Game();
        game.setDateTime(gameInfo.dateTime);
        List<Team> teams = new ArrayList<Team>();
        for (int i : gameInfo.teamIds) {
            teams.add(session.get(Team.class, i));
        }
        game.setTeams(teams);
        session.beginTransaction();
        session.persist(game);
        session.getTransaction().commit();
        session.close();
    }

    public List<Team> getAllTeams() {
        Session session = sessionFactory.openSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Team> criteria = builder.createQuery(Team.class);
        criteria.from(Team.class);
        List<Team> teams = session.createQuery(criteria).getResultList();
        return teams;
    }

    public void addEvent(Event event) {
        
    }
}