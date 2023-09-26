package com.stancloud.authenticationservice.user

import org.springframework.security.core.GrantedAuthority

enum class UserRole: GrantedAuthority {
    SUPER_USER,
    ADMIN,
    APPLICANT;

    override fun getAuthority(): String = name
}
