package com.mathieu.cts.controllers;

import com.mathieu.cts.entities.Months;
import com.mathieu.cts.entities.DTO.recipe.RecipeCreateDTO;
import com.mathieu.cts.entities.DTO.recipe.RecipeResponseDTO;
import com.mathieu.cts.entities.DTO.recipe.RecipeUpdateDTO;
import com.mathieu.cts.services.RecipeService;
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
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    private final Path root = Paths.get("uploads");

    @GetMapping
    public ResponseEntity<List<RecipeResponseDTO>> getAllRecipes(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) Integer timeMin,
        @RequestParam(required = false) Integer timeMax,
        @RequestParam(required = false) Boolean oven,
        @RequestParam(required = false) List<Months> months
    ) {
        List<RecipeResponseDTO> recipes = recipeService.getAllRecipes(name, timeMin, timeMax, oven, months);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDTO> getRecipeById(@PathVariable Long id) {
        RecipeResponseDTO recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok(recipe);
    }

    @PostMapping
    public ResponseEntity<RecipeResponseDTO> createRecipe(@Valid @RequestBody RecipeCreateDTO createDTO) {
        RecipeResponseDTO createdRecipe = recipeService.createRecipe(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponseDTO> updateRecipe(@PathVariable Long id, @Valid @RequestBody RecipeUpdateDTO updateDTO) {
        RecipeResponseDTO updatedRecipe = recipeService.updateRecipe(id, updateDTO);
        return ResponseEntity.ok(updatedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    // FEATURE IMAGE POUR PLUS TARD

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
