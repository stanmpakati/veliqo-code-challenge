package com.stancloud.authenticationservice.dto

import com.stancloud.authenticationservice.user.UserRole
import org.jetbrains.annotations.NotNull
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty

data class SignupRequest(
  @field:NotBlank(message = "Name must not be blank")
  val firstName: String,

  val middleNames: String,

  @field:NotEmpty(message = "Last name unavailable")
  val lastName: String,

  @field:Email(message = "Email should be valid")
  val email: String,

  @field:NotEmpty(message = "Password cannot be empty")
  val password: String,

  val roles: Set<UserRole>? = null,
)
