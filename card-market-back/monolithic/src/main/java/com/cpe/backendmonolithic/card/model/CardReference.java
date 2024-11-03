package com.cpe.backendmonolithic.card.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;

@Entity
public class CardReference extends CardBasics implements Serializable {

	private static final long serialVersionUID = -7059808842444736266L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	public CardReference() {
	}

	public CardReference(CardBasics c) {
		super(c);
	}

	public CardReference(String name, String description, String imgUrl) {
		super(name, description,imgUrl);
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

}
