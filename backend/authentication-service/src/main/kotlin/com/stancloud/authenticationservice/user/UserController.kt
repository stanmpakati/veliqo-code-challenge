package com.stancloud.authenticationservice.user

import com.stancloud.authenticationservice.applicant.ApplicantService
import com.stancloud.authenticationservice.user.dto.SignupRequest
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/user")
class UserController(
  private val userService: UserService,
  ) {
  val logger: org.slf4j.Logger = org.slf4j.LoggerFactory.getLogger(UserController::class.java)

  @GetMapping("/{userId}")
  public fun getUser(@PathVariable userId: Long): User {
    return userService.findById(userId)
  }

  @GetMapping("/all")
  public fun getAllUsers(): List<User> {
    return userService.findAll()
  }
}