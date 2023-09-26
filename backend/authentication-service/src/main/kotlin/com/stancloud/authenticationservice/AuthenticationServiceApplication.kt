package com.stancloud.authenticationservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.boot.runApplication

@SpringBootApplication
@ConditionalOnProperty(name = arrayOf("spring.zipkin.enabled"), havingValue = "false")
class AuthenticationServiceApplication

fun main(args: Array<String>) {
	runApplication<AuthenticationServiceApplication>(*args)
}
