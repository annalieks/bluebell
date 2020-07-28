package com.bluebell.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public final class Handler extends RuntimeException {

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<Object> handleMessageNotFoundException(MessageNotFoundException e) {
        return  ResponseEntity
                .status(404)
                .body("Message not found");
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException e) {
        return  ResponseEntity
                .status(404)
                .body("User not found");
    }

}
