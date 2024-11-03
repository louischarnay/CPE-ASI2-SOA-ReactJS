package com.cpe.backendmonolithic.card.model;

import jakarta.persistence.*;

@MappedSuperclass
public class CardBasics {
	private String name;
	@Column(length = 5000)
	private String description;
	private String imgUrl;

	public CardBasics() {
		super();
	}

	public CardBasics(CardBasics c) {
		this(c.getName(), c.getDescription(), c.getImgUrl());
	}

	public CardBasics(String name, String description, String imgUrl) {
		super();
		this.name = name;
		this.description = description;
		this.imgUrl = imgUrl;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

}
