package com.stancloud.authenticationservice.response

import org.springframework.http.HttpStatus

class CustomException(
  val httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  val errorMessage: String? = null,
  val errors: List<String> = listOf(),
) : RuntimeException() {
  companion object {
    private const val serialVersionUID = 1L
  }

}