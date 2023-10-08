package com.stancloud.authenticationservice.user

import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrElse

@Service
class UserService (
  private val userRepository: UserRepository
) {
  fun findAll(): List<User> {
    return userRepository.findAll()
  }

  fun findById(userId: Long): User {
    return userRepository.findById(userId)
      .getOrElse { throw Exception("Applicant Not Found") };
  }
}