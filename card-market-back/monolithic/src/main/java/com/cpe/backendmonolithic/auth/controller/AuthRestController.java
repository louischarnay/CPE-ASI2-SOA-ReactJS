package com.cpe.backendmonolithic.auth.controller;

import com.cpe.backendmonolithic.auth.model.AuthDTO;
import com.cpe.backendmonolithic.user.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

//ONLY FOR TEST NEED ALSO TO ALLOW CROSS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController
public class AuthRestController {

	private final AuthService authService;
	
	public AuthRestController(AuthService authService) {
		this.authService = authService;
	}

	@RequestMapping(method=RequestMethod.POST,value="/auth")
	private Integer login(@RequestBody AuthDTO authDto) {
		 List<UserModel> uList = authService.getUserByLoginPwd(authDto.getUsername(),authDto.getPassword());
		if(!uList.isEmpty()) {
			return uList.get(0).getId();
		}
		throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentification Failed", null);

	}

}
