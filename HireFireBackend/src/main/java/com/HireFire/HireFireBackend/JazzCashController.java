package com.HireFire.HireFireBackend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/jazzcash")
public class JazzCashController {

    private final JazzCashService jazzCashService;

    public JazzCashController(JazzCashService jazzCashService) {
        this.jazzCashService = jazzCashService;
    }

    @PostMapping("/initiate")
    public ResponseEntity<Map<String, String>> initiatePayment() {
        Map<String, String> paymentData = jazzCashService.preparePaymentData();
        return ResponseEntity.ok(paymentData);
    }

    @GetMapping("/payment-return")
    public ResponseEntity<String> handleReturn(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok("Payment return handled ✅: " + params.toString());
    }

    @PostMapping("/ipn")
    public ResponseEntity<String> handleIPN(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok("IPN received ✅: " + params.toString());
    }
}

