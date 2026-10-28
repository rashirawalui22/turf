export const productCategories = [
  "Sports shoes",
  "Footballs",
  "Cricket equipment",
  "Jerseys",
  "Training accessories",
];

export const products = [
  {
    id: "aero-sprint-shoe",
    name: "Aero Sprint Turf Shoe",
    category: "Sports shoes",
    price: 3499,
    compareAt: 4299,
    rating: 4.7,
    reviews: 86,
    onSale: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    description:
      "Lightweight turf shoe with a gum sole for artificial grass. Sample product — not available for real purchase.",
  },
  {
    id: "court-pro-white",
    name: "Court Pro Indoor Shoe",
    category: "Sports shoes",
    price: 2899,
    rating: 4.5,
    reviews: 54,
    onSale: false,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
    description: "Non-marking indoor shoe for badminton and squash. Sample catalogue item.",
  },
  {
    id: "match-ball-pro",
    name: "Match Ball Pro",
    category: "Footballs",
    price: 1299,
    rating: 4.8,
    reviews: 120,
    onSale: false,
    image:
      "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=1000&q=80",
    description: "Machine-stitched football suited to turf matches. Sample product.",
  },
  {
    id: "training-ball-pack",
    name: "Training Ball Twin Pack",
    category: "Footballs",
    price: 999,
    compareAt: 1299,
    rating: 4.4,
    reviews: 41,
    onSale: true,
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25c63d2?auto=format&fit=crop&w=1000&q=80",
    description: "Two training footballs for drills. Demo catalogue only.",
  },
  {
    id: "kashmir-willow-bat",
    name: "Range Willow Practice Bat",
    category: "Cricket equipment",
    price: 2199,
    rating: 4.6,
    reviews: 73,
    onSale: false,
    image:
      "https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=1000&q=80",
    description: "Practice bat for nets and box cricket. Fictional brand, sample listing.",
  },
  {
    id: "club-jersey-home",
    name: "Club Home Jersey",
    category: "Jerseys",
    price: 1499,
    rating: 4.3,
    reviews: 38,
    onSale: false,
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1000&q=80",
    description: "Breathable match jersey in forest green. Sample merchandise.",
  },
  {
    id: "away-kit-lime",
    name: "Away Kit Lime",
    category: "Jerseys",
    price: 1599,
    compareAt: 1899,
    rating: 4.5,
    reviews: 22,
    onSale: true,
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80",
    description: "High-visibility training jersey. Demo item only.",
  },
  {
    id: "agility-ladder",
    name: "Agility Ladder Set",
    category: "Training accessories",
    price: 799,
    rating: 4.2,
    reviews: 61,
    onSale: false,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
    description: "Speed ladder with carry pouch. Sample accessory.",
  },
  {
    id: "grip-cones",
    name: "Marker Cones (12 pack)",
    category: "Training accessories",
    price: 499,
    rating: 4.1,
    reviews: 33,
    onSale: false,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1000&q=80",
    description: "Flexible cones for passing drills. Sample product.",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
