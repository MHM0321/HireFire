package com.HireFire.HireFireBackend.controller;

import com.HireFire.HireFireBackend.dto.JazzCashCallbackRequest;
import com.HireFire.HireFireBackend.dto.PaymentInitiationRequest;
import com.HireFire.HireFireBackend.dto.PaymentResponse;
import com.HireFire.HireFireBackend.model.Payment;
import com.HireFire.HireFireBackend.model.PaymentStatus;
import com.HireFire.HireFireBackend.service.JazzCashService;
import com.HireFire.HireFireBackend.service.PaymentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final PaymentService paymentService;
    private final JazzCashService jazzCashService;

    @Autowired
    public PaymentController(PaymentService paymentService, JazzCashService jazzCashService) {
        this.paymentService = paymentService;
        this.jazzCashService = jazzCashService;
    }

    @GetMapping("/work")
    public String working(){
        return "It is working man";
    }

    /**
     * Initiates a payment transaction
     */
    @PostMapping("/initiate")
    public ResponseEntity<PaymentResponse> initiatePayment(@RequestBody PaymentInitiationRequest request) {
        logger.info("Payment initiation request received for user: {}, worker: {}, amount: {}",
                request.getUserId(), request.getWorkerId(), request.getAmount());

        PaymentResponse response = paymentService.initiatePayment(request);

        return ResponseEntity.ok(response);
    }

    /**
     * Handles the callback from JazzCash after payment processing
     */
    @PostMapping("/jazzcash/callback")
    public ResponseEntity<PaymentResponse> jazzCashCallback(HttpServletRequest request) {
        logger.info("Received JazzCash callback");

        // Extract all parameters from the request
        Map<String, String> parameters = extractRequestParameters(request);

        // Create callback request object
        JazzCashCallbackRequest callbackRequest = new JazzCashCallbackRequest(parameters);

        // Log important parameters
        String txnRefNo = callbackRequest.getParameter("pp_TxnRefNo");
        String responseCode = callbackRequest.getParameter("pp_ResponseCode");
        String billReference = callbackRequest.getParameter("pp_BillReference");

        logger.info("JazzCash callback for txnRefNo: {}, responseCode: {}, billRef: {}",
                txnRefNo, responseCode, billReference);

        // Verify payment
        boolean isValid = jazzCashService.verifyPayment(callbackRequest);

        if (!isValid) {
            logger.warn("Payment verification failed for transaction: {}", txnRefNo);
            PaymentResponse response = new PaymentResponse();
            response.setStatus(null);
            response.setMessage("Payment verification failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Process payment and update status
        PaymentResponse response = jazzCashService.processPaymentCallback(callbackRequest);

        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint to check payment status
     */
    @GetMapping("/status/{paymentReference}")
    public ResponseEntity<PaymentResponse> checkPaymentStatus(@PathVariable String paymentReference) {
        logger.info("Payment status check for reference: {}", paymentReference);

        PaymentResponse response = jazzCashService.checkPaymentStatus(paymentReference);

        return ResponseEntity.ok(response);
    }

    /**
     * Worker confirmation endpoint - to be called from worker's mobile app
     * This confirms that worker has seen the payment confirmation
     */
    @PostMapping("/worker-confirmation/{paymentReference}")
    public ResponseEntity<Map<String, Object>> confirmWorkerNotified(@PathVariable String paymentReference) {
        logger.info("Worker confirmation for payment reference: {}", paymentReference);

        // Get payment details
        Payment payment = paymentService.getPaymentByReference(paymentReference);

        Map<String, Object> response = new HashMap<>();
        response.put("paymentReference", paymentReference);
        response.put("status", payment.getStatus());
        response.put("amount", payment.getAmount());
        response.put("timestamp", payment.getCompletedAt());
        response.put("workerName", payment.getWorker().getName());
        response.put("workerConfirmed", true);

        return ResponseEntity.ok(response);
    }

    /**
     * Worker mobile app endpoint - check if payment is completed
     * This allows the worker to poll for payment status
     */
    @GetMapping("/worker/check-payment/{paymentReference}")
    public ResponseEntity<Map<String, Object>> checkPaymentForWorker(@PathVariable String paymentReference) {
        logger.info("Worker checking payment status for reference: {}", paymentReference);

        Payment payment = paymentService.getPaymentByReference(paymentReference);

        Map<String, Object> response = new HashMap<>();
        response.put("paymentReference", paymentReference);
        response.put("status", payment.getStatus());
        response.put("amount", payment.getAmount());
        response.put("isCompleted", payment.getStatus() == PaymentStatus.COMPLETED);

        if (payment.getStatus() == PaymentStatus.COMPLETED) {
            response.put("completedAt", payment.getCompletedAt());
            response.put("customerName", payment.getUser().getName());
            response.put("message", "Payment has been received. You may proceed to your next task.");
        } else {
            response.put("message", "Payment is " + payment.getStatus().toString().toLowerCase() + ". Please wait for confirmation.");
        }

        return ResponseEntity.ok(response);
    }

    /**
     * Helper method to extract all parameters from an HTTP request
     */
    private Map<String, String> extractRequestParameters(HttpServletRequest request) {
        Map<String, String> parameters = new HashMap<>();

        // Extract parameters from request
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();
            String paramValue = request.getParameter(paramName);
            parameters.put(paramName, paramValue);
        }

        return parameters;
    }
}
