//cartItems - existing cart
  
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map(cartItem =>
        cartItem.id === cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  };

  export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    //find returns the cartItem where the condition matches
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {//if the item quantity is 1 and the decrementer arrow is clicked remove
      //the item from the cart
      //filter keeps the values where the function returns true
      return cartItems.filter(cartItem =>
          cartItem.id !== cartItemToRemove.id        
      );
    }
    
    //if the decrementer arrow is clicked and the cart quantity is not 1 then decrease the quantity by 1 
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )

  };