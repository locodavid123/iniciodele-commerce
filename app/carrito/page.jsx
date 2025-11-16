"use client";
import React, { useState } from 'react';
import './ShoppingCart.css'; // Asumiremos que crearás un archivo CSS para los estilos

const ShoppingCart = () => {
    // Datos de ejemplo. En una aplicación real, esto vendría de un estado global (Context, Redux) o una API.
    const [cartItems, setCartItems] = useState([
    ]); // El carrito ahora inicia vacío

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) {
            // Opcional: si la cantidad es menor a 1, eliminamos el producto.
            handleRemoveItem(id);
            return;
        }
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50 ? 0 : 10; // Envío gratis si el subtotal supera $50
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="shopping-cart-empty">
                <h2>Tu carrito de compras está vacío.</h2>
                <button onClick={() => alert('Redirigiendo a la tienda...')}>
                    Seguir Comprando
                </button>
            </div>
        );
    }

    return (
        <div className="shopping-cart">
            <h1>Carrito de Compras</h1>
            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>Precio: ${item.price.toFixed(2)}</p>
                                <div className="item-quantity">
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div className="item-actions">
                                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Envío</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => alert('Procediendo al pago...')}>
                        Proceder al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;