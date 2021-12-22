package kpi.controllers;

import kpi.models.MovieSession;
import kpi.models.ShoppingCart;
import kpi.models.User;
import kpi.models.dto.response.ShoppingCartResponseDto;
import kpi.models.mapper.ShoppingCartMapper;
import kpi.service.MovieSessionService;
import kpi.service.ShoppingCartService;
import kpi.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shopping-carts")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;
    private final UserService userService;
    private final MovieSessionService movieSessionService;
    private final ShoppingCartMapper shoppingCartMapper;

    public ShoppingCartController(ShoppingCartService shoppingCartService,
                                  UserService userService,
                                  MovieSessionService movieSessionService,
                                  ShoppingCartMapper shoppingCartMapper) {
        this.shoppingCartService = shoppingCartService;
        this.userService = userService;
        this.movieSessionService = movieSessionService;
        this.shoppingCartMapper = shoppingCartMapper;
    }

    @PostMapping("/add-movie-session")
    public ShoppingCartResponseDto addMovieSession(Authentication authentication, Long movieSessionId) {
        User user = userService.getByEmail(authentication.getName());
        MovieSession movieSession = movieSessionService.get(movieSessionId);
        return shoppingCartMapper.getShoppingCartResponseDto(shoppingCartService
                .addSession(movieSession, user));
    }

    @GetMapping("/by-user")
    public ShoppingCartResponseDto getShoppingCartBuUserId(Authentication authentication) {
        User user = userService.getByEmail(authentication.getName());
        ShoppingCart shoppingCart = shoppingCartService.getByUser(user);
        return shoppingCartMapper.getShoppingCartResponseDto(shoppingCart);
    }
}
