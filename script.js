// Base de datos de productos (Perfumes)
const products = [
    {
        id: 1,
        name: "Noir Intense",
        category: "masculino",
        price: 145.00,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
        notes: "Cardamomo, Cuero, Madera de Cedro",
        description: "Una fragancia profunda y magnética para el hombre moderno que impone presencia."
    },
    {
        id: 2,
        name: "Velvet Rose",
        category: "femenino",
        price: 130.00,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
        notes: "Rosa de Damasco, Pimienta Rosa, Almizcle Blanco",
        description: "Delicada y seductora, evoca la elegancia clásica con un toque contemporáneo."
    },
    {
        id: 3,
        name: "Aura Solar",
        category: "unisex",
        price: 155.00,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        notes: "Bergamota, Ámbar Gris, Flor de Naranjo",
        description: "Un tributo a la luz solar mediterránea, vibrante y refrescante en cada aplicación."
    },
    {
        id: 4,
        name: "Oud Imperial",
        category: "masculino",
        price: 185.00,
        image: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&q=80&w=800",
        notes: "Madera de Oud, Incienso, Patchouli",
        description: "Riqueza oriental absoluta para ocasiones donde se requiere máxima distinción."
    },
    {
        id: 5,
        name: "Jazmín Nocturno",
        category: "femenino",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        notes: "Jazmín Grandiflorum, Vainilla Bourbon, Sándalo",
        description: "Un bouquet floral blanco intensificado por la calidez de la vainilla nocturna."
    },
    {
        id: 6,
        name: "Santal Blanc",
        category: "unisex",
        price: 160.00,
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800",
        notes: "Sándalo de Australia, Higo, Iris",
        description: "Minimalismo puro y reconfortante que se funde perfectamente con la piel."
    }
];

// Estado del Carrito
let cart = [];

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartCountSpan = document.getElementById('cart-count');
const drawerItemCount = document.getElementById('drawer-item-count');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartFooter = document.getElementById('cart-footer');
const cartSubtotalSpan = document.getElementById('cart-subtotal');
const checkoutBtn = document.getElementById('checkout-btn');
const newsletterForm = document.getElementById('newsletter-form');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Inicialización de la Aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// Renderizar Productos en el Grid
function renderProducts(items) {
    productGrid.innerHTML = '';
    
    if (items.length === 0) {
        productGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-12">No se encontraron productos en esta categoría.</p>`;
        return;
    }

    items.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-[#121212] border border-[#262626] group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#d4af37]';
        
        productCard.innerHTML = `
            <div class="relative overflow-hidden bg-[#1a1a1a] h-80">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-4 left-4 bg-[#0b0b0b]/80 border border-[#262626] text-[10px] uppercase tracking-widest px-3 py-1 text-[#d4af37] font-semibold">
                    ${product.category}
                </span>
            </div>
            <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                    <h3 class="font-cormorant text-2xl font-bold tracking-wide">${product.name}</h3>
                    <p class="text-[11px] text-[#d4af37] uppercase tracking-wider mt-1 font-medium">Notas: ${product.notes}</p>
                    <p class="text-gray-400 text-xs font-light mt-2 leading-relaxed">${product.description}</p>
                </div>
                <div class="pt-4 border-t border-[#262626] flex items-center justify-between">
                    <span class="font-cormorant text-xl font-bold text-[#d4af37]">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="px-4 py-2 bg-transparent border border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all">
                        Añadir
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Configurar Event Listeners
function setupEventListeners() {
    // Cambio de estilo en Navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-[#0b0b0b]/90', 'backdrop-blur-md', 'border-b', 'border-[#262626]');
        } else {
            navbar.classList.remove('bg-[#0b0b0b]/90', 'backdrop-blur-md', 'border-b', 'border-[#262626]');
        }
    });

    // Menú móvil toggle
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Filtrado de productos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Apertura y cierre del carrito
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Formulario de Newsletter
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput.value.trim() !== '') {
            showToast('¡Te has suscrito exitosamente al Club Privado!');
            emailInput.value = '';
        }
    });

    // Botón de Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showToast('¡Compra procesada con éxito! Gracias por elegirnos.');
            cart = [];
            updateCartUI();
            closeCart();
        }
    });
}

// Añadir Producto al Carrito
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`"${product.name}" añadido a la bolsa`);
}

// Actualizar Interfaz del Carrito
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.textContent = totalItems;
    drawerItemCount.textContent = totalItems;

    if (cart.length === 0) {
        emptyCartMsg.classList.remove('hidden');
        cartFooter.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCartMsg);
    } else {
        emptyCartMsg.classList.add('hidden');
        cartFooter.classList.remove('hidden');
        
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'flex items-center space-x-4 pt-6 first:pt-0';
            
            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover bg-[#1a1a1a] border border-[#262626]">
                <div class="flex-1">
                    <h4 class="font-cormorant font-bold text-lg">${item.name}</h4>
                    <p class="text-xs text-[#d4af37] font-semibold mt-1">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center space-x-3 mt-3">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="w-6 h-6 border border-[#262626] text-xs flex items-center justify-center hover:border-[#d4af37] transition-colors">-</button>
                        <span class="text-xs font-medium">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="w-6 h-6 border border-[#262626] text-xs flex items-center justify-center hover:border-[#d4af37] transition-colors">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-red-400 text-sm transition-colors"><i class="fa-solid fa-trash-can"></i></button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });

        cartSubtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// Modificar Cantidad en Carrito
window.updateQuantity = function(productId, newQty) {
    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = newQty;
        updateCartUI();
    }
}

// Eliminar Elemento del Carrito
window.removeFromCart = function(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCartUI();
}

// Abrir Carrito
function openCart() {
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
    setTimeout(() => cartOverlay.classList.remove('opacity-0'), 10);
}

// Cerrar Carrito
function closeCart() {
    cartDrawer.classList.add('translate-x-full');
    cartOverlay.classList.add('opacity-0');
    setTimeout(() => cartOverlay.classList.add('hidden'), 300);
}

// Mostrar Notificación Toast
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}