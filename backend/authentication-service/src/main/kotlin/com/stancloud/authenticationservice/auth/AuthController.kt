package com.stancloud.authenticationservice.auth

import com.stancloud.authenticationservice.dto.LoginRequest
import com.stancloud.authenticationservice.dto.LoginResponse
import com.stancloud.authenticationservice.dto.SignupRequest
import com.stancloud.authenticationservice.dto.UserDto
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
  private val authService: AuthService,
) {

  @PostMapping("/signup")
  fun signup(
    @Valid @RequestBody request: SignupRequest,
  ): UserDto {
    return authService.signup(request)
  }

  @PostMapping("/login")
  fun login(
    @Valid @RequestBody request: LoginRequest,
  ): LoginResponse{
    return authService.login(request)
//    return response.token
  }

  // Verify token
  @PostMapping("/verify")
  fun verify(
    @RequestBody token: String,
  ): String {
    if (authService.verify(token)) {
      return "Valid"
    }
    return "Token is invalid"
  }
}