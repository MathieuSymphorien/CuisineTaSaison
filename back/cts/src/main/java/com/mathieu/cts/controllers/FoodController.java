package com.mathieu.cts.controllers;

import com.mathieu.cts.entities.DTO.FoodDTO;
import com.mathieu.cts.services.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    // Récupère tous les foods
    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods() {
        List<FoodDTO> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    // Récupère un food par son ID
    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        FoodDTO foodDTO = foodService.getFoodById(id);
        return ResponseEntity.ok(foodDTO);
    }

    // Crée un nouveau food
    @PostMapping
    public ResponseEntity<FoodDTO> createFood(@RequestBody FoodDTO foodDTO) {
        FoodDTO createdFood = foodService.createFood(foodDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
    }

    // Met à jour un food existant
    @PutMapping("/{id}")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable Long id, @RequestBody FoodDTO foodDTO) {
        FoodDTO updatedFood = foodService.updateFood(id, foodDTO);
        return ResponseEntity.ok(updatedFood);
    }

    // Supprime un food par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
