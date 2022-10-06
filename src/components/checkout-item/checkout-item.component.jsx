import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckOutItemContainer,
  ImageContainer,
  CheckoutImage,
  ItemName,
  ItemQuantity,
  ItemPrice,
  Arrow,
  ItemValue,
  RemoveButton
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckOutItemContainer>
      <ImageContainer>
        <CheckoutImage src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <ItemName>{name}</ItemName>
      <ItemQuantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <ItemValue>{quantity}</ItemValue>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </ItemQuantity>
      <ItemPrice>{price}</ItemPrice>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckOutItemContainer>
  );
};

export default CheckoutItem;
