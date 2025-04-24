package com.HireFire.HireFireBackend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JazzCashService {

    @Value("${jazzcash.merchant-id}")
    private String merchantId;

    @Value("${jazzcash.password}")
    private String password;

    @Value("${jazzcash.integrity-salt}")
    private String integritySalt;

    @Value("${jazzcash.return-url}")
    private String returnUrl;

    public Map<String, String> preparePaymentData() {
        Map<String, String> data = new HashMap<>();
        String txnRefNo = "T" + System.currentTimeMillis();
        String txnDateTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        data.put("pp_Version", "1.1");
        data.put("pp_TxnType", "MWALLET");
        data.put("pp_Language", "EN");
        data.put("pp_MerchantID", merchantId);
        data.put("pp_Password", password);
        data.put("pp_TxnRefNo", txnRefNo);
        data.put("pp_Amount", "10000"); // 100 PKR
        data.put("pp_TxnCurrency", "PKR");
        data.put("pp_TxnDateTime", txnDateTime);
        data.put("pp_BillReference", "ref123");
        data.put("pp_Description", "JazzCash Test Payment");
        data.put("pp_ReturnURL", returnUrl);
        data.put("pp_SecureHash", generateSecureHash(data));

        return data;
    }

    private String generateSecureHash(Map<String, String> data) {
        return HashUtil.generateHash(integritySalt, data);
    }
}
