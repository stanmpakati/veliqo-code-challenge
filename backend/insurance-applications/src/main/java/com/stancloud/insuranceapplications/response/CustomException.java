package com.stancloud.insuranceapplications.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class CustomException extends RuntimeException {
  private HttpStatus httpStatus;
  private String message;

  public static CustomException notFound(String message) {
    return new CustomException(HttpStatus.NOT_FOUND, message);
  }
  public static CustomException badRequest(String message) {
    return new CustomException(HttpStatus.BAD_REQUEST, message);
  }
}
