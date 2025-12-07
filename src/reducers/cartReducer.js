const cartReducer = (cart, action) => {
  switch (action.type) {
    case "Add_to_cart":
      const updatedcart = [...cart];
      const prodIndex = updatedcart.findIndex(
        (item) => item.product._id === product._id
      );
      const { product, quantity } = action.payload;
      if (prodIndex === -1) {
        updatedcart.push({ product: product, quantity: quantity });
      } else {
        updatedcart[prodIndex].quantity += quantity;
      }
      return updatedcart;


      case "Get_cart":
        return action.payload.products

        case "Revert_cart":
            return action.payload.cart

            case "Remove_cart":
                  const oldcart = [...cart];
    const newcart = oldcart.filter((item) => item.product._id !== action.payload.id);
   return newcart

  }
};

export default cartReducer;
