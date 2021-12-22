package kpi.exception;

public class NoFreePlaceException extends RuntimeException {
    public NoFreePlaceException(String message) {
        super(message);
    }
}
