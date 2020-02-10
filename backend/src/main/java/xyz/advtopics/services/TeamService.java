package xyz.advtopics.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import xyz.advtopics.objects.Player;
import xyz.advtopics.objects.Team;
import xyz.advtopics.objects.DTOs.TeamDTO;

@Service
public class TeamService {
    
    @Autowired
    private SessionFactory sessionFactory;

    public void createTeam(TeamDTO teamdto) {
        Session session = sessionFactory.openSession();
        Team t = new Team();
        t.setPlayers(new ArrayList<Player>());
        t.setName(teamdto.name);

        session.beginTransaction();
        session.persist(t);
        session.getTransaction().commit();
        session.close();
    }

    public Team getTeam(@RequestParam long teamID) {
        Session session = sessionFactory.openSession();
        Team team = session.get(Team.class, teamID);
        session.close();
        return team;
    }

    public List<Team> getAllTeams() {
        Session session = sessionFactory.openSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Team> criteria = builder.createQuery(Team.class);
        criteria.from(Team.class);
        List<Team> teams = session.createQuery(criteria).getResultList();
        session.close();
        return teams;
    }

    public void createAndAddPlayer(String name, int number, long teamId) {
        Session session = sessionFactory.openSession();
        Player p = new Player();
        p.setName(name);
        p.setNumber(number);
        Team t = session.get(Team.class, teamId);
        p.setTeam(t);

        session.beginTransaction();
        session.persist(p);
        session.getTransaction().commit();
        session.close();
    }

}