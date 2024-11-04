package com.cpe.backendmonolithic.card.Controller;

import com.cpe.backendmonolithic.card.model.CardModel;
import com.cpe.backendmonolithic.user.model.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardModelRepository extends CrudRepository<CardModel, Integer> {
    List<CardModel> findByUser(UserModel u);
}
