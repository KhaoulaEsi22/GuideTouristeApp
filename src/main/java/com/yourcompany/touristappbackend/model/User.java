package com.yourcompany.touristappbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "users") // Nom de la table dans la BDD
@Inheritance(strategy = InheritanceType.JOINED) // Stratégie d'héritage JOINED
@Data // Génère getters, setters, toString, equals, hashCode (Lombok)
@NoArgsConstructor// Génère un constructeur sans arguments (Lombok)
@SuperBuilder
@AllArgsConstructor // Génère un constructeur avec tous les arguments (Lombok)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Génère un UUID comme ID
    private UUID id;

    @Column(unique = true, nullable = false) // L'email doit être unique et non nul
    private String email;

    @Column(nullable = false)
    private String motDePasse; // Important : stocker le mot de passe HACHÉ !

    private String nom;
    private String prenom;
    private String telephone;

    @Temporal(TemporalType.TIMESTAMP) //  date/heure
    private Date dateCreation;

    private Boolean estActif = true;

    @Enumerated(EnumType.STRING) // Stocke l'enum  dans la BDD
    @Column(nullable = false)
    private Role role; // Pour définir le rôle de l'utilisateur (TOURISTE, GUIDE, ADMIN)
}

