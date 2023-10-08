package com.stancloud.authenticationservice.applicant

import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
data class Address (
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  var id: Long? = null,
  val street: String?,
  val suburb: String?,
  val city: String?,
  val country: String?,
  val postalCode: String?,
) {
  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
    other as Address

    return id != null && id == other.id
  }

  override fun hashCode(): Int = javaClass.hashCode()

  @Override
  override fun toString(): String {
    return this::class.simpleName + "(id = $id , street = $street , suburb = $suburb , city = $city , country = $country )"
  }
}