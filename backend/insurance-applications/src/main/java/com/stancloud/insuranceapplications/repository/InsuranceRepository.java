package com.stancloud.insuranceapplications.repository;

import com.stancloud.insuranceapplications.models.InsuranceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceRepository extends JpaRepository<InsuranceType, Long>, QueryByExampleExecutor<InsuranceType> {
}
