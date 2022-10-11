import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart
} from "../../store/cart/cart.action";

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
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

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
