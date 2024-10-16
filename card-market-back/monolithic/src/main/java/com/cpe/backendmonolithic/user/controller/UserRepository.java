package com.cpe.backendmonolithic.user.controller;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.cpe.backendmonolithic.user.model.UserModel;

public interface UserRepository extends CrudRepository<UserModel, Integer> {
	
	List<UserModel> findByLoginAndPwd(String login,String pwd);

}
