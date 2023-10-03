package com.stancloud.authenticationservice.user

import com.stancloud.authenticationservice.user.dto.SignupRequest
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/user")
class UserController {
  val logger: org.slf4j.Logger = org.slf4j.LoggerFactory.getLogger(UserController::class.java)

  @GetMapping("/me")
  public fun getUser(): String {
    return ("Hello Security")
  }

  @GetMapping("/all")
  public fun getAllUsers(): String {
    return "all users"
  }

  @PostMapping("/create")
  public fun createUser(
    @Valid @RequestBody user: SignupRequest
  ): String {
    logger.info("user: {}", user)
    return "create user"
  }
}