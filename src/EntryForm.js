import React, { useState } from "react";

export default function CreateEntry({
	onSubmit,
	entry = {
		shop: "",
		drink: "",
		date: "",
		price: "",
		rating: "",
		location: "",
		note: "",
	},
}) {
	const [shop, setShop] = useState(entry.shop);
	const [drink, setDrink] = useState(entry.drink);
	const [date, setDate] = useState(entry.date);
	const [price, setPrice] = useState(entry.price);
	const [rating, setRating] = useState(entry.rating);
	const [location, setLocation] = useState(entry.location);
	const [note, setNote] = useState(entry.note);
	const [isStoreInvalid, setIsStoreInvalid] = useState(false);
	const [isDrinkInvalid, setIsDrinkInvalid] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();

		if (shop.trim().length === 0) {
			setIsStoreInvalid(true);
			return;
		}
		setIsStoreInvalid(false);
		if (drink.trim().length === 0) {
			setIsDrinkInvalid(true);
			return;
		}
		setIsDrinkInvalid(false);

		onSubmit(shop, drink, date, price, rating, location, note);

		setShop("");
		setDrink("");
		setDate("YYYY-MM-DD");
		setPrice("");
		setRating("");
		setLocation("");
		setNote("");
	}

	function handleShopChange(event) {
		setShop(event.target.value);
	}

	function handleDrinkChange(event) {
		setDrink(event.target.value);
	}

	function handleDateChange(event) {
		setDate(event.target.value);
	}

	function handlePriceChange(event) {
		setPrice(Number(event.target.value));
	}

	function handleRatingChange(event) {
		setRating(Number(event.target.value));
	}

	function handleLocationChange(event) {
		setLocation(event.target.value);
	}

	function handleNoteChange(event) {
		setNote(event.target.value);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group row">
				<label
					htmlFor="store"
					className="col-sm-2 col-form-label text-sm-right"
				>
					Store: <span className="text-danger">*</span>
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						value={shop}
						className={`form-control ${isStoreInvalid ? "is-invalid" : ""}`}
						onChange={handleShopChange}
						id="store"
						required
						data-testid="shop"
					/>
					<small className="invalid-feedback">Store is a required field</small>
				</div>
			</div>

			<div className="form-group row">
				<label
					htmlFor="drink"
					className="col-sm-2 col-form-label text-sm-right"
				>
					Drink: <span className="text-danger">*</span>
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						value={drink}
						className={`form-control ${isDrinkInvalid ? "is-invalid" : ""}`}
						onChange={handleDrinkChange}
						id="drink"
						required
						data-testid="drink"
					/>

					<small className="invalid-feedback">Drink is a required field</small>
				</div>
			</div>

			<div className="form-group row">
				<label htmlFor="date" className="col-sm-2 col-form-label text-sm-right">
					Date:
				</label>
				<div className="col-sm-10">
					<input
						type="date"
						value={date}
						id="date"
						className="form-control mt-2"
						onChange={handleDateChange}
						data-testid="date"
					/>
				</div>
			</div>

			<div className="form-group row">
				<label
					htmlFor="price-id"
					className="col-sm-2 col-form-label text-sm-right"
				>
					Price:
				</label>
				<div className="col-sm-10">
					<input
						type="number"
						value={price}
						step="0.01"
						min="0"
						id="price-id"
						className="form-control"
						onChange={handlePriceChange}
						data-testid="price"
					/>
				</div>
			</div>

			<div className="form-group row">
				<label
					htmlFor="rating"
					className="col-sm-2 col-form-label text-sm-right"
				>
					Rating:
				</label>
				<div className="col-sm-10">
					<select
						id="rating"
						value={rating}
						className="form-control"
						onChange={handleRatingChange}
						data-testid="rating"
					>
						<option value="" disabled>
							-- Select One --
						</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
				</div>
			</div>

			<div className="form-group row">
				<label
					htmlFor="location"
					className="col-sm-2 col-form-label text-sm-right"
				>
					Location:
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						value={location}
						className="form-control"
						onChange={handleLocationChange}
						id="location"
						data-testid="location"
					/>
				</div>
			</div>

			<div className="form-group row">
				<label htmlFor="note" className="col-sm-2 col-form-label text-sm-right">
					Description:
				</label>
				<div className="col-sm-10">
					<textarea
						className="form-control"
						id="note"
						value={note}
						onChange={handleNoteChange}
						data-testid="note"
					></textarea>
				</div>
			</div>

			<div className="form-group row">
				<div className="col-sm-2"></div>
				<div className="col-sm-10 mt-2">
					<button
						type="submit"
						className="btn btn-primary "
						data-testid="submit-button"
					>
						Submit
					</button>
					<button type="reset" className="btn btn-light">
						Reset
					</button>
				</div>
			</div>
		</form>
	);
}
