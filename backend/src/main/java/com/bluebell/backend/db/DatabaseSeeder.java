package com.bluebell.backend.db;

import com.bluebell.backend.users.UsersRepository;
import com.bluebell.backend.users.modal.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        List<User> u = jdbcTemplate.query("SELECT * FROM users", (resultSet, rowNum) -> null);
        if (u.size() <= 0) {
            seedUsersTable();
        }
    }

    void seedUsersTable() {
        User admin = User
                .builder()
                .username("admin")
                .email("admin@gmail.com")
                .password(bCryptPasswordEncoder.encode("admin"))
                .build();
        User demo = User
                .builder()
                .username("demo")
                .email("demo@gmail.com")
                .password(bCryptPasswordEncoder.encode("demo"))
                .build();

        usersRepository.saveAll(List.of(admin, demo));
    }

}