const products = [
  {
    id: 1,
    title: "Перфоратор Bosch GBH 2-26",
    category: "Перфораторы",
    price: 1900,
    image: "images/tools/perforator.jpg"
  },
  {
    id: 2,
    title: "Ударная дрель Makita HP1640",
    category: "Дрели",
    price: 1200,
    image: "images/tools/drill.jpg"
  },
  {
    id: 3,
    title: "Болгарка DeWalt DWE4157",
    category: "Шлифмашины",
    price: 1400,
    image: "images/tools/grinder.jpg"
  },
  {
    id: 4,
    title: "Лобзик Metabo STEB 65",
    category: "Лобзики",
    price: 1100,
    image: "images/tools/jigsaw.jpg"
  },
  {
    id: 5,
    title: "Шлифмашина Bosch GEX 125",
    category: "Шлифмашины",
    price: 1350,
    image: "images/tools/sander.jpg"
  },
  {
    id: 6,
    title: "Строительный миксер ЗУБР МР-1400",
    category: "Миксеры",
    price: 1600,
    image: "images/tools/mixer.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("probur-cart")) || [];

function saveCart() {
  localStorage.setItem("probur-cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function renderProducts(items) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `<div class="empty-state">Ничего не найдено</div>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-card-body">
        <span class="product-category">${product.category}</span>
        <h3>${product.title}</h3>
        <div class="product-bottom">
          <div class="product-price">${product.price} ₽/сутки</div>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
            В корзину
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const product = products.find(item => item.id === id);

      if (product) {
        cart.push(product);
        saveCart();
        updateCartCount();
        button.textContent = "Добавлено";
        setTimeout(() => {
          button.textContent = "В корзину";
        }, 1000);
      }
    });
  });
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");

  if (!filterButtons.length || !searchInput) return;

  let currentFilter = "all";

  function applyFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();

    const filtered = products.filter(product => {
      const matchCategory =
        currentFilter === "all" || product.category === currentFilter;

      const matchSearch =
        product.title.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      return matchCategory && matchSearch;
    });

    renderProducts(filtered);
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);
  renderProducts(products);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-state">Корзина пока пустая</div>`;
    cartTotal.textContent = "0 ₽";
    return;
  }

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <h3>${item.title}</h3>
          <p>${item.category}</p>
        </div>
      </div>
      <div class="cart-item-right">
        <strong>${item.price} ₽</strong>
        <button class="remove-btn" data-index="${index}">Удалить</button>
      </div>
    `;

    cartItems.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `${total} ₽`;

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCart();
    });
  });
}

function setupOrderForm() {
  const form = document.getElementById("orderForm");
  const success = document.getElementById("orderSuccess");

  if (!form || !success) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("probur-current-user"));

    if (!currentUser) {
      alert("Сначала войдите или зарегистрируйтесь.");
      window.location.href = "login.html";
      return;
    }

    if (!cart.length) {
      alert("Добавьте товары в корзину перед оформлением заказа.");
      return;
    }

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const address = document.getElementById("clientAddress").value.trim();
    const rentDate = document.getElementById("rentDate").value;
    const comment = document.getElementById("clientComment").value.trim();

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orders = JSON.parse(localStorage.getItem("probur-orders")) || [];

    const newOrder = {
      id: Date.now(),
      userEmail: currentUser.email,
      userName: currentUser.name,
      phone,
      address,
      rentDate,
      comment,
      total,
      dateCreated: new Date().toLocaleDateString("ru-RU"),
      items: [...cart]
    };

    orders.push(newOrder);
    localStorage.setItem("probur-orders", JSON.stringify(orders));

    cart = [];
    saveCart();
    updateCartCount();
    renderCart();

    form.reset();
    success.classList.remove("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupFilters();
  renderCart();
  setupOrderForm();
});