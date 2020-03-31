package xyz.advtopics;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.service.ServiceRegistry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
    }

    /**
     * 
     * @return A Hibernate session factory. Use it to open sessions for interacting with the database.
     */
    @Bean
    public SessionFactory sessionFactory() {
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().configure().configure("mappings.cfg.xml").build();
        SessionFactory sessionFactory = new MetadataSources(serviceRegistry).buildMetadata().buildSessionFactory();
        return sessionFactory;
    }

    @Bean
    public ObjectMapper includeTransientObjectMapper() {
        Hibernate5Module hibernate5Module = new Hibernate5Module();
        hibernate5Module.disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(hibernate5Module);
        return mapper;
    }
}
