package cinema.dao.impl;

import cinema.dao.CinemaHallDao;
import cinema.exception.DataProcessingException;
import cinema.lib.Dao;
import cinema.model.CinemaHall;
import cinema.util.HibernateUtil;
import java.util.List;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

@Dao
public class CinemaHallDaoImpl implements CinemaHallDao {
    private static final Logger LOGGER = Logger.getLogger(CinemaHallDaoImpl.class);

    @Override
    public CinemaHall add(CinemaHall cinemaHall) {
        Transaction transaction = null;
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            session.save(cinemaHall);
            transaction.commit();
            LOGGER.info("The cinemaHall was successfully saved into the DB");
            return cinemaHall;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw new DataProcessingException("Can't insert cinemaHall entity", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    @Override
    public List<CinemaHall> getAll() {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            Query<CinemaHall> query = session.createQuery("from CinemaHall", CinemaHall.class);
            LOGGER.info("CinemaHalls were successfully retrieved from the DB");
            return query.list();
        } catch (Exception e) {
            throw new DataProcessingException("Error retrieving all cinemaHalls", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
