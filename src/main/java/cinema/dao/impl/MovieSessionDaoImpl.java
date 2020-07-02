package cinema.dao.impl;

import cinema.dao.MovieSessionDao;
import cinema.exception.DataProcessingException;
import cinema.model.MovieSession;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MovieSessionDaoImpl implements MovieSessionDao {
    private static final Logger LOGGER = Logger.getLogger(MovieSessionDaoImpl.class);

    private final SessionFactory sessionFactory;

    public MovieSessionDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<MovieSession> getAvailableSessions(Long movieId, LocalDate date) {
        try (Session session = sessionFactory.openSession()) {
            Query<MovieSession> query = session.createQuery(
                    "from MovieSession ms JOIN FETCH ms.movie m JOIN FETCH ms.cinemaHall c "
                            + "where m.id = :movieId "
                            + "and ms.showTime > :dateStart "
                            + "and ms.showTime < :dateEnd", MovieSession.class);
            query.setParameter("movieId", movieId);
            query.setParameter("dateStart", date.atStartOfDay());
            query.setParameter("dateEnd", date.atTime(LocalTime.MAX));
            LOGGER.info("All the available movieSessions were "
                    + "successfully retrieved from the DB");
            return query.list();
        } catch (Exception e) {
            throw new DataProcessingException("Error retrieving all available MovieSession", e);
        }
    }

    @Override
    public MovieSession add(MovieSession movieSession) {
        Transaction transaction = null;
        Session session = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.beginTransaction();
            session.save(movieSession);
            transaction.commit();
            LOGGER.info("The movieSession was successfully saved into the DB");
            return movieSession;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw new DataProcessingException("Can't insert movieSession entity", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public Optional<MovieSession> get(Long id) {
        try (Session session = sessionFactory.openSession()) {
            MovieSession movieSession = session.get(MovieSession.class, id);
            LOGGER.info("The shoppingCart was successfully retrieved by its ID");
            return Optional.ofNullable(movieSession);
        } catch (Exception e) {
            throw new DataProcessingException("Error retrieving the shoppingCart by user", e);
        }
    }
}
