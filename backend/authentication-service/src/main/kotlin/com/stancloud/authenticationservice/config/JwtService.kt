package com.stancloud.authenticationservice.config

import com.stancloud.authenticationservice.model.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*
import java.util.function.Function


@Service
class JwtService {
//  @Value("\${application.security.jwt.secret-key}")
  private val secretKey: String = "fea987ac15a4e107cda234ec924e957096f448da40864aa7d8aaa50dc1c336f27684f5a72cbacf7c91397340bc269c6e0ccd45cda7c30b00a7b843d447324003"

//  @Value("\${application.security.jwt.expiration}")
  private val jwtExpiration: Long = 864000000

//  @Value("\${application.security.jwt.refresh-token.expiration}")
  private val refreshExpiration: Long = 0

  fun extractUsername(token: String?): String {
    return extractClaim(token) { obj: Claims -> obj.subject }
  }

  fun <T> extractClaim(token: String?, claimsResolver: Function<Claims, T>): T {
    val claims = extractAllClaims(token)
    return claimsResolver.apply(claims)
  }

  fun generateToken(user: User): String {
    val claims = Jwts.claims()

    val roles: MutableList<String> = LinkedList()
    user.roles.forEach { role -> roles.add(role.toString()) }
    claims["roles"] = roles
    claims["userId"] = user.id

    return generateToken(claims, user)
  }

  fun generateToken(
    extraClaims: Map<String?, Any?>,
    userDetails: User
  ): String {
    return buildToken(extraClaims, userDetails, jwtExpiration)
  }

  fun generateRefreshToken(
    userDetails: User
  ): String {
    return buildToken(HashMap(), userDetails, refreshExpiration)
  }

  private fun buildToken(
    extraClaims: Map<String?, Any?>,
    userDetails: User,
    expiration: Long
  ): String {
    return Jwts
      .builder()
      .setClaims(extraClaims)
      .setSubject(userDetails.username)
      .setIssuedAt(Date(System.currentTimeMillis()))
      .setExpiration(Date(System.currentTimeMillis() + expiration))
      .signWith(signInKey, SignatureAlgorithm.HS256)
      .compact()
  }

  fun isTokenValid(token: String?, userDetails: UserDetails): Boolean {
    val username = extractUsername(token)
    return username == userDetails.username && !isTokenExpired(token)
  }

  private fun isTokenExpired(token: String?): Boolean {
    return extractExpiration(token).before(Date())
  }

  private fun extractExpiration(token: String?): Date {
    return extractClaim(token) { obj: Claims -> obj.expiration }
  }

  private fun extractAllClaims(token: String?): Claims {
    return Jwts
      .parserBuilder()
      .setSigningKey(signInKey)
      .build()
      .parseClaimsJws(token)
      .body
  }

  fun validateToken(token: String): Boolean {
    return !isTokenExpired(token)
  }

  private val signInKey: Key
    private get() {
      val keyBytes = Decoders.BASE64.decode(secretKey)
      return Keys.hmacShaKeyFor(keyBytes)
    }
}