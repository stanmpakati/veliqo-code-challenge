package com.stancloud.authenticationservice.config

import com.stancloud.authenticationservice.response.CustomException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter

class JwtAuthFilter(
  private val jwtService: JwtService,
  private val userDetailsService: UserDetailsService,
) : OncePerRequestFilter() {

      override fun doFilterInternal(
          request: HttpServletRequest,
          response: HttpServletResponse,
          filterChain: FilterChain,
      ) {
        val token = request.getHeader("Authorization")

        if (token == null || !token.startsWith("Bearer ")) {
          filterChain.doFilter(request, response)
          return
        }

        val jwt: String = token.substring(7)
        val userEmail: String = jwtService.extractUsername(jwt)

          if (userEmail != null && SecurityContextHolder.getContext().authentication == null) {
            val userDetails: UserDetails = this.userDetailsService.loadUserByUsername(userEmail)
            if (jwtService.isTokenValid(jwt, userDetails)) {
              val authToken = UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.authorities
              )

              authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
              SecurityContextHolder.getContext().authentication = authToken
            } else {
              SecurityContextHolder.clearContext()
              throw CustomException(
                errorMessage = "Invalid token",
                httpStatus = HttpStatus.I_AM_A_TEAPOT
              )
            }
          }
          filterChain.doFilter(request, response)
        }

}