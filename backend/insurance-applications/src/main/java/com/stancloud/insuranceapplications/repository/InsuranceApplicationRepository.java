package com.stancloud.insuranceapplications.repository;

import com.stancloud.insuranceapplications.models.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceApplicationRepository extends JpaRepository<Insurance, Long>,
                                                        QueryByExampleExecutor<Insurance>,
                                                        JpaSpecificationExecutor<Insurance> {
}
