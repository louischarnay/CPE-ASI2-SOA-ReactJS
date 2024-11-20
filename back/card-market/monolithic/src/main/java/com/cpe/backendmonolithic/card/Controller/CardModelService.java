package com.cpe.backendmonolithic.card.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.cpe.backendmonolithic.card.model.CardDTO;
import com.cpe.backendmonolithic.card.model.CardModel;
import com.cpe.backendmonolithic.card.model.CardReference;
import org.springframework.stereotype.Service;

import com.cpe.backendmonolithic.common.tools.DTOMapper;

@Service
public class CardModelService {
	private final CardModelRepository cardRepository;
	private final CardReferenceService cardRefService;
	private Random rand;

	public CardModelService(CardModelRepository cardRepository,CardReferenceService cardRefService) {
		this.rand=new Random();
		// Dependencies injection by constructor
		this.cardRepository=cardRepository;
		this.cardRefService=cardRefService;
	}
	
	public List<CardModel> getAllCardModel() {
		List<CardModel> cardList = new ArrayList<>();
		cardRepository.findAll().forEach(cardList::add);
		return cardList;
	}

	public CardDTO addCard(CardModel cardModel) {
		CardModel cDb=cardRepository.save(cardModel);
		return DTOMapper.fromCardModelToCardDTO(cDb);
	}

	public void updateCardRef(CardModel cardModel) {
		cardRepository.save(cardModel);

	}
	public CardDTO updateCard(CardModel cardModel) {
		CardModel cDb=cardRepository.save(cardModel);
		return DTOMapper.fromCardModelToCardDTO(cDb);
	}
	public Optional<CardModel> getCard(Integer id) {
		return cardRepository.findById(id);
	}
	
	public void deleteCardModel(Integer id) {
		cardRepository.deleteById(id);
	}
	
	public List<CardModel> getRandCard(int nbr) {
		List<CardModel> cardList = new ArrayList<>();
		for (int i = 0; i < nbr; i++) {
			CardReference currentCardRef = cardRefService.getRandCardRef();
			CardModel currentCard = new CardModel(currentCardRef);
			currentCard.setAttack(rand.nextInt(51) + 50); // Entre 50 et 100 inclus
			currentCard.setDefence(rand.nextInt(51) + 50); // Entre 50 et 100 inclus
			currentCard.setEnergy(100); // Valeur fixe
			currentCard.setHp(rand.nextInt(51) + 50); // Entre 50 et 100 inclus
			currentCard.setPrice(currentCard.computePrice());
			//save new card before sending for user creation
			//this.addCard(currentCard);
			cardList.add(currentCard);
		}
		return cardList;
	}
	

	public List<CardModel> getAllCardToSell(){
		return this.cardRepository.findByUser(null);
	}
}

