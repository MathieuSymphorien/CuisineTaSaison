package com.mathieu.cts.controllers;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @GetMapping("/categories")
    public ResponseEntity<FoodCategory[]> getCategories() {
        return ResponseEntity.ok(FoodCategory.values());
    }

    @GetMapping("/months")
    public ResponseEntity<Months[]> getMonths() {
        return ResponseEntity.ok(Months.values());
    }
}
