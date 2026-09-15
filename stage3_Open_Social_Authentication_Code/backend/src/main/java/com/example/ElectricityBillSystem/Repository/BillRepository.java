package com.example.ElectricityBillSystem.Repository;

import com.example.ElectricityBillSystem.Model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByCustomer_Id(Long customerId) ;
}
