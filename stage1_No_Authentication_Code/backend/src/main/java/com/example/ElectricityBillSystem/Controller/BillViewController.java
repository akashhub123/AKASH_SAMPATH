package com.example.ElectricityBillSystem.Controller;

import com.example.ElectricityBillSystem.Model.Bill;
import com.example.ElectricityBillSystem.Repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class BillViewController {

    @Autowired
    private BillRepository billRepository;

    @GetMapping("/billSearch")
    public String showSearchForm() {
        return "search";
    }

    @GetMapping("/searchBills")
    public String searchBills(Long customerId, String name, Model model) {

        List<Bill> bills = billRepository.findByCustomer_Id(customerId);

        if (bills.isEmpty()) {
            model.addAttribute("error", "No bills found for this customer");
            return "search";
        }

        String customerName = bills.get(0).getCustomer().getName();
        if (!customerName.equalsIgnoreCase(name)) {
            model.addAttribute("error", "Customer name mismatch");
            return "search";
        }

        model.addAttribute("bills", bills);
        return "bills";
    }

}
