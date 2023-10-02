package com.stancloud.insuranceapplications.response;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Optional;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<ExceptionTemplate> handleCustomException(CustomException e) {
    return ResponseEntity.status(e.getHttpStatus()).body(new ExceptionTemplate(e.getHttpStatus().toString(), e.getMessage()));
  }

  @ExceptionHandler(NullPointerException.class)
  public ResponseEntity<CustomException> nullPointerException(final NullPointerException e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));

  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity dataIntegrityViolationException(final DataIntegrityViolationException e) {
    log.error(e.getCause().getCause().getMessage());
    return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.BAD_REQUEST);
  }

  private ResponseEntity error(final Exception exception, final HttpStatus httpStatus) {
    final String message = Optional.ofNullable(exception.getMessage()).orElse(exception.getClass().getSimpleName());
    return new ResponseEntity<>(message, httpStatus);
  }
}
