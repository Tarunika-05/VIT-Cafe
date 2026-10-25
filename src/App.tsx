import { useState, useMemo, createContext, useContext } from "react"

// ─── Asset paths ──────────────────────────────────────────────────────────────
const P = "/assets"
const imgTabIcon = `${P}/0bd2f.svg`
const imgTabIcon1 = `${P}/173bb.svg`
const imgTabIcon2 = `${P}/1afe6.svg`
const imgBag = `${P}/39381.svg`
const imgSearchIcon = `${P}/0cf44.svg`
const imgClock = `${P}/405d8.svg`
const imgChecked = `${P}/1b20a.svg`
// Cart screen assets
const imgInfo = `${P}/f78e0.svg`
const imgTag = `${P}/51288.svg`
// Pickup screen assets
const imgLocIcon = `${P}/7785e.svg`
const imgChevronDown = `${P}/19596.svg`
const imgPickupClock = `${P}/f50a1.svg`
// Order Confirmation assets
const imgConfirmCheck = `${P}/934da.svg`
const imgPickupTimeIcon = `${P}/f1c08.svg`
const imgPickupLocIcon = `${P}/94991.svg`
const imgQrCode = `${P}/5addd.svg`

// Food images
const img72f32 = `${P}/72f32.png`
const imgD215c = `${P}/d215c.png`
const img84894 = `${P}/84894.png`
const imgBb4ff = `${P}/bb4ff.png`
const img82c43 = `${P}/82c43.png`
const img7c82a = `${P}/7c82a.png`
const imgfb476 = `${P}/fb476.png`
const imgab123 = `${P}/ab123.png`
const imgcde45 = `${P}/cde45.png`
// Order History assets
const imgDividerLine = `${P}/083b3.svg`
// Favorites assets
const imgFavButterChicken = `${P}/8af9e.png`
const imgFavMasalaDosa = `${P}/fccbc.png`
const imgFavCholeBhature = `${P}/7642b.png`
const imgFavNIThali = `${P}/28c30.png`
const imgFavBiryani = `${P}/81a09.png`
const imgFavChai = `${P}/a7545.png`
// Track Order assets
const imgTrackCheck = `${P}/ab182.svg`
const imgTrackPulse = `${P}/fe0c7.svg`
const imgMapPin = `${P}/12950.svg`
const imgTrackQr = `${P}/92692.svg`

// ─── Data types ───────────────────────────────────────────────────────────────
type Extra = { id: string label: string price: number }
type Size = { label: string delta: number }

type MenuItem = {
  id: number
  name: string
  description: string
  longDescription: string
  price: number
  time: string
  image: string
  detailImage: string
  category: string
  sizes: Size[]
  extras: Extra[]
}

type CartItem = {
  item: MenuItem
  qty: number
  size: string
  extras: string[]
  unitPrice: number
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const SIZES_DEFAULT: Size[] = [
  { label: "Small", delta: -20 },
  { label: "Regular", delta: 0 },
  { label: "Large", delta: 30 },
]

const EXTRAS_BIRYANI: Extra[] = [
  { id: "extra-chicken", label: "Extra Chicken", price: 50 },
  { id: "raita", label: "Raita", price: 30 },
  { id: "green-chutney", label: "Green Chutney", price: 0 },
  { id: "extra-naan", label: "Extra Naan", price: 20 },
]

const EXTRAS_GENERIC: Extra[] = [
  { id: "extra-sauce", label: "Extra Sauce", price: 20 },
  { id: "extra-papad", label: "Papad", price: 10 },
  { id: "raita", label: "Raita", price: 30 },
  { id: "pickle", label: "Mixed Pickle", price: 0 },
]

const EXTRAS_DRINKS: Extra[] = [
  { id: "extra-sugar", label: "Extra Sugar", price: 0 },
  { id: "ginger", label: "Extra Ginger", price: 0 },
]

const ALL_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Butter Chicken Bowl",
    category: "Popular",
    description:
      "Basmati rice, tender butter chicken, creamy tomato makhani, fresh coriander",
    longDescription:
      "Slow-cooked tender chicken in a velvety tomato-butter sauce, served over fragrant basmati rice and garnished with fresh coriander and a drizzle of cream.",
    price: 250,
    time: "8 min",
    image: img72f32,
    detailImage: img72f32,
    sizes: SIZES_DEFAULT,
    extras: EXTRAS_GENERIC,
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "Popular",
    description:
      "Crispy rice crepe, spiced potato filling, coconut chutney, sambar",
    longDescription:
      "A golden-crisp rice and lentil crepe stuffed with a fragrant spiced potato masala, served alongside fresh coconut chutney and a steaming bowl of sambar.",
    price: 180,
    time: "5 min",
    image: imgD215c,
    detailImage: imgD215c,
    sizes: [
      { label: "Regular", delta: 0 },
      { label: "Large", delta: 30 },
    ],
    extras: EXTRAS_GENERIC,
  },
  {
    id: 3,
    name: "Chole Bhature",
    category: "Popular",
    description:
      "Spiced chickpea curry, fluffy fried bread, pickled onions, green chutney",
    longDescription:
      "Hearty spiced chickpeas slow-cooked with aromatic spices, paired with pillowy deep-fried bhature, pickled onions, and green chutney.",
    price: 200,
    time: "6 min",
    image: img84894,
    detailImage: img84894,
    sizes: SIZES_DEFAULT,
    extras: EXTRAS_GENERIC,
  },
  {
    id: 4,
    name: "North Indian Thali",
    category: "Popular",
    description: "Tandoori paneer, jeera rice, dal makhani, naan, raita",
    longDescription:
      "A complete North Indian feast: smoky tandoori paneer, buttery dal makhani, jeera-scented rice, freshly baked naan, and cooling raita.",
    price: 220,
    time: "7 min",
    image: imgBb4ff,
    detailImage: imgBb4ff,
    sizes: SIZES_DEFAULT,
    extras: EXTRAS_GENERIC,
  },
  {
    id: 5,
    name: "Chicken Biriyani",
    category: "Biriyani",
    description:
      "Aromatic dum biryani, raita, mirchi salan, boiled egg, fresh mint chutney",
    longDescription:
      "Slow-cooked aromatic dum biryani with tender chicken, layered with fragrant basmati rice, saffron, caramelised onions, fresh mint, and served with cooling raita and mirchi salan.",
    price: 280,
    time: "12 min",
    image: img82c43,
    detailImage: img7c82a,
    sizes: SIZES_DEFAULT,
    extras: EXTRAS_BIRYANI,
  },
  {
    id: 6,
    name: "Veg Fried Rice",
    category: "Fried Rice",
    description: "Wok tossed basmati, seasonal vegetables, soy-garlic sauce",
    longDescription:
      "Wok-tossed basmati rice with crunchy seasonal vegetables, aromatic garlic, and a savory soy-ginger sauce — fast, light, and satisfying.",
    price: 150,
    time: "10 min",
    image: img72f32,
    detailImage: img72f32,
    sizes: SIZES_DEFAULT,
    extras: EXTRAS_GENERIC,
  },
  {
    id: 7,
    name: "Pani Puri",
    category: "Chaats",
    description:
      "Crispy hollow puris, tangy tamarind water, spiced potato filling",
    longDescription:
      "Six crispy hollow puris filled with spiced mashed potato and chickpeas, served with tangy jaljeera pani and sweet tamarind chutney.",
    price: 80,
    time: "3 min",
    image: imgcde45,
    detailImage: imgcde45,
    sizes: [
      { label: "Regular", delta: 0 },
      { label: "Large", delta: 20 },
    ],
    extras: EXTRAS_GENERIC,
  },
  {
    id: 8,
    name: "Masala Chai",
    category: "Drinks",
    description: "Aromatic spiced tea with ginger, cardamom and milk",
    longDescription:
      "A warming blend of Assam tea, fresh ginger, cardamom, cinnamon, and full-fat milk — brewed to perfection and sweetened to taste.",
    price: 50,
    time: "5 min",
    image: imgfb476,
    detailImage: imgfb476,
    sizes: [
      { label: "Small", delta: -10 },
      { label: "Regular", delta: 0 },
      { label: "Large", delta: 20 },
    ],
    extras: EXTRAS_DRINKS,
  },
  {
    id: 9,
    name: "Pasta Arrabiata",
    category: "Pasta",
    description: "Penne in spicy tomato sauce with garlic and fresh basil",
    longDescription:
      "Al-dente penne tossed in a fiery San Marzano tomato and garlic arrabiata, finished with fresh basil and a drizzle of olive oil.",
    price: 170,
    time: "15 min",
    image: imgab123,
    detailImage: imgab123,
    sizes: SIZES_DEFAULT,
    extras: EXTRAS_GENERIC,
  },
]

const DAILY_SPECIAL = ALL_ITEMS.find((i) => i.id === 5)!
const INITIAL_FAVORITE_IDS = new Set([1, 2, 3, 4, 5, 8])
const CATEGORIES = [
  "Popular",
  "Biriyani",
  "Fried Rice",
  "Chaats",
  "Drinks",
  "Pasta",
]
type ActiveTab = "Menu Browse" | "Orders" | "Favorites"
type Screen = "menu" | "detail" | "cart" | "pickup" | "confirmed" | "orders" | "favorites" | "tracking" | "profile"

// ─── Shared Sidebar ───────────────────────────────────────────────────────────
type User = { name: string email: string phone: string hostel: string }
const UserContext = createContext<User | null>(null)

function FirstName() {
  return <>{useContext(UserContext)?.name.split(" ")[0] ?? "there"}</>
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "?"

function Sidebar({
  activeTab,
  onTabChange,
  onOpenProfile,
  profileActive,
}: {
  activeTab: ActiveTab
  onTabChange: (t: ActiveTab) => void
  onOpenProfile: () => void
  profileActive: boolean
}) {
  const user = useContext(UserContext)!
  const tabs: { label: ActiveTab icon: string }[] = [
    { label: "Menu Browse", icon: imgTabIcon },
    { label: "Orders", icon: imgTabIcon1 },
    { label: "Favorites", icon: imgTabIcon2 },
  ]
  return (
    <aside className="bg-white border-r border-[#e7e5e4] flex flex-col gap-10 shrink-0 w-[260px] px-6 py-8 min-h-screen sticky top-0 h-screen overflow-y-auto">
      <div className="flex flex-col gap-1">
        <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[11px] tracking-[0.44px] uppercase">
          Campus Dining
        </p>
        <p className="font-['Lora:Bold',Lora,serif] font-bold text-[#1c1917] text-[22px]">
          VIT Cafe
        </p>
      </div>

      <nav className="flex flex-col gap-2 w-full">
        {tabs.map(({ label, icon }) => {
          const isActive = activeTab === label
          return (
            <button
              key={label}
              onClick={() => onTabChange(label)}
              className={`flex gap-3 items-center px-4 py-3 rounded-xl w-full text-left transition-colors ${
                isActive ? "bg-[#ecfdf5]" : "bg-transparent hover:bg-[#faf9f6]"
              }`}
            >
              <img alt="" className="w-5 h-5 shrink-0" src={icon} />
              <span
                className={`font-['Inter:${
                  isActive ? "Semi_Bold" : "Medium"
                }',Inter,sans-serif] ${
                  isActive
                    ? "font-semibold text-[#2563eb]"
                    : "font-medium text-[#1c1917]"
                } text-[14px] whitespace-nowrap`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="flex-1" />

      <button
        onClick={onOpenProfile}
        aria-label="Open profile"
        className={`flex gap-3 items-center w-full text-left p-2 -m-2 rounded-xl transition-colors ${
          profileActive ? "bg-[#ecfdf5]" : "hover:bg-[#faf9f6]"
        }`}
      >
        <div className="bg-[#2563eb] flex items-center justify-center rounded-[20px] shrink-0 w-10 h-10">
          <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-white text-[14px]">
            {initials(user.name)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px] truncate">
            {user.name}
          </p>
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[12px] truncate">
            {user.email}
          </p>
        </div>
      </button>
    </aside>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (u: User) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "signup" && !name.trim())
      return setError("Please enter your name.")
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("Enter a valid email address.")
    if (password.length < 6)
      return setError("Password must be at least 6 characters.")
    const derived = email.split("@")[0].replace(/[._]+/g, " ")
    const display =
      mode === "signup"
        ? name.trim()
        : derived.replace(/\b\w/g, (c) => c.toUpperCase())
    onLogin({ name: display, email, phone: "", hostel: "" })
  }

  const field =
    "w-full h-12 px-4 rounded-xl border border-[#e7e5e4] bg-[#faf9f6] text-[14px] text-[#1c1917] font-['Inter',sans-serif] outline-none focus:border-[#2563eb] focus:bg-white transition-colors"

  return (
    <div className="min-h-screen w-full flex bg-[#faf9f6]">
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#1c1917] p-12 flex-col justify-between">
        <img
          alt=""
          src={img72f32}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/30 to-[#1c1917]/50" />
        <p className="relative font-['Lora:Bold',Lora,serif] font-bold text-white text-[22px]">
          VIT Cafe
        </p>
        <div className="relative flex flex-col gap-6">
          <p className="font-['Lora:Bold',Lora,serif] font-bold text-white text-[44px] leading-[1.1] max-w-[440px]">
            Skip the queue. Savour the break.
          </p>
          <div className="flex gap-3">
            {[imgD215c, img84894, imgBb4ff, img82c43].map((src) => (
              <img
                key={src}
                alt=""
                src={src}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/80"
              />
            ))}
          </div>
          <p className="text-white/80 text-[14px]">
            Order ahead from campus kitchens and pick up when it's ready.
          </p>
        </div>
      </div>
      <div className="flex-1 lg:max-w-[560px] flex items-center justify-center p-6">
        <div className="bg-white border border-[#e7e5e4] rounded-[20px] w-full max-w-[420px] p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[11px] tracking-[0.44px] uppercase">
              Campus Dining
            </p>
            <p className="font-['Lora:Bold',Lora,serif] font-bold text-[#1c1917] text-[32px]">
              VIT Cafe
            </p>
            <p className="font-['Inter:Regular',Inter,sans-serif] text-[#68615e] text-[14px] mt-2">
              {mode === "login"
                ? "Sign in to order ahead and skip the queue."
                : "Create an account to start ordering."}
            </p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <input
                className={field}
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            )}
            <input
              className={field}
              type="email"
              placeholder="College email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              className={field}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
            {error && (
              <p role="alert" className="text-[13px] text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="h-12 rounded-[24px] bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors text-white font-semibold text-[15px]"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() =>
              onLogin({
                name: "Alex Prokhorov",
                email: "alex@vitstudent.ac.in",
                phone: "+91 98765 43210",
                hostel: "A Block",
              })
            }
            className="h-12 rounded-[24px] border border-[#e7e5e4] bg-white hover:bg-[#faf9f6] transition-colors text-[#1c1917] font-semibold text-[14px]"
          >
            Continue with Demo Account
          </button>

          <p className="text-center text-[13px] text-[#68615e]">
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login")
                setError("")
              }}
              className="text-[#2563eb] font-semibold hover:underline"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({
  user,
  orderCount,
  onSave,
  onLogout,
}: {
  user: User
  orderCount: number
  onSave: (u: User) => void
  onLogout: () => void
}) {
  const [draft, setDraft] = useState(user)
  const [saved, setSaved] = useState(false)
  const set = (k: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({ ...draft, [k]: e.target.value })
    setSaved(false)
  }
  const field =
    "w-full h-11 px-4 rounded-xl border border-[#e7e5e4] bg-[#faf9f6] text-[14px] text-[#1c1917] outline-none focus:border-[#2563eb] focus:bg-white transition-colors"
  const label =
    "font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[12px]"

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="bg-white border-b border-[#e7e5e4] px-10 py-6 shrink-0">
        <p className="font-['Inter:Regular',Inter,sans-serif] text-[#68615e] text-[14px]">
          Manage your account
        </p>
        <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
          My Profile
        </p>
      </div>

      <div className="flex flex-col gap-6 p-10 flex-1 overflow-y-auto max-w-[760px]">
        <div className="bg-white border border-[#e7e5e4] rounded-[16px] overflow-hidden">
          <div className="h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#1c1917]" />
            <div className="absolute -right-10 -top-12 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute right-24 -bottom-16 w-40 h-40 rounded-full bg-white/5" />
            <p className="absolute top-4 left-6 font-['Lora:Bold',Lora,serif] font-bold text-white/90 text-[16px]">
              VIT Cafe
            </p>
            <span className="absolute top-4 right-6 bg-white/20 backdrop-blur text-white text-[12px] font-semibold px-3 py-1 rounded-full">
              Campus Member
            </span>
          </div>
          <div className="px-6 pb-6 flex items-end gap-5 -mt-10 relative">
            <div className="bg-[#2563eb] flex items-center justify-center rounded-full w-24 h-24 shrink-0 border-4 border-white shadow-md">
              <span className="font-bold text-white text-[30px]">
                {initials(user.name)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-0 flex-1 pb-1">
              <p className="font-['Lora:Bold',Lora,serif] font-bold text-[#1c1917] text-[24px] truncate">
                {user.name}
              </p>
              <p className="text-[#68615e] text-[13px] truncate">
                {user.email}
                {user.hostel ? ` · ${user.hostel}` : ""}
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#ecfdf5] rounded-xl px-5 py-3">
              <span className="font-bold text-[#2563eb] text-[20px]">
                {orderCount}
              </span>
              <span className="text-[#2563eb] text-[12px]">Past orders</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e7e5e4] rounded-[16px] p-6 flex flex-col gap-4">
          <p className="font-bold text-[#1c1917] text-[16px]">
            Your usual picks
          </p>
          <div className="flex gap-4">
            {[
              ["Butter Chicken Bowl", img72f32],
              ["Masala Dosa", imgD215c],
              ["Chole Bhature", img84894],
            ].map(([n, src]) => (
              <div key={n} className="flex flex-col gap-2 flex-1 min-w-0">
                <img
                  alt={n}
                  src={src}
                  className="w-full h-24 rounded-xl object-cover"
                />
                <p className="text-[13px] font-semibold text-[#1c1917] truncate">
                  {n}
                </p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!draft.name.trim()) return
            onSave({ ...draft, name: draft.name.trim() })
            setSaved(true)
          }}
          className="bg-white border border-[#e7e5e4] rounded-[16px] p-6 flex flex-col gap-4"
        >
          <p className="font-bold text-[#1c1917] text-[16px]">
            Personal details
          </p>
          <label className="flex flex-col gap-1.5">
            <span className={label}>Full name</span>
            <input
              className={field}
              value={draft.name}
              onChange={set("name")}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>Email</span>
            <input
              className={field}
              type="email"
              value={draft.email}
              onChange={set("email")}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className={label}>Phone</span>
              <input
                className={field}
                type="tel"
                placeholder="+91"
                value={draft.phone}
                onChange={set("phone")}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>Hostel / Block</span>
              <input
                className={field}
                placeholder="e.g. A Block"
                value={draft.hostel}
                onChange={set("hostel")}
              />
            </label>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="h-11 px-6 rounded-[22px] bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors text-white font-semibold text-[14px]"
            >
              Save Changes
            </button>
            {saved && <span className="text-[13px] text-[#065f46]">Saved</span>}
          </div>
        </form>

        <button
          onClick={onLogout}
          className="self-start h-11 px-6 rounded-[22px] border border-[#e7e5e4] bg-white hover:bg-[#faf9f6] text-[#b91c1c] font-semibold text-[14px] transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

// ─── Cart bag indicator ───────────────────────────────────────────────────────
function BagIndicator({
  count,
  onClick,
}: {
  count: number
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="bg-[#ecfdf5] flex gap-2 items-center px-4 py-2 rounded-[20px] shrink-0 hover:bg-[#d1fae5] transition-colors focus:outline-none"
    >
      <img alt="" className="w-[18px] h-[18px]" src={imgBag} />
      <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[13px] whitespace-nowrap">
        {count} {count === 1 ? "Item" : "Items"} in Bag
      </span>
    </button>
  )
}

function FavoriteButton({
  itemName,
  isFavorite,
  onToggle,
  className = "",
}: {
  itemName: string
  isFavorite: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${isFavorite ? "Remove" : "Add"} ${itemName} ${
        isFavorite ? "from" : "to"
      } favorites`}
      aria-pressed={isFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`bg-white flex items-center justify-center rounded-full w-9 h-9 shadow-sm border transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 ${
        isFavorite
          ? "border-red-100 text-red-500"
          : "border-[#e7e5e4] text-[#68615e] hover:text-red-500"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

// ─── Menu Browse Screen ───────────────────────────────────────────────────────
function MenuBrowseScreen({
  cart,
  onAddToCart,
  onUpdateQty,
  onRemoveFromCart,
  onOpenDetail,
  onGoToCart,
  favoriteIds,
  onToggleFavorite,
}: {
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onUpdateQty: (itemId: number, delta: number) => void
  onRemoveFromCart: (itemId: number) => void
  onOpenDetail: (item: MenuItem) => void
  onGoToCart: () => void
  favoriteIds: Set<number>
  onToggleFavorite: (itemId: number) => void
}) {
  const [activeCategory, setActiveCategory] = useState("Popular")
  const [searchQuery, setSearchQuery] = useState("")

  const totalItems = cart.reduce((s, c) => s + c.qty, 0)
  const subtotal = cart.reduce((s, c) => s + c.unitPrice * c.qty, 0)

  const filteredItems = useMemo(() => {
    let items = ALL_ITEMS
    if (activeCategory !== "Popular")
      items = items.filter((i) => i.category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      )
    }
    return items
  }, [activeCategory, searchQuery])

  const sectionTitle = searchQuery.trim()
    ? `Results for "${searchQuery}"`
    : activeCategory === "Popular"
      ? "Top Student Picks"
      : activeCategory

  // qty in cart for a given item id
  const cartQty = (id: number) => cart.find((c) => c.item.id === id)?.qty ?? 0

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0 w-full gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            Browse Menu
          </p>
        </div>

        <div className="bg-[#faf9f6] border border-[#e7e5e4] flex gap-3 h-11 items-center px-4 rounded-[22px] flex-1 max-w-[400px]">
          <div className="shrink-0 w-[18px] h-[18px]">
            <img
              alt=""
              className="block w-full h-full object-contain"
              src={imgSearchIcon}
            />
          </div>
          <input
            type="text"
            className="flex-1 min-w-0 bg-transparent font-['Inter:Regular',Inter,sans-serif] font-normal text-[#1c1917] text-[13px] outline-none placeholder:text-[#a8a29e]"
            placeholder="Search for biryani, chai, dosa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <BagIndicator count={totalItems} onClick={onGoToCart} />
      </header>

      {/* Content */}
      <div className="flex flex-1 gap-10 items-start p-10 w-full overflow-y-auto">
        {/* Left: categories + grid */}
        <div className="flex flex-1 flex-col gap-8 items-start min-w-0">
          {/* Category pills */}
          <div className="flex flex-wrap gap-3 items-start w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setSearchQuery("")
                  }}
                  className={`px-5 py-2 rounded-[20px] shrink-0 transition-colors font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[14px] whitespace-nowrap ${
                    isActive
                      ? "bg-[#2563eb] text-white"
                      : "bg-white border border-[#e7e5e4] text-[#68615e] hover:bg-[#faf9f6]"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Grid section */}
          <div className="flex flex-col gap-4 items-start w-full">
            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[18px] whitespace-nowrap">
              {sectionTitle}
            </p>
            {filteredItems.length === 0 ? (
              <p className="font-['Inter:Regular',Inter,sans-serif] text-[#68615e] text-[14px]">
                No items found.
              </p>
            ) : (
              <div className="flex flex-wrap gap-5 items-start w-full">
                {filteredItems.map((item) => {
                  const qty = cartQty(item.id)
                  return (
                    <div
                      key={item.id}
                      className="flex items-start shrink-0 w-[250px]"
                    >
                      <div className="relative bg-white border border-[#e7e5e4] flex flex-col flex-1 items-start min-w-0 overflow-hidden rounded-2xl">
                        {/* Image — clicking navigates to detail */}
                        <button
                          className="h-40 relative shrink-0 w-full block overflow-hidden focus:outline-none"
                          onClick={() => onOpenDetail(item)}
                          aria-label={`View ${item.name} details`}
                        >
                          <img
                            alt={item.name}
                            className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            src={item.image}
                          />
                        </button>
                        <FavoriteButton
                          itemName={item.name}
                          isFavorite={favoriteIds.has(item.id)}
                          onToggle={() => onToggleFavorite(item.id)}
                          className="absolute mt-3 ml-[198px] z-[1]"
                        />

                        <div className="flex flex-col gap-2 items-start p-4 w-full">
                          <button
                            onClick={() => onOpenDetail(item)}
                            className="text-left w-full focus:outline-none"
                          >
                            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] truncate w-full hover:text-[#2563eb] transition-colors">
                              {item.name}
                            </p>
                          </button>
                          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px] line-clamp-2 w-full">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between pt-2 w-full">
                            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap">
                              ₹{item.price}
                            </p>
                            <div className="bg-[#faf9f6] px-2 py-1 rounded-[6px]">
                              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[11px] whitespace-nowrap">
                                {item.time}
                              </span>
                            </div>
                          </div>

                          {qty > 0 ? (
                            <div className="flex items-center gap-2 w-full mt-1">
                              <button
                                onClick={() => onUpdateQty(item.id, -1)}
                                className="w-7 h-7 rounded-full bg-[#e7e5e4] flex items-center justify-center text-[#1c1917] font-bold text-lg hover:bg-[#d6d3d1] transition-colors"
                              >
                                −
                              </button>
                              <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[14px] flex-1 text-center">
                                {qty}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.id, 1)}
                                className="w-7 h-7 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-lg hover:bg-[#1d4ed8] transition-colors"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => onOpenDetail(item)}
                              className="mt-1 w-full bg-[#2563eb] text-white rounded-[20px] py-2 font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[13px] hover:bg-[#1d4ed8] transition-colors"
                            >
                              Customize & Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: daily special + cart widget */}
        <div className="flex flex-col gap-6 items-start shrink-0 w-[360px]">
          {/* Daily Special */}
          <div className="flex flex-col gap-3 items-start w-full">
            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap">
              Daily Special
            </p>
            <div className="bg-white border border-[#e7e5e4] flex flex-col items-start overflow-hidden rounded-2xl w-full">
              <div className="h-[140px] relative shrink-0 w-full overflow-hidden">
                <button
                  className="absolute inset-0 block w-full focus:outline-none"
                  onClick={() => onOpenDetail(DAILY_SPECIAL)}
                >
                  <img
                    alt="Daily Special"
                    className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    src={DAILY_SPECIAL.image}
                  />
                </button>
                <FavoriteButton
                  itemName={DAILY_SPECIAL.name}
                  isFavorite={favoriteIds.has(DAILY_SPECIAL.id)}
                  onToggle={() => onToggleFavorite(DAILY_SPECIAL.id)}
                  className="absolute top-3 right-3 z-[1]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start p-4 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="bg-[#ecfdf5] px-2 py-1 rounded-[4px]">
                    <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[11px] whitespace-nowrap">
                      FREE LASSI INCLUDED
                    </span>
                  </div>
                  <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#2563eb] text-[16px] whitespace-nowrap">
                    ₹{DAILY_SPECIAL.price}
                  </p>
                </div>
                <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap">
                  {DAILY_SPECIAL.name}
                </p>
                <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px] truncate w-full">
                  {DAILY_SPECIAL.description}
                </p>
                <button
                  onClick={() => onOpenDetail(DAILY_SPECIAL)}
                  className="mt-1 w-full bg-[#2563eb] text-white rounded-[20px] py-2 font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[13px] hover:bg-[#1d4ed8] transition-colors"
                >
                  Customize &amp; Add
                </button>
              </div>
            </div>
          </div>

          {/* Quick Bag Summary */}
          <div className="bg-white border border-[#e7e5e4] flex flex-col gap-4 items-start p-5 rounded-2xl w-full">
            <div className="flex items-center justify-between w-full">
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap">
                Quick Bag Summary
              </p>
              <div className="bg-[#ecfdf5] px-2 py-1 rounded-[6px]">
                <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[12px] whitespace-nowrap">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </span>
              </div>
            </div>

            {cart.length === 0 ? (
              <p className="font-['Inter:Regular',Inter,sans-serif] text-[#a8a29e] text-[13px]">
                Your bag is empty.
              </p>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                {cart.map((c) => (
                  <div
                    key={c.item.id}
                    className="flex items-center justify-between w-full gap-2"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => onRemoveFromCart(c.item.id)}
                        className="text-[#a8a29e] hover:text-red-500 text-xs shrink-0 leading-none"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => onUpdateQty(c.item.id, -1)}
                          className="w-5 h-5 rounded-full bg-[#e7e5e4] flex items-center justify-center text-[#1c1917] text-xs font-bold hover:bg-[#d6d3d1] transition-colors"
                        >
                          −
                        </button>
                        <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[12px] w-4 text-center">
                          {c.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(c.item.id, 1)}
                          className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-xs font-bold hover:bg-[#1d4ed8] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-['Inter:Medium',Inter,sans-serif] font-medium text-[#1c1917] text-[13px] truncate">
                        {c.item.name}
                        {c.qty > 1 ? ` ×${c.qty}` : ""}
                        {c.size !== "Regular" ? ` (${c.size})` : ""}
                      </p>
                    </div>
                    <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[13px] whitespace-nowrap shrink-0">
                      ₹{c.unitPrice * c.qty}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="h-px bg-[#e7e5e4] w-full" />

            <div className="flex items-center justify-between w-full">
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
                Subtotal
              </p>
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[18px]">
                ₹{subtotal}
              </p>
            </div>

            <button
              className="bg-[#2563eb] flex h-11 items-center justify-center rounded-[22px] w-full hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
              onClick={onGoToCart}
            >
              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-white text-[14px] whitespace-nowrap">
                Review Cart &amp; Checkout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Food Detail Screen ───────────────────────────────────────────────────────
function FoodDetailScreen({
  item,
  cart,
  onAddToCart,
  onBack,
  onGoToCart,
  isFavorite,
  onToggleFavorite,
}: {
  item: MenuItem
  cart: CartItem[]
  onAddToCart: (
    item: MenuItem,
    qty: number,
    size: string,
    extras: string[],
    unitPrice: number,
  ) => void
  onBack: () => void
  onGoToCart: () => void
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  const defaultSize =
    item.sizes.find((s) => s.label === "Regular") ?? item.sizes[0]
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize)
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set())
  const [qty, setQty] = useState(1)
  const [instructions, setInstructions] = useState("")

  const totalItems = cart.reduce((s, c) => s + c.qty, 0)

  const extrasTotal = item.extras
    .filter((e) => selectedExtras.has(e.id))
    .reduce((s, e) => s + e.price, 0)

  const unitPrice = item.price + selectedSize.delta + extrasTotal
  const totalPrice = unitPrice * qty

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAdd = () => {
    onAddToCart(
      item,
      qty,
      selectedSize.label,
      Array.from(selectedExtras),
      unitPrice,
    )
    onBack()
  }

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0 w-full gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            Customize {item.name}
          </p>
        </div>
        <BagIndicator count={totalItems} onClick={onGoToCart} />
      </header>

      {/* Content */}
      <div className="flex flex-1 gap-10 items-start p-10 w-full overflow-y-auto">
        {/* Left: hero image + metadata */}
        <div className="flex flex-1 flex-col gap-5 items-start min-w-0">
          <div className="h-[420px] relative rounded-[24px] shrink-0 w-full overflow-hidden">
            <img
              alt={item.name}
              className="absolute inset-0 object-cover w-full h-full rounded-[24px]"
              src={item.detailImage}
            />
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white border border-[#e7e5e4] flex gap-1.5 items-center px-[14px] py-2 rounded-[8px] shrink-0">
              <div className="shrink-0 w-[14px] h-[14px] relative">
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full"
                  src={imgClock}
                />
              </div>
              <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[13px] whitespace-nowrap">
                {item.time} prep
              </p>
            </div>
            {/* Back link */}
            <button
              onClick={onBack}
              className="bg-white border border-[#e7e5e4] flex items-center gap-2 px-[14px] py-2 rounded-[8px] shrink-0 hover:bg-[#faf9f6] transition-colors"
            >
              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[13px]">
                ← Back to Menu
              </span>
            </button>
          </div>
        </div>

        {/* Right: customization card */}
        <div className="bg-white border border-[#e7e5e4] flex flex-col gap-6 items-start p-8 rounded-[24px] shrink-0 w-[500px]">
          {/* Core info */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between gap-4">
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px] truncate">
                {item.name}
              </p>
              <FavoriteButton
                itemName={item.name}
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
                className="shrink-0"
              />
            </div>
            <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px] leading-[1.5] w-full">
              {item.longDescription}
            </p>
          </div>

          <div className="h-px bg-[#e7e5e4] w-full" />

          {/* Size selector */}
          <div className="flex flex-col gap-2.5 w-full">
            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[15px] whitespace-nowrap">
              Select Size
            </p>
            <div className="bg-[#faf9f6] border border-[#e7e5e4] flex gap-1 h-11 items-start p-1 rounded-[22px] w-full">
              {item.sizes.map((size) => {
                const isActive = selectedSize.label === size.label
                return (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`flex flex-1 h-full items-center justify-center min-w-0 rounded-[18px] transition-colors font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[13px] whitespace-nowrap ${
                      isActive
                        ? "bg-[#2563eb] text-white"
                        : "text-[#68615e] hover:bg-white"
                    }`}
                  >
                    {size.label}
                    {size.delta !== 0 && (
                      <span className="ml-1 text-[11px] opacity-75">
                        {size.delta > 0
                          ? `+₹${size.delta}`
                          : `-₹${Math.abs(size.delta)}`}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Addons */}
          {item.extras.length > 0 && (
            <div className="flex flex-col gap-2.5 w-full">
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[15px] whitespace-nowrap">
                Add Custom Extras
              </p>
              <div className="flex flex-col gap-2 w-full">
                {item.extras.map((extra) => {
                  const checked = selectedExtras.has(extra.id)
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`bg-white border flex h-11 items-center justify-between px-4 rounded-[12px] w-full transition-colors ${
                        checked
                          ? "border-[#2563eb]"
                          : "border-[#e7e5e4] hover:border-[#a8a29e]"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        {checked ? (
                          <img
                            alt=""
                            src={imgChecked}
                            className="w-5 h-5 shrink-0"
                          />
                        ) : (
                          <div className="bg-white border-[1.5px] border-[#a8a29e] rounded-[4px] shrink-0 w-5 h-5" />
                        )}
                        <span className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#1c1917] text-[14px] whitespace-nowrap">
                          {extra.label}
                        </span>
                      </div>
                      <span
                        className={`font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[13px] whitespace-nowrap ${
                          checked ? "text-[#2563eb]" : "text-[#68615e]"
                        }`}
                      >
                        {extra.price > 0 ? `+₹${extra.price}` : "+₹0"}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div className="flex flex-col gap-2.5 w-full">
            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[15px] whitespace-nowrap">
              Special Instructions
            </p>
            <div className="bg-white border border-[#e7e5e4] flex items-center px-4 rounded-[12px] w-full h-12 focus-within:border-[#2563eb] transition-colors">
              <input
                type="text"
                className="flex-1 min-w-0 bg-transparent font-['Inter:Regular',Inter,sans-serif] font-normal text-[#1c1917] text-[13px] outline-none placeholder:text-[#a8a29e]"
                placeholder="Example: Less spicy, extra raita on the side..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>

          <div className="h-px bg-[#e7e5e4] w-full" />

          {/* Action footer: stepper + add to cart */}
          <div className="flex gap-4 items-center w-full">
            {/* Quantity stepper */}
            <div className="bg-[#faf9f6] border border-[#e7e5e4] flex gap-4 h-[54px] items-center px-3 rounded-[27px] shrink-0">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="bg-white border border-[#e7e5e4] flex items-center justify-center rounded-[16px] shrink-0 w-8 h-8 hover:bg-[#faf9f6] transition-colors"
              >
                <span className="text-[#1c1917] text-[18px] leading-none">
                  −
                </span>
              </button>
              <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap min-w-[1rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="bg-white border border-[#e7e5e4] flex items-center justify-center rounded-[16px] shrink-0 w-8 h-8 hover:bg-[#faf9f6] transition-colors"
              >
                <span className="text-[#1c1917] text-[18px] leading-none">
                  +
                </span>
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAdd}
              className="bg-[#2563eb] flex flex-1 h-12 items-center justify-between px-6 rounded-[24px] hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-white text-[15px] whitespace-nowrap">
                Add to Cart
              </span>
              <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-white text-[15px] whitespace-nowrap">
                ₹{totalPrice}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Cart Review Screen ───────────────────────────────────────────────────────
const MEAL_PLAN_DISCOUNT = 0.15

function CartReviewScreen({
  cart,
  onUpdateQty,
  onRemoveFromCart,
  onGoToMenu,
  onGoToCart,
  onGoToPickup,
}: {
  cart: CartItem[]
  onUpdateQty: (itemId: number, delta: number) => void
  onRemoveFromCart: (itemId: number) => void
  onGoToMenu: () => void
  onGoToCart: () => void
  onGoToPickup: () => void
}) {
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const totalItems = cart.reduce((s, c) => s + c.qty, 0)
  const subtotal = cart.reduce((s, c) => s + c.unitPrice * c.qty, 0)
  const discount = promoApplied
    ? Math.round(subtotal * MEAL_PLAN_DISCOUNT)
    : Math.round(subtotal * MEAL_PLAN_DISCOUNT)
  const total = subtotal - discount

  const handleApply = () => {
    if (promoCode.trim()) setPromoApplied(true)
  }

  // Map extra ids → labels using item.extras
  const getExtraLabels = (c: CartItem) =>
    c.extras
      .map((id) => c.item.extras.find((e) => e.id === id)?.label ?? id)
      .filter(Boolean)

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0 w-full gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            My Cart
          </p>
        </div>
        <BagIndicator count={totalItems} onClick={onGoToCart} />
      </header>

      {/* Content */}
      <div className="flex flex-1 gap-10 items-start p-10 w-full overflow-y-auto">
        {/* Left: items list */}
        <div className="flex flex-1 flex-col gap-5 items-start min-w-0">
          {/* Info tip */}
          <div className="flex gap-2 items-center">
            <div className="shrink-0 w-[14px] h-[14px] relative">
              <img
                alt=""
                className="absolute inset-0 w-full h-full"
                src={imgInfo}
              />
            </div>
            <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px] whitespace-nowrap">
              Confirm details and adjust quantities below before proceeding
            </p>
          </div>

          {/* Cart item cards */}
          {cart.length === 0 ? (
            <div className="bg-white border border-[#e7e5e4] rounded-2xl p-8 w-full flex flex-col items-center gap-4">
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px]">
                Your bag is empty
              </p>
              <button
                onClick={onGoToMenu}
                className="bg-[#2563eb] text-white font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[14px] px-6 py-2 rounded-[20px] hover:bg-[#1d4ed8] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              {cart.map((c) => {
                const tags = [
                  c.size !== "Regular" || c.item.sizes.length === 1
                    ? c.size
                    : "Regular",
                  ...getExtraLabels(c),
                ]
                return (
                  <div
                    key={c.item.id}
                    className="bg-white border border-[#e7e5e4] flex gap-4 items-start p-4 rounded-2xl w-full"
                  >
                    {/* Thumbnail */}
                    <div className="relative rounded-[10px] shrink-0 w-20 h-20 overflow-hidden">
                      <img
                        alt={c.item.name}
                        className="absolute inset-0 object-cover w-full h-full rounded-[10px]"
                        src={c.item.image}
                      />
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                      {/* Title row */}
                      <div className="flex items-start justify-between w-full font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap gap-2">
                        <span className="truncate">{c.item.name}</span>
                        <span className="shrink-0">₹{c.unitPrice * c.qty}</span>
                      </div>

                      {/* Custom tags */}
                      <div className="flex flex-wrap gap-1 items-start w-full">
                        {tags.map((tag, i) => (
                          <div
                            key={i}
                            className="bg-[#faf9f6] px-2 py-1 rounded-[4px]"
                          >
                            <span className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[11px] whitespace-nowrap">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Qty stepper row */}
                      <div className="flex items-center justify-between pt-1 w-full">
                        <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px] whitespace-nowrap">
                          Quantity:
                        </p>
                        <div className="flex items-center gap-1">
                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveFromCart(c.item.id)}
                            className="text-[#a8a29e] hover:text-red-500 text-xs mr-2 leading-none transition-colors"
                            aria-label="Remove item"
                          >
                            ✕
                          </button>
                          {/* Stepper */}
                          <div className="bg-[#faf9f6] flex gap-3 h-8 items-center px-2 rounded-[16px]">
                            <button
                              onClick={() => onUpdateQty(c.item.id, -1)}
                              className="flex items-center justify-center shrink-0 w-6 h-6 text-[#1c1917] text-[18px] leading-none focus:outline-none hover:opacity-60 transition-opacity"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[14px] whitespace-nowrap min-w-[1rem] text-center">
                              {c.qty}
                            </span>
                            <button
                              onClick={() => onUpdateQty(c.item.id, 1)}
                              className="flex items-center justify-center shrink-0 w-6 h-6 text-[#1c1917] text-[18px] leading-none focus:outline-none hover:opacity-60 transition-opacity"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Continue shopping link */}
          <button
            onClick={onGoToMenu}
            className="flex items-center gap-1 text-[#2563eb] font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[13px] hover:underline transition-colors mt-2"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Right: promo + order summary */}
        <div className="flex flex-col gap-6 items-start shrink-0 w-[440px]">
          {/* Promo code input */}
          <div className="bg-white border border-[#e7e5e4] flex h-12 items-center justify-between pl-4 pr-1 rounded-[24px] w-full">
            <div className="flex gap-2 items-center flex-1 min-w-0">
              <div className="shrink-0 w-4 h-4 relative">
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full"
                  src={imgTag}
                />
              </div>
              <input
                type="text"
                className="flex-1 min-w-0 bg-transparent font-['Inter:Regular',Inter,sans-serif] font-normal text-[#1c1917] text-[13px] outline-none placeholder:text-[#a8a29e]"
                placeholder="Enter promo code..."
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value)
                  setPromoApplied(false)
                }}
              />
            </div>
            <button
              onClick={handleApply}
              className="bg-[#1c1917] px-4 py-2 rounded-[20px] shrink-0 hover:bg-[#292524] transition-colors"
            >
              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-white text-[13px] whitespace-nowrap">
                Apply
              </span>
            </button>
          </div>

          {promoApplied && (
            <p className="font-['Inter:Regular',Inter,sans-serif] text-[#2563eb] text-[12px] -mt-4">
              Meal Plan Discount applied!
            </p>
          )}

          {/* Order Summary */}
          <div className="bg-white border border-[#e7e5e4] flex flex-col gap-4 items-start p-6 rounded-2xl w-full">
            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] whitespace-nowrap">
              Order Summary
            </p>

            {/* Subtotal row */}
            <div className="flex items-start justify-between w-full text-[13px] whitespace-nowrap">
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e]">
                Subtotal
              </p>
              <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917]">
                ₹{subtotal}
              </p>
            </div>

            {/* Discount row */}
            <div className="flex items-start justify-between w-full text-[13px] text-[#2563eb] whitespace-nowrap">
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal">
                Meal Plan Discount (15%)
              </p>
              <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold">
                -₹{discount}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e7e5e4] w-full" />

            {/* Total row */}
            <div className="flex items-center justify-between w-full whitespace-nowrap font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917]">
              <p className="text-[16px]">Total Price</p>
              <p className="text-[20px]">₹{total}</p>
            </div>

            {/* CTA */}
            <button
              className="bg-[#2563eb] flex h-[54px] items-center justify-between px-5 rounded-[27px] w-full hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white whitespace-nowrap"
              disabled={cart.length === 0}
              onClick={onGoToPickup}
            >
              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[16px]">
                Choose Pickup Time
              </span>
              <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[16px]">
                ₹{total}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Pickup Time Screen ───────────────────────────────────────────────────────

type DayKey = "today" | "tomorrow"

const TODAY_DATE = "Today, Oct 22"
const TOMORROW_DATE = "Tomorrow, Oct 23"

type TimeSlot = { time: string available: boolean }

const SLOTS: Record<DayKey, TimeSlot[]> = {
  today: [
    { time: "11:00 AM", available: true },
    { time: "11:15 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "11:45 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "12:15 PM", available: false },
    { time: "12:30 PM", available: true },
    { time: "12:45 PM", available: true },
    { time: "1:00 PM", available: true },
  ],
  tomorrow: [
    { time: "10:00 AM", available: true },
    { time: "10:15 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "10:45 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:15 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "11:45 AM", available: true },
    { time: "12:00 PM", available: true },
  ],
}

const LOCATIONS = [
  {
    id: "gazebo",
    name: "Gazebo",
    sub: "Near the Central Lawn",
    counter: "Gazebo counter C3",
    code: "C3",
  },
  {
    id: "cafeteria",
    name: "Main Cafeteria",
    sub: "Block A, Ground Floor",
    counter: "Cafeteria counter B1",
    code: "B1",
  },
  {
    id: "library",
    name: "Library Annex",
    sub: "Near Study Hall, Block D",
    counter: "Library counter L2",
    code: "L2",
  },
]

function PickupTimeScreen({
  total,
  cart,
  onGoToCart,
  onConfirm,
}: {
  total: number
  cart: CartItem[]
  onGoToCart: () => void
  onConfirm: (day: string, time: string, location: string, code: string) => void
}) {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0)
  const [selectedDay, setSelectedDay] = useState<DayKey>("today")
  const [selectedTime, setSelectedTime] = useState<string>("11:30 AM")
  const [selectedLocId, setSelectedLocId] = useState("gazebo")
  const [locDropdownOpen, setLocDropdownOpen] = useState(false)

  const slots = SLOTS[selectedDay]
  const selectedLoc = LOCATIONS.find((l) => l.id === selectedLocId)!

  // chunk slots into rows of 3
  const rows: TimeSlot[][] = []
  for (let i = 0; i < slots.length; i += 3) rows.push(slots.slice(i, i + 3))

  const handleDayChange = (day: DayKey) => {
    setSelectedDay(day)
    // reset to first available slot of new day
    const first = SLOTS[day].find((s) => s.available)
    setSelectedTime(first?.time ?? "")
  }

  const canConfirm = selectedTime !== ""

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0 w-full gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            Select Pickup Details
          </p>
        </div>
        <BagIndicator count={totalItems} onClick={onGoToCart} />
      </header>

      {/* Content */}
      <div className="flex flex-1 gap-10 items-start p-10 w-full overflow-y-auto">
        {/* ── Left column: date + time slots ── */}
        <div className="flex flex-1 flex-col gap-8 items-start min-w-0">
          {/* Date selector */}
          <div className="flex gap-3 items-start w-full" data-node-id="6:45">
            {(["today", "tomorrow"] as DayKey[]).map((day) => {
              const label = day === "today" ? TODAY_DATE : TOMORROW_DATE
              const active = selectedDay === day
              return (
                <button
                  key={day}
                  onClick={() => handleDayChange(day)}
                  className={`flex flex-1 h-12 items-center justify-center min-w-0 rounded-xl transition-colors font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[14px] whitespace-nowrap
                    ${
                      active
                        ? "bg-[#2563eb] text-white"
                        : "bg-white border border-[#e7e5e4] text-[#68615e] hover:border-[#2563eb]"
                    }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Time slots section */}
          <div
            className="flex flex-col gap-4 items-start w-full"
            data-node-id="6:50"
          >
            {/* Section header */}
            <div className="flex items-center justify-between w-full whitespace-nowrap">
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px]">
                Available Slots
              </p>
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px]">
                15-min intervals
              </p>
            </div>

            {/* Time grid */}
            <div
              className="flex flex-col gap-3 items-start w-full"
              data-node-id="6:54"
            >
              {rows.map((row, ri) => (
                <div key={ri} className="flex gap-3 items-start w-full">
                  {row.map((slot) => {
                    const isSelected =
                      selectedTime === slot.time && slot.available
                    const isUnavail = !slot.available
                    return (
                      <button
                        key={slot.time}
                        disabled={isUnavail}
                        onClick={() =>
                          slot.available && setSelectedTime(slot.time)
                        }
                        className={`flex flex-1 h-11 items-center justify-center min-w-0 rounded-[10px] transition-colors
                          font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[13px] whitespace-nowrap
                          ${
                            isSelected
                              ? "bg-[#2563eb] border border-transparent text-white"
                              : isUnavail
                                ? "bg-[#e7e5e4] text-[#a8a29e] opacity-50 cursor-not-allowed"
                                : "bg-white border border-[#e7e5e4] text-[#68615e] hover:border-[#2563eb]"
                          }`}
                      >
                        {slot.time}
                      </button>
                    )
                  })}
                  {/* pad row if fewer than 3 */}
                  {row.length < 3 &&
                    Array.from({ length: 3 - row.length }).map((_, i) => (
                      <div key={`pad-${i}`} className="flex-1 min-w-0" />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: location + notice + confirm ── */}
        <div
          className="flex flex-col gap-6 items-start shrink-0 w-[440px]"
          data-node-id="6:76"
        >
          {/* Pickup Location section */}
          <div
            className="flex flex-col gap-2.5 items-start w-full"
            data-node-id="6:77"
          >
            <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[15px] whitespace-nowrap">
              Pickup Location
            </p>

            {/* Dropdown trigger */}
            <div className="relative w-full">
              <button
                onClick={() => setLocDropdownOpen((o) => !o)}
                className="bg-white border border-[#e7e5e4] flex h-[60px] items-center justify-between px-4 rounded-xl w-full hover:border-[#2563eb] transition-colors focus:outline-none"
                data-node-id="6:79"
              >
                <div className="flex gap-3 items-center">
                  <div className="shrink-0 w-9 h-9 relative">
                    <img
                      alt=""
                      className="absolute inset-0 w-full h-full"
                      src={imgLocIcon}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 items-start">
                    <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px] whitespace-nowrap">
                      {selectedLoc.name}
                    </p>
                    <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[11px] whitespace-nowrap">
                      {selectedLoc.sub}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 w-4 h-4 relative">
                  <img
                    alt=""
                    className="absolute inset-0 w-full h-full"
                    src={imgChevronDown}
                  />
                </div>
              </button>

              {/* Dropdown menu */}
              {locDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e7e5e4] rounded-xl shadow-lg z-10 overflow-hidden">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocId(loc.id)
                        setLocDropdownOpen(false)
                      }}
                      className={`flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-[#faf9f6] transition-colors
                        ${loc.id === selectedLocId ? "bg-[#ecfdf5]" : ""}`}
                    >
                      <div className="shrink-0 w-9 h-9 relative">
                        <img
                          alt=""
                          className="absolute inset-0 w-full h-full"
                          src={imgLocIcon}
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px]">
                          {loc.name}
                        </p>
                        <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[11px]">
                          {loc.sub}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Operational notice */}
          <div
            className="bg-white border border-[#e7e5e4] flex gap-3 items-center p-4 rounded-2xl w-full"
            data-node-id="6:87"
          >
            <div className="shrink-0 w-5 h-5 relative">
              <img
                alt=""
                className="absolute inset-0 w-full h-full"
                src={imgPickupClock}
              />
            </div>
            <p className="flex-1 min-w-0 font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px] leading-[1.5]">
              Order will be ready for pickup at {selectedLoc.counter}. Show your
              student ID or QR code at pickup.
            </p>
          </div>

          {/* Checkout confirm card */}
          <div
            className="bg-white border border-[#e7e5e4] flex flex-col gap-4 items-start p-6 rounded-2xl w-full"
            data-node-id="6:90"
          >
            {/* Total row */}
            <div className="flex items-center justify-between w-full font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] whitespace-nowrap">
              <p className="text-[16px]">Total Price</p>
              <p className="text-[22px]">₹{total}</p>
            </div>

            {/* Confirm CTA */}
            <button
              disabled={!canConfirm}
              onClick={() =>
                onConfirm(
                  selectedDay === "today" ? TODAY_DATE : TOMORROW_DATE,
                  selectedTime,
                  selectedLoc.name,
                  selectedLoc.code,
                )
              }
              className="bg-[#2563eb] flex h-[54px] items-center justify-between px-5 rounded-[27px] w-full hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white whitespace-nowrap"
              data-node-id="6:94"
            >
              <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[16px]">
                Confirm Order
              </span>
              <span className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[16px]">
                ₹{total}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Order Confirmed Screen ───────────────────────────────────────────────────
// Full-page centered card — no sidebar per Figma design (14:10)
function OrderConfirmedScreen({
  orderId,
  day,
  time,
  location,
  code,
  onGoToMenu,
  onTrack,
}: {
  orderId: string
  day: string
  time: string
  location: string
  code: string
  onGoToMenu: () => void
  onTrack: () => void
}) {
  return (
    <div
      className="bg-[#faf9f6] flex flex-col items-center justify-center px-10 py-16 flex-1 min-w-0 min-h-screen"
      data-node-id="14:10"
    >
      <div
        className="bg-white border border-[#e7e5e4] flex flex-col gap-8 items-center p-10 rounded-[24px] w-[540px] max-w-full"
        data-node-id="14:11"
      >
        {/* ── Success badge block ── */}
        <div
          className="flex flex-col gap-4 items-center pt-5"
          data-node-id="14:12"
        >
          {/* Outer ring */}
          <div
            className="bg-[#ecfdf5] flex items-center justify-center rounded-[40px] w-20 h-20"
            data-node-id="14:13"
          >
            {/* Inner blue circle */}
            <div
              className="bg-[#2563eb] flex items-center justify-center rounded-[28px] w-14 h-14"
              style={{ filter: "drop-shadow(0px 4px 6px rgba(37,99,235,0.2))" }}
              data-node-id="14:14"
            >
              <div className="relative shrink-0 w-6 h-6" data-node-id="14:15">
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full"
                  src={imgConfirmCheck}
                />
              </div>
            </div>
          </div>

          {/* Titles */}
          <div
            className="flex flex-col gap-1 items-center"
            data-node-id="14:17"
          >
            <p
              className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[22px] whitespace-nowrap"
              data-node-id="14:18"
            >
              Order Confirmed!
            </p>
            <p
              className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px] whitespace-nowrap"
              data-node-id="14:19"
            >
              Order receipt: #{orderId}
            </p>
          </div>
        </div>

        {/* ── Pickup summary card ── */}
        <div
          className="bg-[#faf9f6] border border-[#e7e5e4] flex flex-col gap-3 items-start p-4 rounded-[16px] w-full"
          data-node-id="14:20"
        >
          {/* Time row */}
          <div className="flex gap-3 items-center w-full" data-node-id="14:21">
            <div className="relative shrink-0 w-9 h-9" data-node-id="14:22">
              <img
                alt=""
                className="absolute inset-0 w-full h-full"
                src={imgPickupTimeIcon}
              />
            </div>
            <div
              className="flex flex-col gap-0.5 items-start"
              data-node-id="14:24"
            >
              <p
                className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[12px] whitespace-nowrap"
                data-node-id="14:25"
              >
                Estimated Pickup Time
              </p>
              <p
                className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[15px] whitespace-nowrap"
                data-node-id="14:26"
              >
                {day} at {time}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e7e5e4] w-full" data-node-id="14:27" />

          {/* Location row */}
          <div className="flex gap-3 items-center w-full" data-node-id="14:28">
            <div className="relative shrink-0 w-9 h-9" data-node-id="14:29">
              <img
                alt=""
                className="absolute inset-0 w-full h-full"
                src={imgPickupLocIcon}
              />
            </div>
            <div
              className="flex flex-col gap-0.5 items-start"
              data-node-id="14:31"
            >
              <p
                className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[12px] whitespace-nowrap"
                data-node-id="14:32"
              >
                Pickup Location
              </p>
              <p
                className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[15px] whitespace-nowrap"
                data-node-id="14:33"
              >
                {location}, {code}
              </p>
            </div>
          </div>
        </div>

        {/* ── QR code section ── */}
        <div
          className="bg-white border border-[#e7e5e4] flex flex-col gap-3 items-center p-5 rounded-[20px]"
          data-node-id="14:34"
        >
          <p
            className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[13px] whitespace-nowrap"
            data-node-id="14:35"
          >
            Scan QR at {location} Counter
          </p>
          {/* QR visual: white bg, 4px dark border, 8px radius, 6px inner padding, 140×140 */}
          <div
            className="bg-white border-4 border-[#1c1917] flex items-center justify-center p-[6px] rounded-[8px] w-[140px] h-[140px]"
            data-node-id="14:36"
          >
            <div
              className="relative shrink-0 w-[110px] h-[110px]"
              data-node-id="14:37"
            >
              <img
                alt="QR Code"
                className="absolute inset-0 w-full h-full"
                src={imgQrCode}
              />
            </div>
          </div>
          <p
            className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#a8a29e] text-[11px] whitespace-nowrap"
            data-node-id="14:39"
          >
            Do not share this code with others
          </p>
        </div>

        {/* ── Actions ── */}
        <div
          className="flex flex-col gap-3 items-start w-full"
          data-node-id="14:40"
        >
          {/* Track Live Progress */}
          <button
            onClick={onTrack}
            className="bg-[#2563eb] flex h-[50px] items-center justify-center rounded-[25px] w-full hover:bg-[#1d4ed8] transition-colors"
            data-node-id="14:41"
          >
            <span
              className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-white text-[15px] whitespace-nowrap"
              data-node-id="14:42"
            >
              Track Live Progress
            </span>
          </button>

          {/* Back to Menu */}
          <button
            onClick={onGoToMenu}
            className="flex h-10 items-center justify-center w-full"
            data-node-id="14:43"
          >
            <span
              className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[14px] underline decoration-solid whitespace-nowrap"
              data-node-id="14:44"
            >
              Back to Menu
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Order History Screen ─────────────────────────────────────────────────────
type OrderStatus = "Ready for Pickup" | "Picked Up" | "Preparing"

type HistoryItem = { name: string qty: number details: string price: number }
type HistoryOrder = {
  id: string
  date: string
  status: OrderStatus
  items: HistoryItem[]
  total: number
}

const MOCK_ORDERS: HistoryOrder[] = [
  {
    id: "QK-4821",
    date: "Today, 11:15 AM",
    status: "Ready for Pickup",
    items: [
      {
        name: "Chicken Biriyani",
        qty: 1,
        details: "Regular • Extra Chicken",
        price: 280,
      },
      {
        name: "Masala Chai",
        qty: 2,
        details: "Large • Ginger • Less Sugar",
        price: 100,
      },
    ],
    total: 380,
  },
  {
    id: "QK-4712",
    date: "Oct 21, 2026",
    status: "Picked Up",
    items: [
      { name: "Masala Dosa", qty: 1, details: "Butter topping", price: 180 },
      {
        name: "North Indian Thali",
        qty: 1,
        details: "Dal Makhani • Jeera Rice",
        price: 220,
      },
    ],
    total: 400,
  },
  {
    id: "QK-4609",
    date: "Oct 19, 2026",
    status: "Picked Up",
    items: [{ name: "Chole Bhature", qty: 2, details: "", price: 400 }],
    total: 400,
  },
]

function statusBadge(status: OrderStatus) {
  if (status === "Ready for Pickup")
    return (
      <span className="bg-[#dbeafe] font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1e40af] text-[12px] px-3 py-1.5 rounded-[8px] whitespace-nowrap">
        Ready for Pickup
      </span>
    )
  if (status === "Preparing")
    return (
      <span className="bg-[#ecfdf5] font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[12px] px-3 py-1.5 rounded-[8px] whitespace-nowrap">
        Preparing
      </span>
    )
  return (
    <span className="bg-[#d1fae5] font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#065f46] text-[12px] px-3 py-1.5 rounded-[8px] whitespace-nowrap">
      Picked Up
    </span>
  )
}

function OrderHistoryScreen({
  cart,
  orders,
  onGoToCart,
  onReorder,
}: {
  cart: CartItem[]
  orders: HistoryOrder[]
  onGoToCart: () => void
  onReorder: (order: HistoryOrder) => void
}) {
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)
  return (
    <div className="flex flex-col flex-1 min-w-0" data-node-id="25:9">
      {/* Header */}
      <div className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0">
        <div className="flex flex-col gap-1">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            Order History
          </p>
        </div>
        {cartCount > 0 && (
          <button
            onClick={onGoToCart}
            className="bg-[#ecfdf5] flex gap-2 items-center px-4 py-2 rounded-[20px] hover:bg-[#d1fae5] transition-colors"
          >
            <img alt="" className="w-[18px] h-[18px]" src={imgBag} />
            <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[13px] whitespace-nowrap">
              {cartCount} {cartCount === 1 ? "Item" : "Items"} in Bag
            </span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-10 flex-1 overflow-y-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-[#e7e5e4] flex flex-col gap-4 p-6 rounded-[16px]"
            data-node-id="25:41"
          >
            {/* Card header */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px]">
                  Order #{order.id}
                </p>
                <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px]">
                  Ordered on {order.date}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {statusBadge(order.status)}
                <button
                  onClick={() => onReorder(order)}
                  className="bg-[#2563eb] flex items-center px-4 py-2 rounded-[20px] hover:bg-[#1d4ed8] transition-colors"
                >
                  <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-white text-[13px] whitespace-nowrap">
                    Reorder
                  </span>
                </button>
              </div>
            </div>

            <div className="h-px bg-[#e7e5e4]" />

            {/* Items */}
            <div className="flex flex-col gap-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px]">
                      {item.name}{" "}
                      <span className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e]">
                        x {item.qty}
                      </span>
                    </p>
                    {item.details && (
                      <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[12px]">
                        {item.details}
                      </p>
                    )}
                  </div>
                  <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px] whitespace-nowrap ml-4">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-[#e7e5e4]" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
                Total Amount paid
              </p>
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[18px]">
                ₹{order.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Favorites Screen ─────────────────────────────────────────────────────────
const FAVORITE_IMAGES: Record<number, string> = {
  1: imgFavButterChicken,
  2: imgFavMasalaDosa,
  3: imgFavCholeBhature,
  4: imgFavNIThali,
  5: imgFavBiryani,
  8: imgFavChai,
}

function FavoritesScreen({
  cart,
  onAddToCart,
  onGoToCart,
  favoriteIds,
  onToggleFavorite,
  onOpenDetail,
}: {
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onGoToCart: () => void
  favoriteIds: Set<number>
  onToggleFavorite: (itemId: number) => void
  onOpenDetail: (item: MenuItem) => void
}) {
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)
  const favorites = ALL_ITEMS.filter((item) => favoriteIds.has(item.id))
  return (
    <div className="flex flex-col flex-1 min-w-0" data-node-id="25:114">
      {/* Header */}
      <div className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0">
        <div className="flex flex-col gap-1">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            My Favorites
          </p>
        </div>
        {cartCount > 0 && (
          <button
            onClick={onGoToCart}
            className="bg-[#ecfdf5] flex gap-2 items-center px-4 py-2 rounded-[20px] hover:bg-[#d1fae5] transition-colors"
          >
            <img alt="" className="w-[18px] h-[18px]" src={imgBag} />
            <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[13px] whitespace-nowrap">
              {cartCount} {cartCount === 1 ? "Item" : "Items"} in Bag
            </span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-10 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[18px]">
            Saved Dishes
          </p>
          {favorites.length === 0 ? (
            <div className="bg-white border border-dashed border-[#d6d3d1] rounded-[20px] px-8 py-14 flex flex-col items-center text-center gap-3">
              <div className="bg-red-50 text-red-400 flex items-center justify-center rounded-full w-12 h-12">
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-bold text-[#1c1917] text-[16px]">
                No saved dishes yet
              </p>
              <p className="text-[#68615e] text-[13px] max-w-[340px]">
                Tap the heart on any menu item to keep your favorites in one
                place.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              {favorites.map((menuItem) => {
                const image = FAVORITE_IMAGES[menuItem.id] ?? menuItem.image
                return (
                  <div
                    key={menuItem.id}
                    className="bg-white border border-[#e7e5e4] flex flex-col overflow-clip rounded-[16px] w-[250px] shrink-0"
                    data-node-id="25:149"
                  >
                    {/* Image */}
                    <div className="relative h-[160px] w-full shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(menuItem)}
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        aria-label={`View ${menuItem.name} details`}
                      >
                        <img
                          alt={menuItem.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          src={image}
                        />
                      </button>
                      {/* Heart overlay */}
                      <FavoriteButton
                        itemName={menuItem.name}
                        isFavorite
                        onToggle={() => onToggleFavorite(menuItem.id)}
                        className="absolute top-3 right-3 z-[1]"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-3 p-4">
                      <div className="flex flex-col gap-1.5">
                        <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px] truncate">
                          {menuItem.name}
                        </p>
                        <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px] line-clamp-2">
                          {menuItem.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px]">
                          ₹{menuItem.price}
                        </p>
                        <div className="bg-[#faf9f6] px-2 py-1 rounded-[6px]">
                          <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[11px]">
                            {menuItem.time}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(menuItem)}
                        className="bg-[#2563eb] flex items-center justify-center px-4 py-2.5 rounded-[20px] w-full hover:bg-[#1d4ed8] transition-colors"
                      >
                        <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-white text-[13px]">
                          Add to Cart
                        </span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Track Order Progress Screen ──────────────────────────────────────────────
function TrackOrderProgressScreen({
  cart,
  orderId,
  total,
  day,
  time,
  location,
  code,
  onGoToMenu,
  onGoToCart,
}: {
  cart: CartItem[]
  orderId: string
  total: number
  day: string
  time: string
  location: string
  code: string
  onGoToMenu: () => void
  onGoToCart: () => void
}) {
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  const steps = [
    { label: "Order Placed", sub: "11:15 AM", done: true, active: false },
    { label: "Preparing", sub: "In Progress", done: false, active: true },
    { label: "Ready for Pickup", sub: "Next step", done: false, active: false },
    { label: "Picked Up", sub: "Final Step", done: false, active: false },
  ]

  return (
    <div className="flex flex-col flex-1 min-w-0" data-node-id="25:246">
      {/* Header */}
      <div className="bg-white border-b border-[#e7e5e4] flex items-center justify-between px-10 py-6 shrink-0">
        <div className="flex flex-col gap-1">
          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
            Welcome back, <FirstName /> 👋
          </p>
          <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[24px]">
            Track Order Progress
          </p>
        </div>
        {cartCount > 0 && (
          <button
            onClick={onGoToCart}
            className="bg-[#ecfdf5] flex gap-2 items-center px-4 py-2 rounded-[20px] hover:bg-[#d1fae5] transition-colors"
          >
            <img alt="" className="w-[18px] h-[18px]" src={imgBag} />
            <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[13px] whitespace-nowrap">
              {cartCount} {cartCount === 1 ? "Item" : "Items"} in Bag
            </span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 p-10 flex-1 overflow-y-auto">
        {/* Live progress hero */}
        <div
          className="bg-white border border-[#e7e5e4] flex flex-col gap-6 p-7 rounded-[24px]"
          data-node-id="25:282"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[13px] tracking-[0.52px] uppercase">
                Live Order Tracker
              </p>
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[20px]">
                Preparing your delicious meal
              </p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px]">
                Estimated Ready Time
              </p>
              <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#2563eb] text-[18px] whitespace-nowrap">
                {day} at {time} (8 mins left)
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex flex-col gap-3">
            {/* Node + connector row */}
            <div className="flex items-center w-full">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center flex-1 last:flex-none"
                >
                  {step.done && (
                    <div className="bg-[#2563eb] flex items-center justify-center rounded-[14px] w-7 h-7 shrink-0">
                      <img alt="" className="w-3.5 h-3.5" src={imgTrackCheck} />
                    </div>
                  )}
                  {step.active && (
                    <div className="bg-[rgba(37,99,235,0.13)] flex items-center p-1 rounded-full shrink-0">
                      <img alt="" className="w-7 h-7" src={imgTrackPulse} />
                    </div>
                  )}
                  {!step.done && !step.active && (
                    <div className="bg-white border-2 border-[#e7e5e4] rounded-[14px] w-7 h-7 shrink-0" />
                  )}
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-0 ${
                        step.done ? "bg-[#2563eb]" : "bg-[#e7e5e4]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Labels */}
            <div className="flex items-start justify-between">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-1 w-[120px] ${
                    idx === 0
                      ? "items-start text-left"
                      : idx === steps.length - 1
                        ? "items-end text-right"
                        : "items-center text-center"
                  } ${
                    step.active
                      ? "text-[#2563eb]"
                      : step.done
                        ? "text-[#1c1917]"
                        : "text-[#a8a29e]"
                  }`}
                >
                  <p
                    className={`text-[14px] w-full ${
                      step.done
                        ? "font-['Inter:Bold',Inter,sans-serif] font-bold"
                        : step.active
                          ? "font-['Inter:Bold',Inter,sans-serif] font-bold"
                          : "font-['Inter:Medium',Inter,sans-serif] font-medium"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-[12px] w-full ${
                      step.active
                        ? "font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold"
                        : "font-['Inter:Regular',Inter,sans-serif] font-normal"
                    }`}
                  >
                    {step.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Split layout */}
        <div className="flex gap-8 items-start">
          {/* Left: order details card */}
          <div className="flex flex-col flex-1 min-w-0">
            <div
              className="bg-white border border-[#e7e5e4] flex flex-col gap-5 p-6 rounded-[20px]"
              data-node-id="25:323"
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[16px]">
                    Order #{orderId}
                  </p>
                  <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[13px]">
                    Today, 11:15 AM • Table / Counter Service
                  </p>
                </div>
                <span className="bg-[#ecfdf5] font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[12px] px-3 py-1.5 rounded-[8px]">
                  PREPARING
                </span>
              </div>

              <div className="h-px bg-[#e7e5e4]" />

              {/* Items */}
              <div className="flex flex-col gap-4">
                {cart.length > 0 ? (
                  cart.map((c) => {
                    const extraLabel =
                      c.extras.length > 0 ? ` • ${c.extras.join(" • ")}` : ""
                    return (
                      <div
                        key={c.item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px]">
                            {c.item.name}{" "}
                            <span className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e]">
                              x {c.qty}
                            </span>
                          </p>
                          <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[12px]">
                            {c.size}
                            {extraLabel}
                          </p>
                        </div>
                        <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#1c1917] text-[14px] whitespace-nowrap ml-4">
                          ₹{c.unitPrice * c.qty}
                        </p>
                      </div>
                    )
                  })
                ) : (
                  <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
                    No items in this order.
                  </p>
                )}
              </div>

              <div className="h-px bg-[#e7e5e4]" />

              {/* Location */}
              <div
                className="bg-[#faf9f6] flex gap-3 items-center p-3 rounded-[12px]"
                data-node-id="25:343"
              >
                <div className="bg-white border border-[#e7e5e4] flex items-center justify-center rounded-[8px] w-9 h-9 shrink-0">
                  <img alt="" className="w-[18px] h-[18px]" src={imgMapPin} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[12px]">
                    Pickup Location
                  </p>
                  <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[14px]">
                    {location || "Gazebo"}, {code || "C3"} Counter
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#e7e5e4]" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#68615e] text-[14px]">
                  Total Amount paid (Incl. Taxes)
                </p>
                <p className="font-['Inter:Bold',Inter,sans-serif] font-bold text-[#1c1917] text-[20px]">
                  ₹{total}
                </p>
              </div>
            </div>
          </div>

          {/* Right: QR card */}
          <div className="w-[360px] shrink-0">
            <div
              className="bg-white border border-[#e7e5e4] flex flex-col gap-5 items-center p-6 rounded-[20px]"
              data-node-id="25:355"
            >
              <p className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#68615e] text-[14px] text-center w-full">
                Scan QR at {location || "Gazebo"} Counter
              </p>
              <div className="bg-white border-4 border-[#1c1917] flex items-center justify-center p-1.5 rounded-[8px] w-[160px] h-[160px]">
                <img
                  alt="QR Code"
                  className="w-[130px] h-[110px]"
                  src={imgTrackQr}
                />
              </div>
              <p className="font-['Inter:Regular',Inter,sans-serif] font-normal text-[#a8a29e] text-[12px] text-center">
                Show this QR code to the counter executive to instantly verify
                and pick up your fresh order.
              </p>
              <div className="h-px bg-[#e7e5e4] w-full" />
              <button
                onClick={onGoToMenu}
                className="flex h-10 items-center justify-center w-full"
              >
                <span className="font-['Inter:Semi_Bold',Inter,sans-serif] font-semibold text-[#2563eb] text-[14px] underline">
                  Back to Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Menu Browse")
  const [screen, setScreenRaw] = useState<Screen>("menu")
  const [user, setUser] = useState<User | null>(null)
  const [history, setHistory] = useState<Screen[]>([])
  const setScreen = (next: Screen) => {
    if (next === screen) return
    setHistory((h) =>
      next === "menu" || next === "confirmed" ? [] : [...h, screen],
    )
    setScreenRaw(next)
  }
  const goBack = () => {
    const prev = history[history.length - 1]
    if (!prev) return goToMenu()
    setHistory((h) => h.slice(0, -1))
    setScreenRaw(prev)
    if (
      prev === "menu" ||
      prev === "detail" ||
      prev === "cart" ||
      prev === "pickup"
    )
      setActiveTab("Menu Browse")
    else if (prev === "orders") setActiveTab("Orders")
    else if (prev === "favorites") setActiveTab("Favorites")
  }
  const SCREEN_LABELS: Record<Screen, string> = {
    menu: "Menu",
    detail: "Item",
    cart: "Cart",
    pickup: "Pickup Time",
    confirmed: "Confirmation",
    orders: "Orders",
    favorites: "Favorites",
    tracking: "Tracking",
    profile: "Profile",
  }
  const backLabel = SCREEN_LABELS[history[history.length - 1] ?? "menu"]
  const logout = () => {
    setUser(null)
    setCart([])
    setHistory([])
    setScreenRaw("menu")
    setActiveTab("Menu Browse")
  }
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<HistoryOrder[]>(MOCK_ORDERS)
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(
    () => new Set(INITIAL_FAVORITE_IDS),
  )

  // Pickup / confirmed state
  const [confirmedDay, setConfirmedDay] = useState("")
  const [confirmedTime, setConfirmedTime] = useState("")
  const [confirmedLoc, setConfirmedLoc] = useState("")
  const [confirmedCode, setConfirmedCode] = useState("")
  const [confirmedOrderId, setConfirmedOrderId] = useState("QK-4821")

  // ── Navigation helpers ──
  const openDetail = (item: MenuItem) => {
    setSelectedItem(item)
    setScreen("detail")
  }
  const goToMenu = () => {
    setHistory([])
    setScreenRaw("menu")
    setSelectedItem(null)
    setActiveTab("Menu Browse")
  }
  const goToCart = () => setScreen("cart")
  const goToPickup = () => setScreen("pickup")

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab)
    if (tab === "Menu Browse") goToMenu()
    else if (tab === "Orders") setScreen("orders")
    else if (tab === "Favorites") setScreen("favorites")
  }

  const handleConfirm = (
    day: string,
    time: string,
    location: string,
    code: string,
  ) => {
    const nextOrderNumber =
      Math.max(...orders.map((order) => Number(order.id.replace("QK-", "")))) +
      1
    const orderId = `QK-${nextOrderNumber}`
    const orderedAt = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })
    const orderItems: HistoryItem[] = cart.map((cartItem) => {
      const extraLabels = cartItem.extras
        .map(
          (extraId) =>
            cartItem.item.extras.find((extra) => extra.id === extraId)?.label,
        )
        .filter((label): label is string => Boolean(label))
      return {
        name: cartItem.item.name,
        qty: cartItem.qty,
        details: [cartItem.size, ...extraLabels].join(" • "),
        price: cartItem.unitPrice * cartItem.qty,
      }
    })

    setConfirmedDay(day)
    setConfirmedTime(time)
    setConfirmedLoc(location)
    setConfirmedCode(code)
    setConfirmedOrderId(orderId)
    setOrders((previousOrders) => [
      {
        id: orderId,
        date: `Today, ${orderedAt}`,
        status: "Preparing",
        items: orderItems,
        total,
      },
      ...previousOrders,
    ])
    setScreen("confirmed")
  }

  // ── Cart helpers ──
  const addToCart = (
    item: MenuItem,
    qty: number,
    size: string,
    extras: string[],
    unitPrice: number,
  ) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id)
      if (existing)
        return prev.map((c) =>
          c.item.id === item.id
            ? { ...c, qty: c.qty + qty, unitPrice, size, extras }
            : c,
        )
      return [...prev, { item, qty, size, extras, unitPrice }]
    })
  }
  const quickAddToCart = (item: MenuItem) =>
    addToCart(item, 1, "Regular", [], item.price)
  const updateQty = (itemId: number, delta: number) =>
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === itemId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0),
    )
  const reorder = (order: HistoryOrder) => {
    order.items.forEach((h) => {
      const item = ALL_ITEMS.find((m) => m.name === h.name)
      if (!item) return
      const parts = h.details.split("•").map((d) => d.trim())
      const size = item.sizes.find((z) => parts.includes(z.label))?.label
      const extras = item.extras
        .filter((e) => parts.includes(e.label))
        .map((e) => e.id)
      addToCart(item, h.qty, size ?? "Regular", extras, h.price / h.qty)
    })
    setScreen("cart")
  }
  const removeFromCart = (itemId: number) =>
    setCart((prev) => prev.filter((c) => c.item.id !== itemId))
  const toggleFavorite = (itemId: number) =>
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    })

  // Derived totals (mirrors CartReviewScreen logic)
  const subtotal = cart.reduce((s, c) => s + c.unitPrice * c.qty, 0)
  const total = subtotal - Math.round(subtotal * 0.15)

  const renderScreen = () => {
    switch (screen) {
      case "cart":
        return (
          <CartReviewScreen
            cart={cart}
            onUpdateQty={updateQty}
            onRemoveFromCart={removeFromCart}
            onGoToMenu={goToMenu}
            onGoToCart={goToCart}
            onGoToPickup={goToPickup}
          />
        )
      case "pickup":
        return (
          <PickupTimeScreen
            total={total}
            cart={cart}
            onGoToCart={goToCart}
            onConfirm={handleConfirm}
          />
        )
      case "confirmed":
        return (
          <OrderConfirmedScreen
            orderId={confirmedOrderId}
            day={confirmedDay}
            time={confirmedTime}
            location={confirmedLoc}
            code={confirmedCode}
            onGoToMenu={() => {
              setCart([])
              goToMenu()
            }}
            onTrack={() => setScreen("tracking")}
          />
        )
      case "orders":
        return (
          <OrderHistoryScreen
            cart={cart}
            orders={orders}
            onGoToCart={goToCart}
            onReorder={reorder}
          />
        )
      case "favorites":
        return (
          <FavoritesScreen
            cart={cart}
            onAddToCart={quickAddToCart}
            onGoToCart={goToCart}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={openDetail}
          />
        )
      case "tracking":
        return (
          <TrackOrderProgressScreen
            cart={cart}
            orderId={confirmedOrderId}
            total={total}
            day={confirmedDay}
            time={confirmedTime}
            location={confirmedLoc}
            code={confirmedCode}
            onGoToMenu={() => {
              setCart([])
              goToMenu()
            }}
            onGoToCart={goToCart}
          />
        )
      case "profile":
        return (
          <ProfileScreen
            user={user!}
            orderCount={orders.length}
            onSave={setUser}
            onLogout={logout}
          />
        )
      case "detail":
        if (selectedItem)
          return (
            <FoodDetailScreen
              item={selectedItem}
              cart={cart}
              onAddToCart={addToCart}
              onBack={goBack}
              onGoToCart={goToCart}
              isFavorite={favoriteIds.has(selectedItem.id)}
              onToggleFavorite={() => toggleFavorite(selectedItem.id)}
            />
          )
        return null
      default:
        return (
          <MenuBrowseScreen
            cart={cart}
            onAddToCart={quickAddToCart}
            onUpdateQty={updateQty}
            onRemoveFromCart={removeFromCart}
            onOpenDetail={openDetail}
            onGoToCart={goToCart}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )
    }
  }

  if (!user) return <LoginScreen onLogin={setUser} />

  return (
    <UserContext.Provider value={user}>
      <div className="bg-[#faf9f6] flex min-h-screen w-full">
        {screen !== "confirmed" && (
          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onOpenProfile={() => setScreen("profile")}
            profileActive={screen === "profile"}
          />
        )}
        <div className="flex flex-col flex-1 min-w-0">
          {screen !== "menu" &&
            screen !== "detail" &&
            screen !== "confirmed" && (
              <div className="bg-[#faf9f6]/90 backdrop-blur border-b border-[#e7e5e4] px-10 py-3 shrink-0 sticky top-0 z-10">
                <button
                  onClick={goBack}
                  aria-label={`Back to ${backLabel}`}
                  className="group inline-flex items-center gap-2 h-9 pl-2 pr-4 rounded-full border border-[#e7e5e4] bg-white text-[#1c1917] text-[13px] font-semibold shadow-sm hover:border-[#2563eb] hover:text-[#2563eb] active:scale-95 transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="rounded-full bg-[#ecfdf5] p-1 text-[#2563eb] transition-transform group-hover:-translate-x-0.5"
                  >
                    <path
                      d="M12 5l-5 5 5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to {backLabel}
                </button>
              </div>
            )}
          {renderScreen()}
        </div>
      </div>
    </UserContext.Provider>
  )
}
