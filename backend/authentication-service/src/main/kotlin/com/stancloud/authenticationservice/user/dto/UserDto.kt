package com.stancloud.authenticationservice.user.dto

import com.stancloud.authenticationservice.user.User
import java.time.LocalDateTime

data class UserDto(
  val id: Long,
  val firstName: String,
  val middleNames: String,
  val lastName: String,
  val email: String,
  val createdAt: LocalDateTime,
  val updatedAt: LocalDateTime,
) {
  constructor(user: User) : this(
    user.id!!,
    user.firstName,
    user.middleNames,
    user.lastName,
    user.email,
    user.createdAt,
    user.updatedAt,
  )
}

