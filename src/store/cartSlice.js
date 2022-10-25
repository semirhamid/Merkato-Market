import { ContentCutOutlined } from "@mui/icons-material";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const index = state.cartItems.findIndex((item) => (item).id === action.payload.id)
            if (index >= 0) {
                state.cartItems[index].quantity += 1
            } else {
                state.cartItems.push(action.payload)
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cartItems = nextCartItems;

                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        
        }
    }
});

export const {addToCart, decreaseCart, removeFromCart,clearCart} = cartSlice.actions;

export default cartSlice.reducer;