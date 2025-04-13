import { CriadoresPage } from "@/components/criadores";

export type Ingredient = {
  name: string;
  amount: number;
};

export type Recipe = {
  name: string;
  amount: number;
  container: string;
  ingredients: Ingredient[];
  manual: string;
  category?: string;
};

const recipes: Recipe[] = [
  {
    manual: "Manual de Criação",
    name: "Poção Vermelha",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [{ name: "Erva Vermelha", amount: 1 }],
    category: "Poções Básicas",
  },
  {
    manual: "Manual de Criação",
    name: "Poção Amarela",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [{ name: "Erva Amarela", amount: 1 }],
    category: "Poções Básicas",
  },
  {
    manual: "Manual de Criação",
    name: "Poção Branca",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [{ name: "Erva Branca", amount: 1 }],
    category: "Poções Básicas",
  },
  {
    manual: "Manual de Criação",
    name: "Poção Azul",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Erva Azul", amount: 1 },
      { name: "Scell", amount: 1 },
    ],
    category: "Poções Básicas",
  },
  {
    manual: "Manual de Criação",
    name: "Analgésico",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Álcool", amount: 1 },
      { name: "Menta", amount: 1 },
    ],
    category: "Medicamentos",
  },
  {
    manual: "Manual de Criação",
    name: "Aloe Vera",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Mel", amount: 1 },
      { name: "Aloés", amount: 1 },
    ],
    category: "Medicamentos",
  },
  {
    manual: "Manual de Criação",
    name: "Embrião",
    amount: 1,
    container: "Orvalho de Yggdrasil",
    ingredients: [
      { name: "Semente da Vida", amount: 1 },
      { name: "Cápsula da Criação", amount: 1 },
    ],
    category: "Especiais",
  },
  {
    manual: "Manual de Álcool",
    name: "Álcool",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Garrafa Vazia", amount: 1 },
      { name: "Caule", amount: 5 },
      { name: "Esporo Venenoso", amount: 5 },
    ],
    category: "Materiais",
  },
  {
    manual: "Manual de Fogo Grego",
    name: "Frasco de Fogo Grego",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Tecido", amount: 1 },
      { name: "Álcool", amount: 1 },
    ],
    category: "Frascos",
  },
  {
    manual: "Manual de Ácidos",
    name: "Frasco de Ácido",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [{ name: "Coração Imortal", amount: 1 }],
    category: "Frascos",
  },
  {
    manual: "Manual de Plantas",
    name: "Frasco de Planta",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [{ name: "Flor de Planta Carnívora", amount: 2 }],
    category: "Frascos",
  },
  {
    manual: "Manual de Explosivos",
    name: "Frasco de Esfera Marinha",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Tendões", amount: 1 },
      { name: "Neurônio", amount: 1 },
    ],
    category: "Frascos",
  },
  {
    manual: "Manual de Revestimentos",
    name: "Frasco de Revestimento",
    amount: 1,
    container: "Garrafa Vazia",
    ingredients: [
      { name: "Coração de Sereia", amount: 1 },
      { name: "Presa de Zenorc", amount: 2 },
      { name: "Álcool", amount: 1 },
    ],
    category: "Frascos",
  },
  {
    manual: "Manual de Compactas",
    name: "Poção Vermelha Compacta",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Poção Vermelha", amount: 1 },
      { name: "Espinho de Cacto", amount: 2 },
    ],
    category: "Poções Compactas",
  },
  {
    manual: "Manual de Compactas",
    name: "Poção Amarela Compacta",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Poção Amarela", amount: 1 },
      { name: "Bigodes de Toupeira", amount: 1 },
    ],
    category: "Poções Compactas",
  },
  {
    manual: "Manual de Compactas",
    name: "Poção Branca Compacta",
    amount: 1,
    container: "Tubo de Ensaio",
    ingredients: [
      { name: "Poção Branca", amount: 1 },
      { name: "Areia Estelar de Bruxa", amount: 1 },
    ],
    category: "Poções Compactas",
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Água",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Azul", amount: 1 },
      { name: "Coração de Sereia", amount: 3 },
    ],
    category: "Anti-Poções",
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Vento",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Azul", amount: 3 },
      { name: "Pó de Traça", amount: 1 },
    ],
    category: "Anti-Poções",
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Terra",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Amarela", amount: 2 },
      { name: "Jellopy Tamanho Família", amount: 1 },
    ],
    category: "Anti-Poções",
  },
  {
    manual: "Manual de Anti-Poções",
    name: "Poção Anti-Fogo",
    amount: 1,
    container: "Garrafa de Poção",
    ingredients: [
      { name: "Gema Vermelha", amount: 2 },
      { name: "Brasão", amount: 1 },
    ],
    category: "Anti-Poções",
  },
];

const Criadores = () => {
  return (
    <CriadoresPage recipes={recipes} />
  );
};

export default Criadores;
