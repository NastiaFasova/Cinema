package cinema.dao.impl;

import cinema.dao.MovieSessionDao;
import cinema.exception.DataProcessingException;
import cinema.lib.Dao;
import cinema.model.MovieSession;
import cinema.util.HibernateUtil;
import java.time.LocalDate;
import java.util.List;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

@Dao
public class MovieSessionDaoImpl implements MovieSessionDao {
    private static final Logger LOGGER = Logger.getLogger(MovieSessionDaoImpl.class);

    @Override
    public List<MovieSession> findAvailableSessions(Long movieId, LocalDate date) {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            Query<MovieSession> query = session.createQuery("from MovieSession "
                    + "where movie.id = :movieId and showTime = : showTime", MovieSession.class);
            query.setParameter("movieId", movieId);
            query.setParameter("showTime", date.atStartOfDay());
            LOGGER.info("All the available movieSessions were "
                    + "successfully retrieved from the DB");
            return query.list();
        } catch (Exception e) {
            throw new DataProcessingException("Error retrieving all available MovieSession", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public MovieSession add(MovieSession movieSession) {
        Transaction transaction = null;
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
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
}
