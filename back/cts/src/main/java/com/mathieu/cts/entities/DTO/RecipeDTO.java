package com.mathieu.cts.entities.DTO;

import lombok.Data;

import java.util.List;

import com.mathieu.cts.entities.Food;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
       private Long id;
       private String name;
       private String description;
       private Integer time;
       private Boolean oven;
       private Integer people;
       private List<String> steps;
       private List<Food> foods;
       private String image;   // FEATURE IMAGE POUR PLUS TARD
       private Double seasonRatio;
       private Boolean approved;
}
