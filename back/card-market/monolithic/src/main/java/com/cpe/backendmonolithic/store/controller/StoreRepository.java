package com.cpe.backendmonolithic.store.controller;

import org.springframework.data.repository.CrudRepository;

import com.cpe.backendmonolithic.store.model.StoreTransaction;

public interface StoreRepository extends CrudRepository<StoreTransaction, Integer> {
	

}
