package kpi.service.impl;

import kpi.exception.NoFreePlaceException;
import kpi.repository.ShoppingCartRepository;
import kpi.repository.TicketRepository;
import kpi.models.MovieSession;
import kpi.models.ShoppingCart;
import kpi.models.Ticket;
import kpi.models.User;
import kpi.service.ShoppingCartService;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;

    private final TicketRepository ticketRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, TicketRepository ticketRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public ShoppingCart addSession(MovieSession movieSession, User user) {
        if (movieSession.getMaxTicketCount() - movieSession.getCurrentTicketCount() > 0) {
            Ticket ticket = new Ticket();
            ticket.setUser(user);
            ticket.setMovieSession(movieSession);
            ticketRepository.save(ticket);
            ShoppingCart shoppingCart = shoppingCartRepository.findByUser(user);
            shoppingCart.getTickets().add(ticket);
            movieSession.setCurrentTicketCount(movieSession.getCurrentTicketCount() - 1);
            return shoppingCartRepository.save(shoppingCart);
        }
        else throw new NoFreePlaceException("There is no free place for this movie-session");
    }

    @Override
    public ShoppingCart getByUser(User user) {
        return shoppingCartRepository.findByUser(user);
    }

    @Override
    public void registerNewShoppingCart(User user) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUser(user);
        shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public void clear(ShoppingCart shoppingCart) {
        shoppingCart.getTickets().clear();
        shoppingCartRepository.save(shoppingCart);
    }
}
