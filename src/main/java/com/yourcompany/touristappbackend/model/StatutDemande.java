package com.yourcompany.touristappbackend.model;

public enum StatutDemande {
    EN_ATTENTE,
    ACCEPTEE,
    REFUSEE,
    ANNULEE,
    TERMINEE,
    EN_COURS;

    public enum StatutPaiement {
        EN_ATTENTE,
        VALIDE,
        ECHOUE,
        REMBOURSE
    }
}