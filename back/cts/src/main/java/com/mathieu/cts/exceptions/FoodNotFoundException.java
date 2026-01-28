package com.mathieu.cts.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FoodNotFoundException extends RuntimeException {

    public FoodNotFoundException(Long id) {
        super("Food non trouvé avec l'id: " + id);
    }

    public FoodNotFoundException(String message) {
        super(message);
    }
}
