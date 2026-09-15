package com.example.ElectricityBillSystem.Repository;

import com.example.ElectricityBillSystem.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository <Customer , Long > {

}
