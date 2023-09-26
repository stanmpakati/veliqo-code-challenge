package com.stancloud.authenticationservice.config

import com.stancloud.authenticationservice.user.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.access.AccessDeniedHandler
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter


@Configuration
@EnableWebSecurity(debug = true)
class SecurityConfig(
  val userRepository: UserRepository
) {
  @Autowired
  @Qualifier("customAuthenticationEntryPoint")
  var authEntryPoint: AuthenticationEntryPoint? = null

  private val AUTH_WHITELIST = arrayOf(
    "/api/v1/auth/**",
    "/configuration/ui",
    "/configuration/security",
    "/swagger-ui.html",
    "/webjars/**",
    "/actuator/**",
    "/swagger-ui/**",
    "/swagger-ui/index.html",
    "/v2/api-docs",
    "/v3/api-docs",
    "/swagger-resources",
    "/swagger-resources/**" // other public endpoints of your API may be appended to this array
  )

  @Bean
  fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
    http
      .csrf { obj -> obj.disable() }
      .authorizeHttpRequests()
        .requestMatchers(
          "/api/v1/auth/**",
          "/api/v1/health/**"
        ).permitAll()
      .anyRequest().authenticated()
//      .and()
//      .exceptionHandling()
//      .authenticationEntryPoint(authEntryPoint)
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authenticationProvider(authenticationProvider())
      .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter::class.java)

    return http.build()
  }

//  @Throws(Exception::class)
//  fun configure(web: WebSecurity) {
//    web.ignoring().antMatchers(AUTH_WHITELIST)
//  }

  @Bean
  fun authenticationProvider(): AuthenticationProvider {
    val daoAuthenticationProvider = DaoAuthenticationProvider()
    daoAuthenticationProvider.setUserDetailsService(userDetailsService())
    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder())
    return daoAuthenticationProvider
  }

  @Bean
  fun passwordEncoder(): PasswordEncoder {
    return BCryptPasswordEncoder()
  }

  @Bean
  fun authenticationManager(config: AuthenticationConfiguration): AuthenticationManager {
    return config.authenticationManager
  }

  @Bean
  fun jwtAuthFilter(): JwtAuthFilter {
    return JwtAuthFilter(JwtService(), userDetailsService())
  }

  @Bean
  fun userDetailsService(): UserDetailsService {
    return UserDetailsService { username ->
      userRepository.findByEmail(username)?: throw UsernameNotFoundException("User $username not found")
    }
  }

  @Bean
  fun accessDeniedHandler(): AccessDeniedHandler {
    return AccessDeniedHandler { request, response, accessDeniedException ->
      response?.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
      response?.contentType = "application/json"
      response?.writer?.write("""
                  {
                      "error": "Access denied",
                      "status": 500
                  }
              """.trimIndent())
    }
  }
}