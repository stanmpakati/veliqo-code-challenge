package com.stancloud.authenticationservice.user.dto

data class LoginResponse (
  val token: String,
  val user: UserDto
)
