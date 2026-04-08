import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import './App.css'

const routes = {
  home: '/',
  catalog: '/catalog',
  delivery: '/delivery',
  about: '/about',
  contacts: '/contacts',
  order: '/order',
  login: '/login',
  register: '/register',
  account: '/account',
}

const products = [
  {
    id: 1,
    title: 'Перфоратор Bosch GBH 2-26',
    category: 'Перфораторы',
    price: 1900,
    image: '/images/tools/perforator.jpg',
  },
  {
    id: 2,
    title: 'Ударная дрель Makita HP1640',
    category: 'Дрели',
    price: 1200,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 3,
    title: 'Болгарка DeWalt DWE4157',
    category: 'Шлифмашины',
    price: 1400,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 4,
    title: 'Лобзик Metabo STEB 65',
    category: 'Лобзики',
    price: 1100,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 5,
    title: 'Шлифмашина Bosch GEX 125',
    category: 'Шлифмашины',
    price: 1350,
    image: '/images/tools/sander.jpg',
  },
  {
    id: 6,
    title: 'Строительный миксер ЗУБР МР-1400',
    category: 'Миксеры',
    price: 1600,
    image: '/images/tools/mixer.jpg',
  },
  {
    id: 7,
    title: 'Перфоратор Makita HR2470',
    category: 'Перфораторы',
    price: 2100,
    image: '/images/tools/perforator.jpg',
  },
  {
    id: 8,
    title: 'Перфоратор DeWalt D25133K',
    category: 'Перфораторы',
    price: 2300,
    image: '/images/tools/perforator.jpg',
  },
  {
    id: 9,
    title: 'Безударная дрель Bosch GBM 10 RE',
    category: 'Дрели',
    price: 1100,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 10,
    title: 'Ударная дрель Интерскол ДУ-13/780ЭР',
    category: 'Дрели',
    price: 1050,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 11,
    title: 'УШМ Makita GA5030',
    category: 'Шлифмашины',
    price: 1300,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 12,
    title: 'УШМ Bosch GWS 9-125',
    category: 'Шлифмашины',
    price: 1450,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 13,
    title: 'Ленточная шлифмашина Makita 9910',
    category: 'Шлифмашины',
    price: 1700,
    image: '/images/tools/sander.jpg',
  },
  {
    id: 14,
    title: 'Эксцентриковая шлифмашина DeWalt DWE6423',
    category: 'Шлифмашины',
    price: 1550,
    image: '/images/tools/sander.jpg',
  },
  {
    id: 15,
    title: 'Лобзик Bosch GST 8000 E',
    category: 'Лобзики',
    price: 1250,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 16,
    title: 'Лобзик Makita 4329',
    category: 'Лобзики',
    price: 1200,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 17,
    title: 'Миксер Elitech МС 1600/2ЭД',
    category: 'Миксеры',
    price: 1750,
    image: '/images/tools/mixer.jpg',
  },
  {
    id: 18,
    title: 'Миксер Patriot DM 150',
    category: 'Миксеры',
    price: 1500,
    image: '/images/tools/mixer.jpg',
  },
  {
    id: 19,
    title: 'Шуруповерт Makita DDF453',
    category: 'Шуруповерты',
    price: 1400,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 20,
    title: 'Шуруповерт Bosch GSR 120-LI',
    category: 'Шуруповерты',
    price: 1450,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 21,
    title: 'Шуруповерт DeWalt DCD771C2',
    category: 'Шуруповерты',
    price: 1650,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 22,
    title: 'Пылесос строительный Karcher WD 3',
    category: 'Пылесосы',
    price: 1900,
    image: '/images/tools/sander.jpg',
  },
  {
    id: 23,
    title: 'Пылесос строительный Bosch GAS 12-25',
    category: 'Пылесосы',
    price: 2400,
    image: '/images/tools/sander.jpg',
  },
  {
    id: 24,
    title: 'Пылесос строительный Metabo AS 20 L',
    category: 'Пылесосы',
    price: 2200,
    image: '/images/tools/sander.jpg',
  },
  {
    id: 25,
    title: 'Лазерный уровень Bosch GLL 2-10',
    category: 'Лазерные уровни',
    price: 1300,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 26,
    title: 'Лазерный уровень ADA Cube Mini',
    category: 'Лазерные уровни',
    price: 1100,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 27,
    title: 'Лазерный уровень Condtrol XLiner',
    category: 'Лазерные уровни',
    price: 1800,
    image: '/images/tools/drill.jpg',
  },
  {
    id: 28,
    title: 'Краскопульт Wagner W 100',
    category: 'Краскопульты',
    price: 1500,
    image: '/images/tools/mixer.jpg',
  },
  {
    id: 29,
    title: 'Краскопульт Bosch PFS 3000-2',
    category: 'Краскопульты',
    price: 1750,
    image: '/images/tools/mixer.jpg',
  },
  {
    id: 30,
    title: 'Краскопульт Elitech КЭ 110С',
    category: 'Краскопульты',
    price: 1350,
    image: '/images/tools/mixer.jpg',
  },
  {
    id: 31,
    title: 'Плиткорез электрический Hammer PLC 800',
    category: 'Плиткорезы',
    price: 2400,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 32,
    title: 'Плиткорез DIAM ML-720',
    category: 'Плиткорезы',
    price: 2100,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 33,
    title: 'Реноватор Bosch PMF 220 CE',
    category: 'Реноваторы',
    price: 1550,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 34,
    title: 'Реноватор DeWalt DWE315',
    category: 'Реноваторы',
    price: 1800,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 35,
    title: 'Штроборез Фиолент Б1-30',
    category: 'Штроборезы',
    price: 2600,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 36,
    title: 'Штроборез Bosch GNF 35 CA',
    category: 'Штроборезы',
    price: 3200,
    image: '/images/tools/grinder.jpg',
  },
  {
    id: 37,
    title: 'Торцовочная пила Makita LS1040',
    category: 'Пилы',
    price: 2600,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 38,
    title: 'Циркулярная пила Bosch GKS 190',
    category: 'Пилы',
    price: 1900,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 39,
    title: 'Сабельная пила DeWalt DWE305PK',
    category: 'Пилы',
    price: 2100,
    image: '/images/tools/jigsaw.jpg',
  },
  {
    id: 40,
    title: 'Отбойный молоток Makita HM0870C',
    category: 'Перфораторы',
    price: 3400,
    image: '/images/tools/perforator.jpg',
  },
]

const categories = [
  'Все',
  'Перфораторы',
  'Дрели',
  'Шлифмашины',
  'Лобзики',
  'Миксеры',
  'Шуруповерты',
  'Пылесосы',
  'Лазерные уровни',
  'Краскопульты',
  'Плиткорезы',
  'Реноваторы',
  'Штроборезы',
  'Пилы',
]

const pageMeta = {
  [routes.home]: { title: 'ProBur - аренда электроинструмента' },
  [routes.catalog]: { title: 'Каталог - ProBur' },
  [routes.delivery]: { title: 'Доставка - ProBur' },
  [routes.about]: { title: 'О сервисе - ProBur' },
  [routes.contacts]: { title: 'Контакты - ProBur' },
  [routes.order]: { title: 'Оформление заказа - ProBur' },
  [routes.login]: { title: 'Вход - ProBur' },
  [routes.register]: { title: 'Регистрация - ProBur' },
  [routes.account]: { title: 'Личный кабинет - ProBur' },
}

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  'https://probur-api.onrender.com'

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function formatPrice(value) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function getAuthToken() {
  return window.localStorage.getItem('probur-auth-token')
}

async function apiRequest(path, options = {}) {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function useRoute() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return path
}

function App() {
  const path = useRoute()
  const [cart, setCart] = useState(() => readStorage('probur-cart', []))
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage('probur-current-user', null),
  )
  const [orders, setOrders] = useState([])
  const [authChecked, setAuthChecked] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    document.title = pageMeta[path]?.title ?? 'ProBur'
  }, [path])

  useEffect(() => {
    if (!currentUser) {
      writeStorage('probur-cart', cart)
      return
    }

    window.localStorage.removeItem('probur-cart')
  }, [cart, currentUser])

  useEffect(() => {
    async function restoreSession() {
      const token = getAuthToken()

      if (!token) {
        setCurrentUser(null)
        setAuthChecked(true)
        return
      }

      try {
        const data = await apiRequest('/api/auth/me')
        setCurrentUser(data.user)
        setProfile(data.user)
      } catch {
        window.localStorage.removeItem('probur-current-user')
        window.localStorage.removeItem('probur-auth-token')
        setCurrentUser(null)
        setProfile(null)
      } finally {
        setAuthChecked(true)
      }
    }

    restoreSession()
  }, [])

  const loadCart = useEffectEvent(async () => {
    if (!currentUser || !getAuthToken()) {
      return
    }

    try {
      const data = await apiRequest('/api/cart')
      setCart(data.cart)
    } catch {
      setCart([])
    }
  })

  useEffect(() => {
    if (currentUser) {
      writeStorage('probur-current-user', currentUser)
      return
    }

    window.localStorage.removeItem('probur-current-user')
    window.localStorage.removeItem('probur-auth-token')
  }, [currentUser])

  const loadOrders = useEffectEvent(async () => {
    if (!currentUser || !getAuthToken()) {
      setOrders([])
      return
    }

    try {
      const data = await apiRequest('/api/orders/me')
      setOrders(data.orders)
    } catch {
      setOrders([])
    }
  })

  useEffect(() => {
    loadOrders()
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      loadCart()
    }
  }, [currentUser, path])

  useEffect(() => {
    if (!currentUser) {
      return
    }

    const handleFocus = () => {
      loadCart()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadCart()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [currentUser, loadCart])

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart],
  )

  const actions = {
    addToCart(product) {
      if (!currentUser) {
        setCart((prev) => [...prev, product])
        return
      }

      apiRequest('/api/cart/items', {
        method: 'POST',
        body: JSON.stringify({
          title: product.title,
          category: product.category,
          price: product.price,
          image: product.image,
        }),
      })
        .then((data) => setCart(data.cart))
        .catch(() => {})
    },
    removeFromCart(item, index) {
      if (!currentUser) {
        setCart((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
        return
      }

      apiRequest(`/api/cart/items/${item.id}`, {
        method: 'DELETE',
      })
        .then((data) => setCart(data.cart))
        .catch(() => {})
    },
    async register(payload) {
      try {
        const data = await apiRequest('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: payload.name.trim(),
            email: payload.email.trim().toLowerCase(),
            phone: payload.phone.trim(),
            password: payload.password,
          }),
        })

        window.localStorage.setItem('probur-auth-token', data.token)
        setCurrentUser(data.user)
        setProfile(data.user)
        setCart([])
        navigate(routes.account)
        return { ok: true }
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },
    async login(payload) {
      try {
        const data = await apiRequest('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email.trim().toLowerCase(),
            password: payload.password,
          }),
        })

        window.localStorage.setItem('probur-auth-token', data.token)
        setCurrentUser(data.user)
        setProfile(data.user)
        setCart([])
        navigate(routes.account)
        return { ok: true }
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },
    logout() {
      setCurrentUser(null)
      setProfile(null)
      setCart([])
      navigate(routes.home)
    },
    async updateProfile(payload) {
      try {
        const data = await apiRequest('/api/profile', {
          method: 'PATCH',
          body: JSON.stringify({
            name: payload.name.trim(),
            phone: payload.phone.trim(),
          }),
        })

        setProfile(data.profile)
        setCurrentUser((prev) =>
          prev
            ? {
                ...prev,
                name: data.profile.name,
                phone: data.profile.phone,
              }
            : prev,
        )

        return { ok: true, profile: data.profile }
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },
    async submitOrder(payload) {
      if (!currentUser) {
        navigate(routes.login)
        return { ok: false, message: 'Сначала войдите в аккаунт.' }
      }

      if (!cart.length) {
        return { ok: false, message: 'Добавьте товары в корзину перед оформлением.' }
      }

      try {
        const data = await apiRequest('/api/orders', {
          method: 'POST',
          body: JSON.stringify({
            phone: payload.phone.trim(),
            address: payload.address.trim(),
            rentDate: payload.rentDate,
            comment: payload.comment.trim(),
            items: cart,
          }),
        })

        setOrders((prev) => [data.order, ...prev])
        setCart([])
        navigate(routes.account)
        return { ok: true }
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },
  }

  const loadProfile = useEffectEvent(async () => {
    if (!currentUser || !getAuthToken()) {
      setProfile(null)
      return
    }

    try {
      const data = await apiRequest('/api/profile')
      setProfile(data.profile)
    } catch {
      setProfile(null)
    }
  })

  const pageProps = {
    currentUser,
    profile,
    cart,
    cartTotal,
    orders,
    actions,
    loadOrders,
    loadProfile,
    authChecked,
  }

  return (
    <div className="app-shell">
      {path !== routes.login && path !== routes.register ? (
        <Header currentUser={currentUser} cartCount={cart.length} onLogout={actions.logout} />
      ) : null}
      <main>
        <Page path={path} {...pageProps} />
      </main>
    </div>
  )
}

function Header({ currentUser, cartCount, onLogout }) {
  const navItems = [
    { path: routes.catalog, label: 'Каталог' },
    { path: routes.delivery, label: 'Доставка' },
    { path: routes.about, label: 'О сервисе' },
    { path: routes.contacts, label: 'Контакты' },
  ]

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="logo" type="button" onClick={() => navigate(routes.home)}>
          <img src="/icons/logo-probur.svg" alt="ProBur" />
        </button>
        <nav className="nav">
          {navItems.map((item) => (
            <button key={item.path} type="button" className="nav-link" onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <a href="tel:+79999999999" className="phone">
            +7 (999) 999-99-99
          </a>
          <button type="button" className="btn btn-outline cart-link" onClick={() => navigate(routes.order)}>
            Корзина ({cartCount})
          </button>
          {currentUser ? (
            <>
              <button type="button" className="btn btn-outline" onClick={() => navigate(routes.account)}>
                Кабинет
              </button>
              <button type="button" className="btn btn-primary" onClick={onLogout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-outline" onClick={() => navigate(routes.login)}>
                Войти
              </button>
              <button type="button" className="btn btn-primary" onClick={() => navigate(routes.register)}>
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function Page(props) {
  switch (props.path) {
    case routes.catalog:
      return <CatalogPage {...props} />
    case routes.delivery:
      return <InfoPage variant="delivery" />
    case routes.about:
      return <InfoPage variant="about" />
    case routes.contacts:
      return <InfoPage variant="contacts" />
    case routes.order:
      return <OrderPage {...props} />
    case routes.login:
      return <LoginPage {...props} />
    case routes.register:
      return <RegisterPage {...props} />
    case routes.account:
      return <AccountPage {...props} />
    default:
      return <HomePage />
  }
}

function HomePage() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">Аренда электроинструмента</div>
          <h1>Мощный инструмент без переплаты</h1>
          <p>
            Перфораторы, дрели, шлифмашины и другой инструмент в аренду на день,
            выходные или долгий срок.
          </p>
          <div className="hero-buttons">
            <button type="button" className="btn btn-primary" onClick={() => navigate(routes.catalog)}>
              Перейти в каталог
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate(routes.delivery)}>
              Условия доставки
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CatalogPage({ actions }) {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [search, setSearch] = useState('')
  const [feedbackId, setFeedbackId] = useState(null)

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchCategory =
        activeCategory === 'Все' || product.category === activeCategory
      const matchSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)

      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  return (
    <section className="page bg-catalog">
      <div className="page-overlay">
        <div className="container">
          <div className="page-head">
            <h1>Каталог инструментов</h1>
            <p>Выберите инструмент для ремонта квартиры и добавьте в корзину.</p>
          </div>

          <div className="catalog-panel">
            <div className="catalog-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-btn${activeCategory === category ? ' active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="catalog-search">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Поиск инструмента..."
              />
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-card-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-card-body">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.title}</h3>
                    <div className="product-bottom">
                      <div className="product-price">{formatPrice(product.price)}/сутки</div>
                      <button
                        type="button"
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => {
                          actions.addToCart(product)
                          setFeedbackId(product.id)
                          window.setTimeout(() => setFeedbackId(null), 1000)
                        }}
                      >
                        {feedbackId === product.id ? 'Добавлено' : 'В корзину'}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">Ничего не найдено.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoPage({ variant }) {
  const content = {
    delivery: {
      className: 'bg-delivery',
      title: 'Доставка',
      body: (
        <>
          <p>Привезем инструмент в день заказа по вашему адресу.</p>
          <div className="info-grid">
            <div className="info-card">
              <h2>По Москве в день заказа</h2>
              <p>Доставляем с 9:00 до 21:00, подтверждаем интервал заранее.</p>
            </div>
            <div className="info-card">
              <h2>Самовывоз</h2>
              <p>Можно забрать инструмент самостоятельно после подтверждения заявки.</p>
            </div>
          </div>
        </>
      ),
    },
    about: {
      className: 'bg-about',
      title: 'О сервисе',
      body: (
        <div className="info-card wide">
          <p>
            Мы предоставляем профессиональный инструмент в аренду для ремонта
            квартир, домов и коммерческих помещений. Проверяем технику перед
            каждой выдачей, помогаем подобрать комплект и остаемся на связи на
            всем сроке аренды.
          </p>
        </div>
      ),
    },
    contacts: {
      className: 'bg-contacts',
      title: 'Контакты',
      body: (
        <div className="info-grid">
          <div className="info-card">
            <h2>Телефон</h2>
            <p>+7 (999) 999-99-99</p>
          </div>
          <div className="info-card">
            <h2>Email</h2>
            <p>info@probur.ru</p>
          </div>
          <div className="info-card wide">
            <h2>Адрес</h2>
            <p>Москва, ул. Примерная, 10</p>
          </div>
        </div>
      ),
    },
  }[variant]

  return (
    <section className={`page ${content.className}`}>
      <div className="page-overlay">
        <div className="container">
          <div className="page-head">
            <h1>{content.title}</h1>
          </div>
          {content.body}
        </div>
      </div>
    </section>
  )
}

function OrderPage({ cart, cartTotal, currentUser, actions }) {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: currentUser?.name ?? '',
    phone: currentUser?.phone ?? '',
    address: '',
    rentDate: '',
    comment: '',
  })

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: currentUser?.name ?? '',
      phone: currentUser?.phone ?? '',
    }))
  }, [currentUser])

  return (
    <section className="page bg-about">
      <div className="page-overlay">
        <div className="container">
          <h1>Оформление заказа</h1>
          <p className="order-subtitle">Проверьте выбранные товары и оставьте контакты.</p>

          <div className="order-layout">
            <div className="order-cart-box info-card">
              <h2>Ваш заказ</h2>
              <div className="cart-items">
                {cart.length ? (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="cart-item">
                      <div className="cart-item-info">
                        <img src={item.image} alt={item.title} />
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.category}</p>
                        </div>
                      </div>
                      <div className="cart-item-right">
                        <strong>{formatPrice(item.price)}</strong>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => actions.removeFromCart(item, index)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">Корзина пока пустая.</div>
                )}
              </div>
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Итого за сутки:</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
              </div>
            </div>

            <div className="order-form-box info-card">
              <h2>Контактные данные</h2>
              <form
                className="order-form"
                onSubmit={async (event) => {
                  event.preventDefault()
                  setMessage('')
                  setIsSubmitting(true)
                  const result = await actions.submitOrder(form)
                  setIsSubmitting(false)
                  setSuccess(result.ok)
                  setMessage(
                    result.ok
                      ? 'Спасибо! Ваш заказ принят. Мы свяжемся с вами в ближайшее время.'
                      : result.message,
                  )
                  if (result.ok) {
                    setForm((prev) => ({
                      ...prev,
                      address: '',
                      rentDate: '',
                      comment: '',
                    }))
                  }
                }}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Ваше имя"
                  required
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder="Телефон"
                  required
                />
                <input
                  type="text"
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  placeholder="Адрес доставки"
                  required
                />
                <input
                  type="date"
                  value={form.rentDate}
                  onChange={(event) => setForm({ ...form, rentDate: event.target.value })}
                  required
                />
                <textarea
                  rows="5"
                  value={form.comment}
                  onChange={(event) => setForm({ ...form, comment: event.target.value })}
                  placeholder="Комментарий к заказу"
                />
                <button type="submit" className="btn btn-primary order-submit-btn">
                  {isSubmitting ? 'Отправляем заказ...' : 'Подтвердить заказ'}
                </button>
              </form>
              {message ? (
                <div className={`auth-message ${success ? 'success' : 'error'}`}>{message}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LoginPage({ actions }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <AuthLayout
      title="Вход"
      subtitle="Войдите в аккаунт, чтобы оформить заказ."
      footerText="Нет аккаунта?"
      footerAction="Зарегистрироваться"
      onFooterClick={() => navigate(routes.register)}
    >
      <form
        className="auth-form"
        onSubmit={async (event) => {
          event.preventDefault()
          setMessage('')
          setIsSubmitting(true)
          const result = await actions.login(form)
          setIsSubmitting(false)
          if (!result.ok) {
            setMessage(result.message)
          }
        }}
      >
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Пароль"
          required
        />
        <button type="submit" className="btn btn-primary auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Входим...' : 'Войти'}
        </button>
      </form>
      {message ? <div className="auth-message error">{message}</div> : null}
    </AuthLayout>
  )
}

function RegisterPage({ actions }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Создайте аккаунт для аренды инструмента."
      footerText="Уже есть аккаунт?"
      footerAction="Войти"
      onFooterClick={() => navigate(routes.login)}
    >
      <form
        className="auth-form"
        onSubmit={async (event) => {
          event.preventDefault()
          setMessage('')

          if (form.password !== form.confirmPassword) {
            setMessage('Пароли не совпадают.')
            return
          }

          setIsSubmitting(true)
          const result = await actions.register(form)
          setIsSubmitting(false)
          if (!result.ok) {
            setMessage(result.message)
          }
        }}
      >
        <input
          type="text"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          placeholder="Имя"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          placeholder="Телефон"
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Пароль"
          required
        />
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
          placeholder="Повторите пароль"
          required
        />
        <button type="submit" className="btn btn-primary auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Создаем аккаунт...' : 'Зарегистрироваться'}
        </button>
      </form>
      {message ? <div className="auth-message error">{message}</div> : null}
    </AuthLayout>
  )
}

function AuthLayout({ title, subtitle, footerText, footerAction, onFooterClick, children }) {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <button className="auth-logo" type="button" onClick={() => navigate(routes.home)}>
          <img src="/icons/logo-probur.svg" alt="ProBur" />
        </button>
        <h1>{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
        <p className="auth-footer">
          {footerText}{' '}
          <button type="button" className="text-link" onClick={onFooterClick}>
            {footerAction}
          </button>
        </p>
      </div>
    </section>
  )
}

function AccountPage({ currentUser, profile, orders, loadOrders, loadProfile, authChecked, actions }) {
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' })
  const [profileMessage, setProfileMessage] = useState('')
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const profileData = profile || currentUser

  useEffect(() => {
    if (authChecked && !currentUser) {
      navigate(routes.login)
    }
  }, [authChecked, currentUser])

  useEffect(() => {
    if (currentUser) {
      loadOrders()
      loadProfile()
    }
  }, [currentUser, loadOrders, loadProfile])

  useEffect(() => {
    if (!profileData) {
      return
    }

    setProfileForm({
      name: profileData.name || '',
      phone: profileData.phone || '',
    })
  }, [profileData?.id])

  if (!authChecked || !currentUser) {
    return null
  }

  const userOrders = orders

  return (
    <section className="page bg-about">
      <div className="page-overlay">
        <div className="container">
          <h1>Личный кабинет</h1>
          <p className="order-subtitle">Ваш профиль и история заказов.</p>
          <div className="account-layout">
            <div className="account-box info-card">
              <h2>Профиль</h2>
              <div className="account-info">
                <div className="account-row">
                  <span>Имя:</span>
                  <strong>{profileData.name}</strong>
                </div>
                <div className="account-row">
                  <span>Email:</span>
                  <strong>{profileData.email}</strong>
                </div>
                <div className="account-row">
                  <span>Телефон:</span>
                  <strong>{profileData.phone || 'Не указан'}</strong>
                </div>
              </div>
              <form
                className="profile-form"
                onSubmit={async (event) => {
                  event.preventDefault()
                  setProfileMessage('')
                  setIsSavingProfile(true)
                  const result = await actions.updateProfile(profileForm)
                  setIsSavingProfile(false)
                  setProfileSuccess(result.ok)
                  setProfileMessage(
                    result.ok ? 'Профиль обновлен.' : result.message,
                  )
                  if (result.ok && result.profile) {
                    setProfileForm({
                      name: result.profile.name || '',
                      phone: result.profile.phone || '',
                    })
                  }
                }}
              >
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(event) =>
                    setProfileForm({ ...profileForm, name: event.target.value })
                  }
                  placeholder="Имя"
                  required
                />
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(event) =>
                    setProfileForm({ ...profileForm, phone: event.target.value })
                  }
                  placeholder="Телефон"
                />
                <button type="submit" className="btn btn-primary" disabled={isSavingProfile}>
                  {isSavingProfile ? 'Сохраняем...' : 'Сохранить профиль'}
                </button>
              </form>
              {profileMessage ? (
                <div className={`auth-message ${profileSuccess ? 'success' : 'error'}`}>
                  {profileMessage}
                </div>
              ) : null}
            </div>

            <div className="account-box info-card">
              <h2>Мои заказы</h2>
              <div className="orders-list">
                {userOrders.length ? (
                  userOrders.map((order) => (
                    <div key={order.id} className="order-history-card">
                      <div className="order-history-top">
                        <strong>Заказ №{order.id}</strong>
                        <span>{order.dateCreated}</span>
                      </div>
                      <div className="order-history-body">
                        <p><strong>Дата аренды:</strong> {order.rentDate}</p>
                        <p><strong>Адрес:</strong> {order.address}</p>
                        <p><strong>Телефон:</strong> {order.phone}</p>
                        <p><strong>Комментарий:</strong> {order.comment || '—'}</p>
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={`${order.id}-${item.id}-${index}`}>
                              {item.title} - {formatPrice(item.price)}/сутки
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="order-history-total">
                        Итого: <strong>{formatPrice(order.total)}</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">У вас пока нет заказов.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
