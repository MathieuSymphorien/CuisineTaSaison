package com.mathieu.cts.entities.DTO.recipe;

import java.util.List;

import com.mathieu.cts.entities.DTO.food.FoodResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour les réponses (GET, retour de POST/PUT)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeResponseDTO {

    private Long id;
    private String name;
    private String description;
    private Integer time;
    private Boolean oven;
    private Integer people;
    private List<String> steps;
    private List<FoodResponseDTO> foods;
    private String image;
    private Double seasonRatio;
    private Boolean approved;
}
