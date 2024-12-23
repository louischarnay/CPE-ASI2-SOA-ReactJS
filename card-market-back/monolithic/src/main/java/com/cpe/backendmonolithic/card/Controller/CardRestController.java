package com.cpe.backendmonolithic.card.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.cpe.backendmonolithic.card.model.CardDTO;
import com.cpe.backendmonolithic.card.model.CardModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.cpe.backendmonolithic.common.tools.DTOMapper;

//ONLY FOR TEST NEED ALSO TO ALLOW CROSS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController

public class CardRestController {

	private final CardModelService cardModelService;
	
	public CardRestController(CardModelService cardModelService) {
		this.cardModelService=cardModelService;
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/cards")
	private List<CardDTO> getAllCards() {
		List<CardDTO> cLightList=new ArrayList<>();
		for(CardModel c:cardModelService.getAllCardModel()){
			cLightList.add(new CardDTO(c));
		}
		return cLightList;

	}
	
	@RequestMapping(method=RequestMethod.GET, value="/card/{id}")
	private CardDTO getCard(@PathVariable String id) {
		Optional<CardModel> rcard;
		rcard= cardModelService.getCard(Integer.valueOf(id));
		if(rcard.isPresent()) {
			return DTOMapper.fromCardModelToCardDTO(rcard.get());
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card id:"+id+", not found",null);

	}
	
	@RequestMapping(method=RequestMethod.POST,value="/card")
	public CardDTO addCard(@RequestBody CardDTO card) {
		return cardModelService.addCard(DTOMapper.fromCardDtoToCardModel(card));
	}
	
	@RequestMapping(method=RequestMethod.PUT,value="/card/{id}")
	public CardDTO updateCard(@RequestBody CardDTO card,@PathVariable String id) {
		card.setId(Integer.valueOf(id));
		 return cardModelService.updateCard(DTOMapper.fromCardDtoToCardModel(card));
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/card/{id}")
	public void deleteCard(@PathVariable String id) {
		cardModelService.deleteCardModel(Integer.valueOf(id));
	}

	
}
