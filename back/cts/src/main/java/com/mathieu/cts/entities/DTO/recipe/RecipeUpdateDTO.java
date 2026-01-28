package com.mathieu.cts.entities.DTO.recipe;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la modification d'une Recipe (PUT)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeUpdateDTO {

    @Size(min = 2, max = 150, message = "Le nom doit contenir entre 2 et 150 caractères")
    private String name;

    @Size(max = 2000, message = "La description ne peut pas dépasser 2000 caractères")
    private String description;

    @Min(value = 1, message = "Le temps de préparation doit être d'au moins 1 minute")
    private Integer time;

    private Boolean oven;

    @Min(value = 1, message = "Le nombre de personnes doit être d'au moins 1")
    private Integer people;

    @Size(min = 1, message = "Au moins une étape est requise")
    private List<String> steps;

    @Size(min = 1, message = "Au moins un ingrédient est requis")
    private List<Long> foodIds;
}
