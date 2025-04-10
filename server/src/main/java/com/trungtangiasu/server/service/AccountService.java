package com.trungtangiasu.server.service;

import com.trungtangiasu.server.dto.AccountDTO;
import com.trungtangiasu.server.models.Account;
import com.trungtangiasu.server.models.Role;
import com.trungtangiasu.server.repository.AccountRepository;
import com.trungtangiasu.server.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public Optional<Account> findAccountById(Integer userId) {
        return accountRepository.findById(userId);
    }

    public Account findAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    public void deleteAccount(Integer userId) {
        accountRepository.deleteById(userId);
    }

    public AccountDTO registerAccount(AccountDTO accountDTO) {
        // Tìm vai trò mặc định (ví dụ: "Customer")
        Role defaultRole = roleRepository.findByRoleName("Customer");

        // Tạo tài khoản mới
        Account account = new Account();
        account.setUsername(accountDTO.getUsername());
        account.setEmail(accountDTO.getEmail());
        account.setRole(defaultRole);
        account.setIsActive(true);

        // Lưu tài khoản vào cơ sở dữ liệu
        Account savedAccount = accountRepository.save(account);

        // Chuyển đổi sang DTO để trả về
        AccountDTO result = new AccountDTO();
        result.setUserId(savedAccount.getUserId());
        result.setUsername(savedAccount.getUsername());
        result.setEmail(savedAccount.getEmail());
        result.setRoleId(defaultRole.getRoleId());
        result.setIsActive(savedAccount.getIsActive());
        return result;
    }
}
