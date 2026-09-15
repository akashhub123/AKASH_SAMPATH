package com.example.ElectricityBillSystem.Service;

import com.example.ElectricityBillSystem.Exception.ResourceNotFoundException;
import com.example.ElectricityBillSystem.Model.Bill;
import com.example.ElectricityBillSystem.Model.Customer;
import com.example.ElectricityBillSystem.Repository.BillRepository;
import com.example.ElectricityBillSystem.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public Bill addBill(Long customerId, Bill bill) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        double amount = bill.getUnits() * 5;
        bill.setAmount(amount);

        bill.setCustomer(customer);
        return billRepository.save(bill);
    }

    public List<Bill> getBillsByCustomer(Long customerId) {
        return billRepository. findByCustomer_Id(customerId);
    }
}
