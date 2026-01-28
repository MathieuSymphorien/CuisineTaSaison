package com.mathieu.cts.entities.DTO;

import lombok.Data;

import java.util.List;

import com.mathieu.cts.entities.Food;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
       private Long id;

       @NotBlank(message = "Le nom est obligatoire")
       @Size(min = 2, max = 150, message = "Le nom doit contenir entre 2 et 150 caractères")
       private String name;

       @Size(max = 2000, message = "La description ne peut pas dépasser 2000 caractères")
       private String description;

       @Min(value = 1, message = "Le temps de préparation doit être d'au moins 1 minute")
       private Integer time;

       @NotNull(message = "Veuillez indiquer si un four est nécessaire")
       private Boolean oven;

       @Min(value = 1, message = "Le nombre de personnes doit être d'au moins 1")
       private Integer people;

       @NotNull(message = "Les étapes sont obligatoires")
       @Size(min = 1, message = "Au moins une étape est requise")
       private List<String> steps;

       @NotNull(message = "Les ingrédients sont obligatoires")
       @Size(min = 1, message = "Au moins un ingrédient est requis")
       private List<Food> foods;

       private String image;   // FEATURE IMAGE POUR PLUS TARD
       private Double seasonRatio;
       private Boolean approved;
}
