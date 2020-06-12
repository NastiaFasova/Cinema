package cinema.dao.impl;

import cinema.dao.MovieDao;
import cinema.exception.DataProcessingException;
import cinema.model.Movie;
import java.util.List;
import java.util.Optional;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MovieDaoImpl implements MovieDao {
    private static final Logger LOGGER = Logger.getLogger(MovieDaoImpl.class);

    private final SessionFactory sessionFactory;

    public MovieDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public Movie add(Movie movie) {
        Transaction transaction = null;
        Session session = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.beginTransaction();
            session.save(movie);
            transaction.commit();
            LOGGER.info("The movie was successfully saved into the DB");
            return movie;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw new DataProcessingException("Can't insert movie entity", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public List<Movie> getAll() {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            Query<Movie> query = session.createQuery("from Movie", Movie.class);
            LOGGER.info("Movies were successfully retrieved from the DB");
            return query.list();
        } catch (Exception e) {
            throw new DataProcessingException("Error retrieving all movies", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public Optional<Movie> getByTitle(String title) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            Query<Movie> query = session.createQuery("from Movie m where m.title =: title",
                    Movie.class);
            query.setParameter("title", title);
            LOGGER.info("CinemaHall was successfully retrieved from the DB");
            return Optional.ofNullable(query.uniqueResult());
        } catch (Exception e) {
            throw new DataProcessingException("Error retrieving the cinemaHall", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
