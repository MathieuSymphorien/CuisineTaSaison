package com.mathieu.cts.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecipeNotFoundException extends RuntimeException {

    public RecipeNotFoundException(Long id) {
        super("Recette non trouvée avec l'id: " + id);
    }

    public RecipeNotFoundException(String message) {
        super(message);
    }
}
