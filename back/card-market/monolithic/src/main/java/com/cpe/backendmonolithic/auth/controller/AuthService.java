package com.cpe.backendmonolithic.auth.controller;

import com.cpe.backendmonolithic.user.controller.UserService;
import com.cpe.backendmonolithic.user.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

	private final UserService userService;

	public AuthService(UserService userService) {
		this.userService = userService;
	}

	public List<UserModel> getUserByLoginPwd(String login, String pwd) {
		return userService.getUserByLoginPwd(login, pwd);
	}

}
