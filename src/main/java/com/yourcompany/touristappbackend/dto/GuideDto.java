package com.yourcompany.touristappbackend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuideDto {
    private UUID id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String bio;
    private String languesParlees;
    private double tarifParHeure;
    // N'incluez PAS le motDePasse ici
    // Vous pouvez inclure un rôle si c'est pertinent pour le frontend,
    // mais dans ce DTO de guide, il est implicitement "ROLE_GUIDE"
}
