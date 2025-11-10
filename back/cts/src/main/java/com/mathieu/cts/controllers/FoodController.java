package com.mathieu.cts.controllers;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;
import com.mathieu.cts.entities.DTO.FoodDTO;
import com.mathieu.cts.services.FoodService;

import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;


@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    @Inject
    private final FoodService foodService;

    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) FoodCategory category,
        @RequestParam(required = false) List<Months> months
    ) {
        List<FoodDTO> foods = foodService.getAllFoods(name, category, months);
        return ResponseEntity.ok(foods);
    }


    @GetMapping("/seasonal")
    public ResponseEntity<List<FoodDTO>> getSeasonalFruitsAndVegetables() {
        return ResponseEntity.ok(foodService.getSeasonalFruitsAndVegetables());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        FoodDTO foodDTO = foodService.getFoodById(id);
        return ResponseEntity.ok(foodDTO);
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }

    private final Path root = Paths.get("uploads"); // dossier local

    public void FileController() throws IOException {
        Files.createDirectories(root);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) return ResponseEntity.badRequest().body("Fichier vide");

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destination = root.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            // Ici tu peux sauvegarder le nom du fichier en base avec l’objet associé
            return ResponseEntity.ok(filename);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<UrlResource> getImage(@PathVariable String filename) throws IOException {
        Path file = root.resolve(filename);
        if (!Files.exists(file)) return ResponseEntity.notFound().build();

        UrlResource resource = new UrlResource(file.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}