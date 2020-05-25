import cinema.lib.Injector;
import cinema.model.CinemaHall;
import cinema.model.Movie;
import cinema.model.MovieSession;
import cinema.model.User;
import cinema.service.CinemaHallService;
import cinema.service.MovieService;
import cinema.service.MovieSessionService;
import cinema.service.UserService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Main {
    private static Injector injector = Injector.getInstance("cinema");

    public static void main(String[] args) {
        Movie firstMovie = new Movie();
        Movie secondMovie = new Movie();
        Movie thirdMovie = new Movie();
        firstMovie.setTitle("Fast and Furious");
        secondMovie.setTitle("War of Stars");
        thirdMovie.setTitle("Run, Forest");
        MovieService movieService = (MovieService) injector.getInstance(MovieService.class);
        movieService.add(firstMovie);
        movieService.add(secondMovie);
        movieService.add(thirdMovie);

        movieService.getAll().forEach(System.out::println);

        CinemaHall firstCinemaHall = new CinemaHall();
        firstCinemaHall.setCapacity(100);
        CinemaHall secondCinemaHall = new CinemaHall();
        secondCinemaHall.setCapacity(100);

        CinemaHallService cinemaHallService = (CinemaHallService)
                injector.getInstance(CinemaHallService.class);
        cinemaHallService.add(firstCinemaHall);
        cinemaHallService.add(secondCinemaHall);
        cinemaHallService.getAll().forEach(System.out::println);

        MovieSession firstMovieSession = new MovieSession();
        firstMovieSession.setCinemaHall(firstCinemaHall);
        firstMovieSession.setMovie(firstMovie);
        LocalDate date = LocalDate.of(2020, 5, 21);
        firstMovieSession.setShowTime(LocalDateTime.of(LocalDate.of(2020, 5, 21),
                LocalTime.now()));
        MovieSessionService movieSessionService = (MovieSessionService)
                injector.getInstance(MovieSessionService.class);
        movieSessionService.add(firstMovieSession);
        movieSessionService.findAvailableSessions(firstMovieSession.getId(),
                date).forEach(System.out::println);

        User user = new User();
        user.setEmail("123");
        user.setPassword("123");
        UserService userService = (UserService) injector.getInstance(UserService.class);
        userService.add(user);
        System.out.println(userService.findByEmail("123"));
    }
}
