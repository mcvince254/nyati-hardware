export type Category =
  | "Building Materials"
  | "Paints"
  | "Plumbing"
  | "Electronics"
  | "Welding"
  | "Metal & Fabrication"
  | "Tools"
  | "Roofing"
  | "Cement & Sand"
  | "Water Tanks";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  badge?: "New" | "Best Seller";
}

export const categories: { name: Category; icon: string; description: string }[] = [
  { name: "Building Materials", icon: "🧱", description: "Blocks, bricks & blocks" },
  { name: "Paints", icon: "🎨", description: "Interior & exterior paints" },
  { name: "Plumbing", icon: "🚰", description: "Pipes, taps & fittings" },
  { name: "Electronics", icon: "💡", description: "Wires, switches & bulbs" },
  { name: "Welding", icon: "🔥", description: "Rods, masks & gear" },
  { name: "Metal & Fabrication", icon: "⚙️", description: "Steel, bars & sheets" },
  { name: "Tools", icon: "🛠️", description: "Hand & power tools" },
  { name: "Roofing", icon: "🏠", description: "Iron sheets & nails" },
  { name: "Cement & Sand", icon: "🪨", description: "Cement, sand & ballast" },
  { name: "Water Tanks", icon: "💧", description: "Tanks & water pipes" },
];

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  { id: "p1", name: "Simba Cement 50kg", price: 850, category: "Cement & Sand", description: "Premium high-strength cement, ideal for all construction needs.", image: img("photo-1518709268805-4e9042af2176"), badge: "Best Seller" },
  { id: "p2", name: "Iron Sheets Gauge 30", price: 1200, category: "Roofing", description: "Galvanized iron roofing sheets, durable and rust-resistant.", image: img("photo-1503387762-592deb58ef4e") },
  { id: "p3", name: "PVC Water Pipe 1\"", price: 450, category: "Plumbing", description: "High-pressure PVC pipe suitable for water supply systems.", image: img("photo-1581094794329-c8112a89af12") },
  { id: "p4", name: "Crown Paint 20L White", price: 4500, category: "Paints", description: "Premium emulsion paint with smooth matte finish.", image: img("photo-1562259949-e8e7689d7828"), badge: "New" },
  { id: "p5", name: "Welding Rods 2.5mm", price: 650, category: "Welding", description: "High-quality mild steel welding electrodes, pack of 5kg.", image: img("photo-1504917595217-d4dc5ebe6122") },
  { id: "p6", name: "Steel Bars Y12 12m", price: 1450, category: "Metal & Fabrication", description: "Deformed reinforcement bars for structural concrete.", image: img("photo-1565793298595-6a879b1d9492") },
  { id: "p7", name: "Cordless Drill 18V", price: 6500, category: "Tools", description: "Heavy-duty cordless drill with two batteries.", image: img("photo-1572981779307-38b8cabb2407"), badge: "Best Seller" },
  { id: "p8", name: "Plastic Water Tank 1000L", price: 12500, category: "Water Tanks", description: "UV-treated water storage tank, food-grade plastic.", image: img("photo-1583952050476-0a8fb04e0d09") },
  { id: "p9", name: "Electric Cable 2.5mm (100m)", price: 3800, category: "Electronics", description: "Copper electric cable for residential wiring.", image: img("photo-1620283085439-39620a1e21c4") },
  { id: "p10", name: "Building Blocks (per piece)", price: 35, category: "Building Materials", description: "Solid concrete blocks for walls and foundations.", image: img("photo-1504307651254-35680f356dfd") },
  { id: "p11", name: "Claw Hammer", price: 550, category: "Tools", description: "Forged steel claw hammer with grip handle.", image: img("photo-1426927308491-6380b6a9936f") },
  { id: "p12", name: "River Sand (per ton)", price: 1800, category: "Cement & Sand", description: "Clean river sand suitable for plastering and concrete.", image: img("photo-1605152276897-4f618f831968"), badge: "New" },
];
