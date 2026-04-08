const currentUser = JSON.parse(localStorage.getItem("probur-current-user"));
const accountInfo = document.getElementById("accountInfo");
const ordersList = document.getElementById("ordersList");
const logoutBtn = document.getElementById("logoutBtn");

if (!currentUser) {
  window.location.href = "login.html";
}

if (accountInfo && currentUser) {
  accountInfo.innerHTML = `
    <div class="account-row"><span>Имя:</span><strong>${currentUser.name}</strong></div>
    <div class="account-row"><span>Email:</span><strong>${currentUser.email}</strong></div>
    <div class="account-row"><span>Телефон:</span><strong>${currentUser.phone}</strong></div>
  `;
}

if (ordersList && currentUser) {
  const allOrders = JSON.parse(localStorage.getItem("probur-orders")) || [];
  const userOrders = allOrders.filter(order => order.userEmail === currentUser.email);

  if (!userOrders.length) {
    ordersList.innerHTML = `<div class="empty-state">У вас пока нет заказов</div>`;
  } else {
    ordersList.innerHTML = "";

    userOrders.reverse().forEach(order => {
      const card = document.createElement("div");
      card.className = "order-history-card";

      const productsHtml = order.items.map(item => `
        <li>${item.title} — ${item.price} ₽/сутки</li>
      `).join("");

      card.innerHTML = `
        <div class="order-history-top">
          <strong>Заказ №${order.id}</strong>
          <span>${order.dateCreated}</span>
        </div>

        <div class="order-history-body">
          <p><strong>Дата аренды:</strong> ${order.rentDate}</p>
          <p><strong>Адрес:</strong> ${order.address}</p>
          <p><strong>Телефон:</strong> ${order.phone}</p>
          <p><strong>Комментарий:</strong> ${order.comment || "—"}</p>
          <ul>${productsHtml}</ul>
        </div>

        <div class="order-history-total">
          Итого: <strong>${order.total} ₽</strong>
        </div>
      `;

      ordersList.appendChild(card);
    });
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("probur-current-user");
    window.location.href = "index.html";
  });
}