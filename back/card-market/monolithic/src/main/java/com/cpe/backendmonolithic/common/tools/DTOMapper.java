package com.cpe.backendmonolithic.common.tools;
import com.cpe.backendmonolithic.card.model.CardDTO;
import com.cpe.backendmonolithic.card.model.CardModel;
import com.cpe.backendmonolithic.user.model.UserDTO;
import com.cpe.backendmonolithic.user.model.UserModel;

public class DTOMapper {
	
	public static CardDTO fromCardModelToCardDTO(CardModel cM) {
		CardDTO cDto =new CardDTO(cM);
		return cDto;
	}
	
	public static CardModel fromCardDtoToCardModel(CardDTO cD) {
		CardModel cm=new CardModel(cD);
		cm.setEnergy(cD.getEnergy());
		cm.setHp(cD.getHp());
		cm.setDefence(cD.getDefence());
		cm.setAttack(cD.getAttack());
		cm.setPrice(cD.getPrice());
		cm.setId(cD.getId());
		return cm;
	}
	
	
	public static UserDTO fromUserModelToUserDTO(UserModel uM) {
		UserDTO uDto =new UserDTO(uM);
		return uDto;
	}
	
}
