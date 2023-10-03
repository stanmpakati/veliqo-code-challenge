package com.stancloud.authenticationservice.auth

import com.stancloud.authenticationservice.applicant.Applicant
import com.stancloud.authenticationservice.applicant.ApplicantRepository
import com.stancloud.authenticationservice.user.dto.LoginRequest
import com.stancloud.authenticationservice.user.dto.LoginResponse
import com.stancloud.authenticationservice.user.dto.SignupRequest
import com.stancloud.authenticationservice.user.dto.UserDto
import com.stancloud.authenticationservice.config.JwtService
import com.stancloud.authenticationservice.user.User
import com.stancloud.authenticationservice.user.UserRepository
import com.stancloud.authenticationservice.user.UserRole
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
  private val userRepository: UserRepository,
  private val applicantRepository: ApplicantRepository,
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

    val savedUser = this.userRepository.save(user)

    if(savedUser.roles.contains(UserRole.APPLICANT)) {
      this.applicantRepository.save(Applicant(savedUser))
    }

    return UserDto(savedUser)
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
