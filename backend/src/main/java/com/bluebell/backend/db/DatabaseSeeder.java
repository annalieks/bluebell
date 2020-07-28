package com.bluebell.backend.db;

import com.bluebell.backend.chat.ChatRepository;
import com.bluebell.backend.chat.modal.Message;
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
    private ChatRepository chatRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        List<User> u = jdbcTemplate.query("SELECT * FROM users", (resultSet, rowNum) -> null);
        List<Message> m = jdbcTemplate.query("SELECT * FROM messages", (resultSet, rowNum) -> null);
        if (u.size() <= 0) {
            seedUsersTable();
        }
        if(m.size() <= 0) {
            seedMessagesTable();
        }
    }

    void seedUsersTable() {
        User admin = User
                .builder()
                .username("admin")
                .email("admin@gmail.com")
                .password(bCryptPasswordEncoder.encode("admin"))
                .avatar("https://www.belfasttelegraph.co.uk/life/8f575/39297105.ece/AUTOCROP/w1240h700/2020-06-20_lif_59697446_I2.JPG")
                .build();
        User demo = User
                .builder()
                .username("demo")
                .email("demo@gmail.com")
                .password(bCryptPasswordEncoder.encode("demo"))
                .avatar("https://barbertrend.com/wp-content/uploads/2017/01/man-with-grey-beard.jpg")
                .build();

        User ordinary = User
                .builder()
                .username("ordinary")
                .email("ordinary@gmail.com")
                .avatar("https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg")
                .password(bCryptPasswordEncoder.encode("ordinary"))
                .build();

        User observer = User
                .builder()
                .username("observer")
                .email("observer@gmail.com")
                .avatar("https://media.nature.com/w300/magazine-assets/d41586-018-07881-1/d41586-018-07881-1_16369438.jpg")
                .password(bCryptPasswordEncoder.encode("observer"))
                .build();

        usersRepository.saveAll(List.of(admin, demo, ordinary, observer));
    }

    void seedMessagesTable() {
        var testUser1 = usersRepository.findByUsername("demo");
        var testUser2 = usersRepository.findByUsername("observer");
        if(testUser1.isEmpty() || testUser2.isEmpty()) return;
        var m1 = Message
                .builder()
                .text("Hello, friends!")
                .user(testUser1.get())
                .createdAt("2020-07-16T19:48:12.936Z")
                .build();

        var m2 = Message
                .builder()
                .text("Hi, friend!")
                .user(testUser2.get())
                .createdAt("2020-07-16T19:48:12.936Z")
                .build();

        var m3 = Message
                .builder()
                .text("What's up?")
                .user(testUser2.get())
                .createdAt("2020-07-16T19:48:12.936Z")
                .build();

        var m4 = Message
                .builder()
                .text("Everything's fine, working on a project")
                .user(testUser2.get())
                .createdAt("2020-07-16T19:48:12.936Z")
                .build();

        chatRepository.saveAll(List.of(m1, m2, m3, m4));
    }

}