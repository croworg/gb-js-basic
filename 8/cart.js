"use strict";

const itemsInCart = {};
const cartBox = document.querySelector('.cartBox');
// const cartItems = document.querySelector('.cartItems');
const cartCounter = document.querySelector('.cartIconWrap span');
const cartTotalItems = document.querySelector('.cartTotalItems');
const cartTotalValue = document.querySelector('.cartTotalValue');

// Открываем/закрываем корзину по клику
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  cartBox.toggleAttribute('hidden');
});

document.querySelector('.featuredItems')
  .addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
      return;
    }
    cartBox.removeAttribute('hidden');

    const item = event.target.closest('.featuredItem');
    const id = +item.dataset.id;
    const name = item.dataset.name;
    const price = +item.dataset.price;
    addToCart(id, name, price);
  });

/**
 * Добавляет товар в корзину.
 * @param {number} id - id товара.
 * @param {string} name - название товара.
 * @param {number} price - цена товара.
 */
function addToCart(id, name, price) {
  // Проверяем есть ли такой товар в корзине и если нет, то создаем новый объект
  if (!(id in itemsInCart)) {
    itemsInCart[id] = {id: id, name: name, price: price, count: 0,};
  }
  // Увеличиваем количество
  itemsInCart[id].count += 1;
  // Обновляем количество товаров в значке корзины
  cartCounter.textContent = getCartItemsCount().toString();
  // Выводим общую стоимость товаров
  cartTotalValue.textContent = '$' + getCartTotalPrice().toFixed(2);

  renderCart(id);
}

/**
 * Считает и возвращает количество товаров в корзине
 * @return {number} - Количество товаров в корзине
 */
function getCartItemsCount() {
  return Object.values(itemsInCart).reduce((acc, item) => acc + item.count, 0);
}

/**
 * Считаем и возвращаем общую стоимость товаров в корзине
 * @returns {number} - Общая стоимость товаров в корзине
 */
function getCartTotalPrice() {
  return Object
    .values(itemsInCart)
    .reduce((acc, item) => acc + item.count * item.price, 0);
}

/**
 * Отрисовывает в корзину строки с товарами.
 * @param {number} productId - Id товара.
 */
function renderCart(itemId) {
  const cartItemEl = cartBox.querySelector(`.cartRow[data-id="${itemId}"]`);
  console.log(cartItemEl);
  if (!cartItemEl) {
    renderNewCartItem(itemsInCart[itemId]);
    return;
  }
  const cartItem = itemsInCart[itemId];
  cartItemEl.querySelector('span.productQty').textContent = cartItem.count;
  cartItemEl
    .querySelector('span.productTotal')
    .textContent = (cartItem.price * cartItem.count).toFixed(2);
}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} item - Id товара.
 */
function renderNewCartItem(item) {
  const itemRow = `
  <div class="cartRow" data-id="${item.id}">
    <div>${item.name}</div>
    <div><span class="productQty">${item.count}</span> шт.</div>
    <div>$${item.price}</div>
    <div>$<span class="productTotal">${(item.price * item.count).toFixed(2)}</span></div>
  </div>
  `;
  cartBox.firstElementChild.insertAdjacentHTML('afterend', itemRow);
}