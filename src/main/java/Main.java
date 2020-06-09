import cinema.config.AppConfig;
import cinema.model.CinemaHall;
import cinema.model.Movie;
import cinema.model.MovieSession;
import cinema.model.ShoppingCart;
import cinema.model.User;
import cinema.service.CinemaHallService;
import cinema.service.MovieService;
import cinema.service.MovieSessionService;
import cinema.service.OrderService;
import cinema.service.ShoppingCartService;
import cinema.service.UserService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    private static final AnnotationConfigApplicationContext context
            = new AnnotationConfigApplicationContext(AppConfig.class);

    public static void main(String[] args) {
        Movie firstMovie = new Movie();
        Movie secondMovie = new Movie();
        Movie thirdMovie = new Movie();
        firstMovie.setTitle("Fast and Furious");
        secondMovie.setTitle("War of Stars");
        thirdMovie.setTitle("Run, Forest");
        MovieService movieService = context.getBean(MovieService.class);
        movieService.add(firstMovie);
        movieService.add(secondMovie);
        movieService.add(thirdMovie);
        movieService.getAll().forEach(System.out::println);

        CinemaHall firstCinemaHall = new CinemaHall();
        firstCinemaHall.setCapacity(100);
        CinemaHall secondCinemaHall = new CinemaHall();
        secondCinemaHall.setCapacity(100);
        CinemaHallService cinemaHallService = context.getBean(CinemaHallService.class);
        cinemaHallService.add(firstCinemaHall);
        cinemaHallService.add(secondCinemaHall);
        cinemaHallService.getAll().forEach(System.out::println);

        MovieSession firstMovieSession = new MovieSession();
        firstMovieSession.setCinemaHall(firstCinemaHall);
        firstMovieSession.setMovie(firstMovie);
        LocalDate date = LocalDate.of(2020, 5, 21);
        firstMovieSession.setShowTime(LocalDateTime.of(LocalDate.of(2020, 5, 21),
                LocalTime.now()));
        MovieSessionService movieSessionService = context.getBean(MovieSessionService.class);
        movieSessionService.add(firstMovieSession);
        movieSessionService.findAvailableSessions(firstMovieSession.getId(),
                date).forEach(System.out::println);

        User user = new User();
        user.setEmail("123");
        user.setPassword("123");
        UserService userService = context.getBean(UserService.class);
        userService.add(user);
        System.out.println(userService.findByEmail("123"));

        ShoppingCartService shoppingCartService
                = context.getBean(ShoppingCartService.class);
        shoppingCartService.registerNewShoppingCart(user);
        shoppingCartService.addSession(firstMovieSession, user);
        ShoppingCart shoppingCart = shoppingCartService.getByUser(user);

        OrderService orderService = context.getBean(OrderService.class);
        orderService.completeOrder(shoppingCart.getTickets(), user);
        System.out.println(orderService.getOrderHistory(user));
        System.out.println(shoppingCart);
    }
}
