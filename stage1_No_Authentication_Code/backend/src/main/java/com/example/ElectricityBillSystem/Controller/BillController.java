package com.example.ElectricityBillSystem.Controller;

import com.example.ElectricityBillSystem.Model.Bill;
import com.example.ElectricityBillSystem.Model.Customer;
import com.example.ElectricityBillSystem.Repository.BillRepository;
import com.example.ElectricityBillSystem.Repository.CustomerRepository;
import com.example.ElectricityBillSystem.Exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/customer/{customerId}")
    public Bill addBill(@PathVariable Long customerId, @Valid @RequestBody Bill bill){
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));

        bill.setCustomer(customer);
        return billRepository.save(bill);
    }

    @GetMapping
    public List<Bill> getAllBills(){
        return billRepository.findAll();
    }

    @GetMapping("/by-customer/{customerId}")
    public List<Bill> getBillsByCustomerId(@PathVariable Long customerId){
        // Check if customer exists
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));

        return billRepository.findByCustomer_Id(customerId);
    }

    @GetMapping("/{billId}")
    public Bill getBillById(@PathVariable Long billId){
        return billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with id: " + billId));
    }

    @DeleteMapping("/{billId}")
    public ResponseEntity<String> deleteBill(@PathVariable Long billId){
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with id: " + billId));

        billRepository.delete(bill);
        return ResponseEntity.ok("Bill deleted successfully");
    }
}
