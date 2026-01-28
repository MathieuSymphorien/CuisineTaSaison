package com.mathieu.cts.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mathieu.cts.entities.DTO.FoodDTO;
import com.mathieu.cts.entities.DTO.RecipeDTO;
import com.mathieu.cts.services.FoodService;
import com.mathieu.cts.services.RecipeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final FoodService foodService;
    private final RecipeService recipeService;

    @GetMapping("/test")
    public String getTest() {
        return "Voici les stats";
    }

    // ===== Foods en attente =====

    @GetMapping("/foods/pending")
    public ResponseEntity<List<FoodDTO>> getPendingFoods() {
        return ResponseEntity.ok(foodService.getPendingFoods());
    }

    @PutMapping("/foods/{id}/approve")
    public ResponseEntity<FoodDTO> approveFood(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.approveFood(id));
    }

    @DeleteMapping("/foods/{id}/reject")
    public ResponseEntity<Void> rejectFood(@PathVariable Long id) {
        foodService.rejectFood(id);
        return ResponseEntity.noContent().build();
    }

    // ===== Recipes en attente =====

    @GetMapping("/recipes/pending")
    public ResponseEntity<List<RecipeDTO>> getPendingRecipes() {
        return ResponseEntity.ok(recipeService.getPendingRecipes());
    }

    @PutMapping("/recipes/{id}/approve")
    public ResponseEntity<RecipeDTO> approveRecipe(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.approveRecipe(id));
    }

    @DeleteMapping("/recipes/{id}/reject")
    public ResponseEntity<Void> rejectRecipe(@PathVariable Long id) {
        recipeService.rejectRecipe(id);
        return ResponseEntity.noContent().build();
    }
}
