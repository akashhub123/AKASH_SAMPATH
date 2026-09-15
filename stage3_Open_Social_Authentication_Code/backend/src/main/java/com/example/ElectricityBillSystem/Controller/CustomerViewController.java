package com.example.ElectricityBillSystem.Controller;

import com.example.ElectricityBillSystem.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomerViewController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/view-customers")
    public String viewCustomers(Model model){
        model.addAttribute("customers", customerRepository.findAll());
        return "customers";
    }
}
