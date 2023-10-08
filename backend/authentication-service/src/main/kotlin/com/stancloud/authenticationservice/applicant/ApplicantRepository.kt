package com.stancloud.authenticationservice.applicant

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ApplicantRepository : JpaRepository<Applicant, Long> {
  fun findByUser_Id(userId: Long?): Optional<Applicant>
}