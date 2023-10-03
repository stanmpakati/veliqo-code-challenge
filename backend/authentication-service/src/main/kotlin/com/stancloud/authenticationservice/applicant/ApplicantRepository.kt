package com.stancloud.authenticationservice.applicant

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ApplicantRepository : JpaRepository<Applicant, Long> {
}