package com.mathieu.cts.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class FoodAlreadyExistsException extends RuntimeException {

    public FoodAlreadyExistsException(String name) {
        super("Un aliment avec le nom '" + name + "' existe déjà");
    }
}
