package com.stancloud.authenticationservice.user

import com.stancloud.authenticationservice.user.UserRole
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.time.LocalDateTime

@Entity
data class User (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "first_name", nullable = false)
    val firstName: String,

    @Column(name = "middle_name", nullable = false)
    val middleNames: String,

    @Column(name = "last_name", nullable = false)
    val lastName: String,

    @Column(name = "email", nullable = false, unique = true)
    val email: String,

    @Column(name = "password", nullable = false)
    private val password: String,


    @ElementCollection(targetClass = UserRole::class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    val roles: Set<UserRole>,

    private val isEnabled: Boolean?,
    private val isCredentialsNonExpired: Boolean?,
    private val isAccountNonExpired: Boolean?,
    private val isAccountNonLocked: Boolean?,

    @CreationTimestamp
    val createdAt: LocalDateTime,

    @UpdateTimestamp
    val updatedAt: LocalDateTime,
) : UserDetails {

    constructor(
        firstName: String,
        middleNames: String,
        lastName: String,
        email: String,
        password: String,
        roles: Set<UserRole>,
    ) : this(
        null,
        firstName,
        middleNames,
        lastName,
        email,
        password,
        roles,
        true,
        true,
        true,
        true,
        LocalDateTime.now(),
        LocalDateTime.now(),
    )

    override fun getUsername(): String = email

    override fun getAuthorities(): Set<GrantedAuthority> {
        return roles
    }

    override fun getPassword(): String {
        return password
    }

    override fun isEnabled(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun toString(): String {
        return "User(id=$id, firstName=$firstName, lastName=$lastName, email=$email, password=$password, isEnabled=$isEnabled, isCredentialsNonExpired=$isCredentialsNonExpired, isAccountNonExpired=$isAccountNonExpired, isAccountNonLocked=$isAccountNonLocked, authorities=$authorities, role=$roles)"
    }
}

