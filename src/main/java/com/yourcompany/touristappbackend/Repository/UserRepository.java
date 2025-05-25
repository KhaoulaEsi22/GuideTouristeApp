package com.yourcompany.touristappbackend.Repository;


import com.yourcompany.touristappbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Méthode personnalisée pour trouver un user par email
}
