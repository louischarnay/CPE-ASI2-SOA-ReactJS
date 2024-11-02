package com.cpe.cardgenerator.model;

public class CardDTO {
	private Integer id;
	private String name;
	private String description;
	private float energy;
	private float hp;
	private float defence;
	private float attack;
	private float price;
	private Integer userId;
	private String imgUrl;

	public CardDTO() {

	}

	public CardDTO(CardDTO card) {
		this.id = card.getId();
		this.name = card.getName();
		this.description = card.getDescription();
		this.energy = card.getEnergy();
		this.hp = card.getHp();
		this.defence = card.getDefence();
		this.attack = card.getAttack();
		this.price = card.getPrice();
		this.userId = card.getUserId();
		this.imgUrl = card.getImgURL();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public float getEnergy() {
		return energy;
	}

	public void setEnergy(float energy) {
		this.energy = energy;
	}

	public float getHp() {
		return hp;
	}

	public void setHp(float hp) {
		this.hp = hp;
	}

	public float getDefence() {
		return defence;
	}

	public void setDefence(float defence) {
		this.defence = defence;
	}

	public float getAttack() {
		return attack;
	}

	public void setAttack(float attack) {
		this.attack = attack;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

}
