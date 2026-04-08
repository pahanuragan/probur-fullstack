const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("probur-users")) || [];

    const foundUser = users.find(
      user => user.email === email && user.password === password
    );

    if (!foundUser) {
      showLoginMessage("Неверный email или пароль", false);
      return;
    }

    localStorage.setItem("probur-current-user", JSON.stringify(foundUser));
    showLoginMessage("Вход выполнен. Переходим в кабинет...", true);

    setTimeout(() => {
      window.location.href = "account.html";
    }, 1200);
  });
}

function showLoginMessage(text, success) {
  loginMessage.textContent = text;
  loginMessage.classList.remove("hidden", "error", "success");
  loginMessage.classList.add(success ? "success" : "error");
}