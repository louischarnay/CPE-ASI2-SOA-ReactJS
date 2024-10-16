package com.cpe.backendmonolithic.card.Controller;

import org.springframework.data.repository.CrudRepository;

import com.cpe.backendmonolithic.card.model.CardReference;

public interface CardRefRepository extends CrudRepository<CardReference, Integer> {

}
