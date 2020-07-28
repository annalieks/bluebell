package com.bluebell.backend.users;

import com.bluebell.backend.users.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsersRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);

    List<User> findAll();

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.username = :username," +
            "u.email = :email, " +
            "u.password = :password " +
            "WHERE u.id = :id")
    void updateUser(@Param("username") String username, @Param("email") String email,
                    @Param("password") String password, @Param("id") UUID id);

}
