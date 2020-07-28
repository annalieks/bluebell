package com.bluebell.backend.exception;


public class MessageNotFoundException extends RuntimeException  {
    public MessageNotFoundException() { }

    public MessageNotFoundException(String message) { super(message); }
}
