package com.stancloud.authenticationservice.user.dto

data class LoginRequest(
  val email: String,
  val password: String,
)