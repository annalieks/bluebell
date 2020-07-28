package com.bluebell.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public final class Handler extends RuntimeException {

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<Object> handleApplicationIOException(MessageNotFoundException e) {
        return  ResponseEntity
                .status(404)
                .body("Message not found");
    }

}
