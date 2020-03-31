package xyz.advtopics.config;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;

import xyz.advtopics.objects.User;

public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // get the user
        Session session = sessionFactory.openSession();
        User user = session.get(User.class, username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        UserBuilder userBuilder = org.springframework.security.core.userdetails.User.withUsername(username);
        userBuilder.password(user.getPassword());
        userBuilder.roles("USER");

        return userBuilder.build();

    }
    
}