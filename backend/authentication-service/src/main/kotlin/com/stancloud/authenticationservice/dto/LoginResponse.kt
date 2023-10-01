package com.stancloud.authenticationservice.dto

data class LoginResponse (
  val token: String,
  val user: UserDto
)
