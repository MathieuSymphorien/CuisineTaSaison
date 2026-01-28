package com.mathieu.cts.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mathieu.cts.entities.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByApprovedTrue();

    List<Recipe> findByApprovedFalse();
}
