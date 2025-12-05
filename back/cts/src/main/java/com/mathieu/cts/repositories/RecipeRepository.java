package com.mathieu.cts.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mathieu.cts.entities.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}
