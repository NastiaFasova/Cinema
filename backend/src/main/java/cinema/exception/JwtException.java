package cinema.exception;

public class JwtException extends RuntimeException {
    public JwtException(String message, Exception e) {
        super(message, e);
    }
}
