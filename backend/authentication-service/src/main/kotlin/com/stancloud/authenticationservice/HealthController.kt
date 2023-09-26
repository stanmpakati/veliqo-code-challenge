package com.stancloud.authenticationservice

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/health")
class HealthController {
  @RequestMapping("/ping")
  fun ping(): String {
    return "pong"
  }
}