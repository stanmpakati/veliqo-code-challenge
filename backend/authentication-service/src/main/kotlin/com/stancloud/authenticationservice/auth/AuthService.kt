package com.stancloud.authenticationservice.auth

import com.stancloud.authenticationservice.dto.LoginRequest
import com.stancloud.authenticationservice.dto.LoginResponse
import com.stancloud.authenticationservice.dto.SignupRequest
import com.stancloud.authenticationservice.dto.UserDto
import com.stancloud.authenticationservice.config.JwtService
import com.stancloud.authenticationservice.model.User
import com.stancloud.authenticationservice.user.UserRepository
import com.stancloud.authenticationservice.user.UserRole
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
  private val userRepository: UserRepository,
  private val passwordEncoder: PasswordEncoder,
  private val authenticationManager: AuthenticationManager,
  private val jwtTokenProvider: JwtService,
) {

  fun signup(
    request: SignupRequest,
  ): UserDto {
  val user = User(
    request.firstName,
    request.middleNames,
    request.lastName,
    request.email,
    passwordEncoder.encode(request.password),
    request.roles ?: setOf(UserRole.APPLICANT),
  )

    return UserDto(this.userRepository.save(user))
  }

  fun login(
    request: LoginRequest,
  ): LoginResponse {
    authenticationManager.authenticate(
      UsernamePasswordAuthenticationToken(request.email, request.password)
    )

    val user: User = userRepository.findByEmail(request.email)?: throw Exception("Username Password incorrect")

    return LoginResponse(jwtTokenProvider.generateToken(user), UserDto(user))
  }

  fun verify(token: String): Boolean {
    return jwtTokenProvider.validateToken(token)
  }
}
