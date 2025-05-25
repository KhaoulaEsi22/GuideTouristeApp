package com.yourcompany.touristappbackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@PrimaryKeyJoinColumn(name = "id")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Admin extends User {
    // Les administrateurs peuvent avoir des attributs spécifiques ici si nécessaire,
    // par exemple, des niveaux d'autorisation granulaires ou des logs d'actions.
    private String roleAdminSpecific;

    public enum MethodePaiement {
        CARTE_CREDIT,
        PAYPAL,
        VIREMENT
    }
}
