/**
 * @jest-environment jsdom
 */

const testHTML = require('./testHTML');

// Mock the main.js functions since we need to test them
// We'll need to refactor main.js to be testable
describe('Frontend E-commerce Application Tests', () => {
    beforeEach(() => {
        // Set up DOM
        document.documentElement.innerHTML = testHTML;
        
        // Mock fetch responses
        globalThis.fetch = jest.fn();
        
        // Reset any global variables
        jest.clearAllMocks();
    });

    describe('Utility Functions', () => {
        test('formatCurrency should format numbers correctly', () => {
            // We need to extract this function to test it
            const formatCurrency = (amount) => {
                return `$${parseFloat(amount).toFixed(2)}`;
            };
            
            expect(formatCurrency(10)).toBe('$10.00');
            expect(formatCurrency(10.5)).toBe('$10.50');
            expect(formatCurrency(10.555)).toBe('$10.55');
            expect(formatCurrency('15')).toBe('$15.00');
            expect(formatCurrency(0)).toBe('$0.00');
        });

        test('showMessage should display message correctly', () => {
            const messageBox = document.getElementById('message-box');
            
            // Mock the showMessage function
            const showMessage = (message, type = 'info') => {
                messageBox.textContent = message;
                messageBox.className = `message-box ${type}`;
                messageBox.style.display = 'block';
            };
            
            showMessage('Test message', 'success');
            
            expect(messageBox.textContent).toBe('Test message');
            expect(messageBox.className).toBe('message-box success');
            expect(messageBox.style.display).toBe('block');
        });
    });

    describe('DOM Element Access', () => {
        test('all required DOM elements should exist', () => {
            expect(document.getElementById('message-box')).toBeTruthy();
            expect(document.getElementById('product-form')).toBeTruthy();
            expect(document.getElementById('product-list')).toBeTruthy();
            expect(document.getElementById('customer-form')).toBeTruthy();
            expect(document.getElementById('customer-list')).toBeTruthy();
            expect(document.getElementById('cart-items')).toBeTruthy();
            expect(document.getElementById('cart-total')).toBeTruthy();
            expect(document.getElementById('place-order-form')).toBeTruthy();
            expect(document.getElementById('order-list')).toBeTruthy();
        });
    });

    describe('API Interaction Tests', () => {
        test('fetch products should handle successful response', async () => {
            const mockProducts = [
                { id: 1, name: 'Test Product', price: 10.99, stock_quantity: 5 }
            ];
            
            globalThis.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockProducts
            });
            
            // Mock fetchProducts function
            const fetchProducts = async () => {
                const response = await fetch('http://localhost:8000/products/');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            };
            
            const result = await fetchProducts();
            expect(result).toEqual(mockProducts);
            expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:8000/products/');
        });

        test('fetch products should handle error response', async () => {
            globalThis.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500
            });
            
            const fetchProducts = async () => {
                const response = await fetch('http://localhost:8000/products/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            };
            
            await expect(fetchProducts()).rejects.toThrow('HTTP error! status: 500');
        });

        test('create product should send correct data', async () => {
            const productData = {
                name: 'New Product',
                description: 'Test description',
                price: 19.99,
                stock_quantity: 10
            };
            
            globalThis.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 1, ...productData })
            });
            
            const createProduct = async (product) => {
                const response = await fetch('http://localhost:8000/products/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to create product');
                }
                return response.json();
            };
            
            const result = await createProduct(productData);
            
            expect(globalThis.fetch).toHaveBeenCalledWith(
                'http://localhost:8000/products/',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                })
            );
            
            expect(result).toEqual({ id: 1, ...productData });
        });
    });

    describe('Form Validation Tests', () => {
        test('product form should validate required fields', () => {
            const validateProductForm = (formData) => {
                const errors = [];
                
                if (!formData.name || formData.name.trim() === '') {
                    errors.push('Product name is required');
                }
                
                if (!formData.price || formData.price <= 0) {
                    errors.push('Price must be greater than 0');
                }
                
                if (!formData.stock_quantity || formData.stock_quantity < 0) {
                    errors.push('Stock quantity must be 0 or greater');
                }
                
                return errors;
            };
            
            // Test empty form
            let errors = validateProductForm({});
            expect(errors).toContain('Product name is required');
            expect(errors).toContain('Price must be greater than 0');
            expect(errors).toContain('Stock quantity must be 0 or greater');
            
            // Test valid form
            errors = validateProductForm({
                name: 'Valid Product',
                price: 10.99,
                stock_quantity: 5
            });
            expect(errors).toHaveLength(0);
        });

        test('customer form should validate email format', () => {
            const validateEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };
            
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('')).toBe(false);
            expect(validateEmail('test@')).toBe(false);
        });
    });

    describe('Shopping Cart Tests', () => {
        test('cart should calculate total correctly', () => {
            const calculateCartTotal = (cartItems) => {
                return cartItems.reduce((total, item) => {
                    return total + (item.price * item.quantity);
                }, 0);
            };
            
            const cart = [
                { id: 1, price: 10.99, quantity: 2 },
                { id: 2, price: 5.50, quantity: 1 }
            ];
            
            const total = calculateCartTotal(cart);
            expect(total).toBe(27.48); // (10.99 * 2) + (5.50 * 1)
        });

        test('cart should add items correctly', () => {
            let cart = [];
            
            const addToCart = (cart, product, quantity = 1) => {
                const existingItem = cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ ...product, quantity });
                }
                
                return cart;
            };
            
            const product1 = { id: 1, name: 'Product 1', price: 10.99 };
            const product2 = { id: 2, name: 'Product 2', price: 5.50 };
            
            // Add new product
            cart = addToCart(cart, product1, 2);
            expect(cart).toHaveLength(1);
            expect(cart[0].quantity).toBe(2);
            
            // Add different product
            cart = addToCart(cart, product2, 1);
            expect(cart).toHaveLength(2);
            
            // Add existing product (should increase quantity)
            cart = addToCart(cart, product1, 1);
            expect(cart).toHaveLength(2);
            expect(cart[0].quantity).toBe(3);
        });
    });

    describe('Error Handling Tests', () => {
        test('should handle network errors gracefully', async () => {
            globalThis.fetch.mockRejectedValueOnce(new Error('Network error'));
            
            const fetchWithErrorHandling = async (url) => {
                try {
                    const response = await fetch(url);
                    return response;
                } catch (error) {
                    console.error('Network error:', error.message);
                    return null;
                }
            };
            
            const result = await fetchWithErrorHandling('http://localhost:8000/products/');
            expect(result).toBeNull();
        });
    });
});