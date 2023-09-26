package com.stancloud.authenticationservice.config

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.ServletException
import jakarta.servlet.ServletOutputStream
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import java.io.IOException


@Component("customAuthenticationEntryPoint")
class CustomAuthenticationEntryPoint : AuthenticationEntryPoint {
//  @Throws(IOException::class, ServletException::class)
//  override fun commence(
//    request: HttpServletRequest?,
//    response: HttpServletResponse?,
//    authException: org.springframework.security.core.AuthenticationException?
//  ) {
//    val re = RestError(HttpStatus.UNAUTHORIZED.toString(), "Authentication failed")
//    response.contentType = MediaType.APPLICATION_JSON_VALUE
//    response.status = HttpServletResponse.SC_UNAUTHORIZED
//    val responseStream: OutputStream = response.outputStream
//    val mapper = ObjectMapper()
//    mapper.writeValue(responseStream, re)
//    responseStream.flush()
//  }
@Throws(IOException::class, ServletException::class)
override fun commence(
  request: HttpServletRequest?,
  response: HttpServletResponse?,
  authException: org.springframework.security.core.AuthenticationException?
) {
  val re = RestError(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED.toString(), "Authentication failed")
  response?.contentType = MediaType.APPLICATION_JSON_VALUE
  response?.status = HttpServletResponse.SC_UNAUTHORIZED
  val responseStream: ServletOutputStream? = response?.outputStream
  val mapper = ObjectMapper()
  mapper.writeValue(responseStream, re)
  responseStream?.flush()
}
}

class RestError(toString: String, s: String) {

}
