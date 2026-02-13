package com.mathieu.cts.entities.DTO.recipe;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création d'une Recipe (POST)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCreateDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(
        min = 2,
        max = 150,
        message = "Le nom doit contenir entre 2 et 150 caractères"
    )
    private String name;

    @Size(
        max = 2000,
        message = "La description ne peut pas dépasser 2000 caractères"
    )
    private String description;

    @NotNull(message = "Le temps de préparation est obligatoire")
    @Min(
        value = 1,
        message = "Le temps de préparation doit être d'au moins 1 minute"
    )
    private Integer preparationTime;

    @NotNull(message = "Le temps de cuisson est obligatoire")
    @Min(
        value = 1,
        message = "Le temps de cuisson doit être d'au moins 1 minute"
    )
    private Integer bakeTime;

    @Min(value = 0, message = "Le temps de repos ne peut pas être négatif")
    private Integer restTime;

    @NotNull(message = "Veuillez indiquer si un four est nécessaire")
    private Boolean oven;

    @NotNull(message = "Le nombre de personnes est obligatoire")
    @Min(value = 1, message = "Le nombre de personnes doit être d'au moins 1")
    private Integer people;

    @NotNull(message = "Les étapes sont obligatoires")
    @Size(min = 1, message = "Au moins une étape est requise")
    private List<String> steps;

    @NotNull(message = "Les ingrédients sont obligatoires")
    @Size(min = 1, message = "Au moins un ingrédient est requis")
    private List<Long> foodIds;
}
