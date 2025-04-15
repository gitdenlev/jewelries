const toCartBtn = document.querySelector('.cart-btn');
const header = document.querySelector('header');
const sectFront = document.getElementById("front");
const sectMenu = document.getElementById("menu");
const divBeforeMenu = document.querySelector(".before-menu");
const divAfterMenu = document.querySelector('.content-after-menu');
const sectCatalog = document.getElementById("section-catalog");
const sectCart = document.getElementById("cart");
const btnText = document.querySelector('.btn-text');
const starBorders = document.querySelectorAll('.star-border'); // Збираємо всі елементи з класом star-border

// Додаємо обробник події на кожен елемент star-border
starBorders.forEach(star => {
  star.addEventListener('click', () => {
    const card = star.closest('.card'); // Знаходимо найближчу картку до цього елемента
    const button = card.querySelector('button'); // Знаходимо кнопку в цій картці
    // Викликаємо функцію, яка додає товар в кошик, так само як при натисканні на кнопку
    const priceText = button.innerText.trim(); // Наприклад: "100 uah"
    const price = parseInt(priceText);
    const imgSrc = card.querySelector('.jewel').getAttribute('src');
    	const existingItem = cartItems.find(item => item.img === imgSrc);
    	if (existingItem) {
      	existingItem.quantity++;
    	} else {
      	cartItems.push({
        	img: imgSrc,
        	price: price,
        	quantity: 1
      	});
    	}
    totalItems++;
    updateCartUI();
    updateCartCountDisplay();
  });
});

let cartOpen = false;
let totalItems = 0; // кількість усіх товарів

function updateCartCountDisplay() {
  const btnText = document.querySelector('.btn-text');
  	// Якщо кошик відкритий — показуємо тільки текст "Back to shopping"
  	if (cartOpen) {
    	btnText.innerHTML = `<p class="to-shopping">Back to shopping</p>`;
    	return;
  	}
  // Інакше показуємо кількість товарів
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  btnText.innerHTML = `
    <p class="number">${totalItems}</p>
    <p>${totalItems === 1 ? 'piece' : 'pieces'}</p>
  `;
}

function showCart() {
  if (!cartOpen) {
    // Відкриваємо кошик
    header.classList.add('section-hidden');
    sectFront.classList.add('section-hidden');
    sectCatalog.classList.add('section-hidden');
    divBeforeMenu.classList.add('section-hidden');
    	sectCart.classList.remove('section-hidden');
    sectCart.classList.add('cart-slide-in');
    sectCart.classList.remove('page-top-spacing');
    	cartOpen = true;
    updateCartCountDisplay();
  } else {
    // Повертаємось до каталогу
    header.classList.remove('section-hidden');
    sectFront.classList.remove('section-hidden');
    sectCatalog.classList.remove('section-hidden');
    divBeforeMenu.classList.remove('section-hidden');
    	sectCart.classList.add('section-hidden');
    sectCart.classList.remove('cart-slide-in');
    sectCart.classList.add('page-top-spacing');
    // Додаємо анімацію для каталогу (тепер вниз)
    sectCatalog.classList.add('catalog-slide-in');
    // Після завершення анімації, прибираємо клас щоб не накопичувався
    setTimeout(() => {
      sectCatalog.classList.remove('catalog-slide-in');
    }, 600);
    // Скролимо до каталогу
    sectCatalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    	cartOpen = false;
    updateCartCountDisplay();
  }
}

const cards = document.querySelectorAll('.card');
const cartItemsContainer = document.querySelector('.cart-items');
const cartItems = [];

cards.forEach(card => {
  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    const priceText = button.innerText.trim(); // наприклад: "100 uah"
    const price = parseInt(priceText);
    const imgSrc = card.querySelector('.jewel').getAttribute('src');
    	const existingItem = cartItems.find(item => item.img === imgSrc);
    	if (existingItem) {
      	existingItem.quantity++;
    	} else {
      	cartItems.push({
        	img: imgSrc,
        	price: price,
        	quantity: 1
      	});
    	}
    totalItems++;
    updateCartUI();
    updateCartCountDisplay();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  	cartItems.forEach((item, index) => {
    	const row = document.createElement('div');
    	row.classList.add('cart-row');
    	row.innerHTML = `
      	<img class="item-img" src="${item.img}"/>
      	<span class="span-price">${item.price * item.quantity} uah</span>
      	<div class="quantity-container">
        	<button class="btn btn-remove" data-index="${index}" type="button">-</button>
        	<span class="quantity-number">${item.quantity}</span>
        	<button class="btn btn-add" data-index="${index}" type="button">+</button>
      	</div>
    	`;
    	cartItemsContainer.appendChild(row);
  	});
  	attachQuantityListeners();
}

function attachQuantityListeners() {
  const addButtons = document.querySelectorAll('.btn-add');
  const removeButtons = document.querySelectorAll('.btn-remove');

  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      cartItems[index].quantity++;
      totalItems++;
      updateCartUI();
      updateCartCountDisplay();
    });
  });

  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      	if (cartItems[index].quantity > 1) {
        	cartItems[index].quantity--;
        	totalItems--;
      	} else {
        	totalItems -= cartItems[index].quantity;
        	cartItems.splice(index, 1);
      	}
      updateCartUI();
      updateCartCountDisplay();
    });
  });
}

toCartBtn.addEventListener('click', showCart);

// Початковий виклик updateCartCountDisplay();
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const emptyMessage = document.querySelector('.empty-cart-message');

  	if (cartItemsContainer.children.length > 1) {
    	// Є товари (крім повідомлення)
    	emptyMessage.style.display = 'none';
  	} else {
    	// Немає товарів
    	emptyMessage.style.display = 'block';
  	}
}
