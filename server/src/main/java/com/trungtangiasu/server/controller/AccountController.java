package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.dto.AccountDTO;
import com.trungtangiasu.server.models.Account;
import com.trungtangiasu.server.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/{userId}")
    public ResponseEntity<Account> getAccountById(@PathVariable Integer userId) {
        Optional<Account> account = accountService.findAccountById(userId);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(accountService.saveAccount(account));
    }

    @PostMapping("/register")
    public ResponseEntity<AccountDTO> registerAccount(@RequestBody AccountDTO accountDTO) {
        AccountDTO createdAccount = accountService.registerAccount(accountDTO);
        return ResponseEntity.ok(createdAccount);
    }
}
