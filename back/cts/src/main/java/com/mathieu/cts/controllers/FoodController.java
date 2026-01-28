package com.mathieu.cts.controllers;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;
import com.mathieu.cts.entities.DTO.food.FoodCreateDTO;
import com.mathieu.cts.entities.DTO.food.FoodResponseDTO;
import com.mathieu.cts.entities.DTO.food.FoodUpdateDTO;
import com.mathieu.cts.services.FoodService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    public ResponseEntity<List<FoodResponseDTO>> getAllFoods(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) FoodCategory category,
        @RequestParam(required = false) List<Months> months
    ) {
        List<FoodResponseDTO> foods = foodService.getAllFoods(name, category, months);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/seasonal")
    public ResponseEntity<List<FoodResponseDTO>> getSeasonalFruitsAndVegetables() {
        return ResponseEntity.ok(foodService.getSeasonalFruitsAndVegetables());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodResponseDTO> getFoodById(@PathVariable Long id) {
        FoodResponseDTO food = foodService.getFoodById(id);
        return ResponseEntity.ok(food);
    }

    @PostMapping
    public ResponseEntity<FoodResponseDTO> createFood(@Valid @RequestBody FoodCreateDTO createDTO) {
        FoodResponseDTO createdFood = foodService.createFood(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodResponseDTO> updateFood(@PathVariable Long id, @Valid @RequestBody FoodUpdateDTO updateDTO) {
        FoodResponseDTO updatedFood = foodService.updateFood(id, updateDTO);
        return ResponseEntity.ok(updatedFood);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }

    // FEATURE IMAGE POUR PLUS TARD

    private final Path root = Paths.get("uploads");

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Fichier vide");
            }

            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destination = root.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(filename);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<UrlResource> getImage(@PathVariable String filename) throws IOException {
        Path file = root.resolve(filename);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }

        UrlResource resource = new UrlResource(file.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}
