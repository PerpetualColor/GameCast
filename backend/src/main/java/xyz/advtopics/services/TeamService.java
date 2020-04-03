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
import xyz.advtopics.objects.User;
import xyz.advtopics.objects.DTOs.TeamDTO;

@Service
public class TeamService {
    
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private UserService uService;

    public Team createTeam(TeamDTO teamdto) {
        Session session = sessionFactory.openSession();
        Team t = new Team();
        t.setPlayers(new ArrayList<Player>());
        t.setName(teamdto.name);
        User owner = session.get(User.class, uService.getCurrentUsername());
        if (owner == null) {
            session.close();
            return null;
        }
        t.setOwner(owner);

        session.beginTransaction();
        session.persist(t);
        session.getTransaction().commit();
        session.close();
        return t;
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

    // public void createAndAddPlayer(String name, int number, long teamId) {
    //     Session session = sessionFactory.openSession();
    //     Player p = new Player();
    //     p.setName(name);
    //     p.setNumber(number);
    //     Team t = session.get(Team.class, teamId);
    //     p.setTeam(t);

    //     session.beginTransaction();
    //     session.persist(p);
    //     session.getTransaction().commit();
    //     session.close();
    // }

    public void updateRoster(Player[] roster, long teamId) {
        Session session = sessionFactory.openSession();
        Team t = session.get(Team.class, teamId);
        User u = session.get(User.class, uService.getCurrentUsername());
        if (!t.getOwner().getUsername().equals(u.getUsername())) {
            session.close();
            return;
        }
        session.beginTransaction();
        for (Player p : roster) {
            if (p.getId() >= 0) {
                Player old = session.get(Player.class, p.getId());
                if (!old.getName().equals(p.getName()) || old.getNumber() != p.getNumber()) {
                    old.setName(p.getName());
                    old.setNumber(p.getNumber());
                    session.update(old);
                }
            } else {
                Player newPlayer = new Player(p.getNumber(), p.getName());
                newPlayer.setTeam(t);
                session.persist(newPlayer);
            }
        }

        session.getTransaction().commit();
        session.close();
    }

    public boolean getCanEditTeam(long teamId) {
        Session session = sessionFactory.openSession();
        Team t = session.get(Team.class, teamId);
        boolean e = (t.getOwner().getUsername().equals(uService.getCurrentUsername()));

        session.close();
        return e;
    }

}