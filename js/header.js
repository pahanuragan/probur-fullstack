document.addEventListener("DOMContentLoaded", () => {
  const headerActions = document.getElementById("headerActions");
  if (!headerActions) return;

  const currentUser = JSON.parse(localStorage.getItem("probur-current-user"));

  if (currentUser) {
    headerActions.innerHTML = `
      <a href="tel:+79999999999" class="phone">+7 (999) 999-99-99</a>
      <a href="account.html" class="btn btn-outline">Кабинет</a>
      <button id="logoutBtn" class="btn btn-primary">Выйти</button>
    `;

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("probur-current-user");
        window.location.href = "index.html";
      });
    }
  } else {
    headerActions.innerHTML = `
      <a href="tel:+79999999999" class="phone">+7 (999) 999-99-99</a>
      <a href="login.html" class="btn btn-outline">Войти</a>
      <a href="auth.html" class="btn btn-primary">Регистрация</a>
    `;
  }
});