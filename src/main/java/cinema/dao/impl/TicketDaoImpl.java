package cinema.dao.impl;

import cinema.dao.TicketDao;
import cinema.exception.DataProcessingException;
import cinema.lib.Dao;
import cinema.model.Ticket;
import cinema.util.HibernateUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;

@Dao
public class TicketDaoImpl implements TicketDao {

    private static final Logger LOGGER = Logger.getLogger(TicketDaoImpl.class);

    @Override
    public Ticket add(Ticket ticket) {
        Transaction transaction = null;
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            session.save(ticket);
            transaction.commit();
            LOGGER.info("The ticket was successfully saved into the DB");
            return ticket;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw new DataProcessingException("Can't insert ticket entity", e);
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
