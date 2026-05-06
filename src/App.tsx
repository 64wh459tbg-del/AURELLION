import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Menu, X, Instagram, Facebook, Mail, MapPin, Phone, ChevronRight, ArrowRight, Sparkles, Search, ShoppingBag, Plus, Minus, Trash2, CreditCard, Banknote, Clock, Truck, Store, Building, Heart } from 'lucide-react';

// --- Types ---
type Page = 'home' | 'brand' | 'collections' | 'signature' | 'contact' | 'product-detail' | 'register' | 'search' | 'checkout' | 'wishlist' | 'deliveries-returns' | 'size-guide' | 'jewelry-care' | 'legal' | 'privacy';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  gallery: string[];
  price: string;
  history: string;
  materials: string[];
  process: string;
  category?: string;
}

// --- Constants ---

const ALL_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "L'Or Sculpté", 
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 2 500€",
    history: "Une exploration des volumes et des textures, où l'or est travaillé comme une structure organique suspendue dans le temps.",
    materials: ["Or 24 carats recyclé", "Finition brossée satinée"],
    process: "Modelage à la main de structures complexes pour capturer la lumière sous tous les angles.",
    category: "Boucles d'oreilles"
  },
  { 
    id: 2, 
    name: "Perles de Rosée", 
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 4 200€",
    history: "L'élégance intemporelle de la perle, revisitée pour la femme moderne avec un minimalisme poétique.",
    materials: ["Perles de mer du Sud", "Or blanc 18 carats"],
    process: "Sélection rigoureuse de perles pour leur lustre exceptionnel et leur forme parfaite.",
    category: "Colliers"
  },
  { 
    id: 3, 
    name: "Lignes de Vie", 
    image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 1 800€",
    history: "Un équilibre parfait entre rigidité et fluidité, cette manchette épouse le poignet comme une seconde peau d'or.",
    materials: ["Or jaune 18 carats poli miroir"],
    process: "Forgeage haute précision pour une flexibilité structurelle unique.",
    category: "Bracelets"
  },
  { 
    id: 4, 
    name: "L'Héritage Gourmette", 
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 3 100€",
    history: "Un classique redéfini par des volumes audacieux et un éclat solaire incomparable.",
    materials: ["Or jaune 18 carats massif"],
    process: "Chaque maillon est assemblé et soudé à la main selon les techniques traditionnelles.",
    category: "Colliers"
  },
  { 
    id: 5, 
    name: "Reflet Solaire", 
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 3 500€",
    history: "Un anneau qui capture la chaleur du soleil, vibrant d'une énergie lumineuse.",
    materials: ["Or jaune 22 carats martelé"],
    process: "Martelage rythmé pour créer une texture de surface qui danse avec la lumière.",
    category: "Bagues"
  },
  { 
    id: 6, 
    name: "Émeraude Royale", 
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 5 800€",
    history: "La profondeur envoûtante d'un solitaire de terre, un joyau serti dans l'écrin du platine.",
    materials: ["Platine", "Émeraude de Colombie 3 carats"],
    process: "Taille haute performance pour exalter le 'jardin' intérieur de la pierre.",
    category: "Bagues"
  },
  { 
    id: 7, 
    name: "Améthyste Royale", 
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 2 100€",
    history: "Un cristal de noblesse, offrant une couleur pourpre intense et une pureté cristalline.",
    materials: ["Or blanc 18 carats", "Améthyste taille coussin"],
    process: "Sertissage à griffes discrètes pour laisser la pierre s'exprimer pleinement.",
    category: "Bagues"
  },
  { 
    id: 8, 
    name: "Éclat Infini", 
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 12 500€",
    history: "Une ligne de lumière pure qui enlace le cou, composée des diamants les plus rares.",
    materials: ["Or blanc 18 carats", "Diamants certifiés GIA"],
    process: "Justesse millimétrée du sertissage pour un confort au porter exceptionnel.",
    category: "Colliers"
  },
  { 
    id: 9, 
    name: "Jonc Moderniste", 
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 1 200€",
    history: "La pureté de l'argent dans une forme épurée et géométrique.",
    materials: ["Argent rhodié massif"],
    process: "Polissage manuel pour un fini miroir durable.",
    category: "Bracelets"
  },
  { 
    id: 10, 
    name: "Éclats suspendus", 
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 1 800€",
    history: "Un duo de lumière pour illuminer le visage, tout en finesse et en éclats.",
    materials: ["Or jaune 18 carats", "Micro-sertissage diamants"],
    process: "Artisanat d'exception pour une légèreté structurelle inégalée.",
    category: "Boucles d'oreilles"
  },
  { 
    id: 11, 
    name: "Maille d'Argent", 
    image: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800", 
    gallery: [
      "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    ],
    price: "À partir de 950€",
    history: "Une interprétation moderne de la maille classique, conjuguant force et finesse.",
    materials: ["Argent sterling 925", "Finition platine"],
    process: "Tissage de liens articulés pour une fluidité parfaite.",
    category: "Colliers"
  },
];

const SIGNATURE_PRODUCT: Product = {
  id: 100,
  name: "L'Auréole d'Éternité",
  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
  gallery: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
  ],
  price: "12 500€",
  history: "Une pièce d'exception conçue pour capturer l'essence de la lumière infinie. Cette manchette est le fruit de plus de 150 heures de travail artisanal.",
  materials: ["Or 24 carats recyclé", "Diamants de taille brillant", "Platine"],
  process: "La structure est forgée à la main pour obtenir une finesse extrême, puis chaque diamant est serti individuellement pour maximiser l'éclat."
};

const FEATURED_PRODUCT: Product = {
  id: 3,
  name: "Lignes de Vie",
  image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800",
  gallery: [
    "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800"
  ],
  price: "À partir de 1 800€",
  history: "Représente les chemins entrelacés de l'existence humaine, capturés dans le métal précieux.",
  materials: ["Or rose 18 carats", "Saphirs roses"],
  process: "Tissage de fils d'or ultra-fins pour créer une structure à la fois légère et indestructible."
};

// --- Components ---

const BackButton = ({ onClick, light = false }: { onClick: () => void, light?: boolean }) => (
  <motion.button 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={onClick}
    className={`flex items-center space-x-2 transition-colors mb-8 group ${light ? 'text-white/70 hover:text-white' : 'text-luxury-brown/50 hover:text-gold'}`}
  >
    <ArrowRight size={16} className={`rotate-180 group-hover:-translate-x-1 transition-transform ${light ? 'text-white/70' : ''}`} />
    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Retour</span>
  </motion.button>
);

const NAVBAR_ITEMS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Accueil' },
  { id: 'brand', label: 'La Marque' },
  { id: 'collections', label: 'Collections' },
  { id: 'signature', label: 'Pièce Signature' },
  { id: 'contact', label: 'Contact' },
  { id: 'register', label: 'Compte' },
];

const Navbar = ({ currentPage, setPage, cartCount, wishlistCount, onOpenCart, onOpenWishlist, user, onLogout }: { 
  currentPage: Page, 
  setPage: (p: Page) => void, 
  cartCount: number, 
  wishlistCount: number,
  onOpenCart: () => void,
  onOpenWishlist: () => void,
  user: { firstName: string } | null,
  onLogout: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'brand', label: 'La Marque' },
    { id: 'collections', label: 'Collections' },
    { id: 'signature', label: 'Pièce Signature' },
    { id: 'contact', label: 'Contact' },
    { id: 'register', label: user ? 'Mon Compte' : 'Compte' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center space-x-3 text-gold hover:opacity-70 transition-opacity group"
        >
          <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-serif tracking-[0.2em] uppercase font-semibold">Aurelion</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`text-xs uppercase tracking-widest font-medium transition-colors hover:text-gold ${
                currentPage === item.id ? 'text-gold border-b-2 border-gold' : 'text-luxury-brown/70'
              }`}
            >
              {item.label}
            </button>
          ))}
          {user && (
            <button 
              onClick={onLogout}
              className="text-[9px] uppercase tracking-widest text-luxury-brown/40 hover:text-red-500 transition-colors border-l border-gold/20 pl-4"
            >
              Déconnexion
            </button>
          )}
          <div className="flex items-center space-x-6 pl-4">
            <button 
              onClick={() => setPage('search')}
              className={`text-luxury-brown/70 hover:text-gold transition-colors ${
                currentPage === 'search' ? 'text-gold' : ''
              }`}
            >
              <Search size={18} />
            </button>
            <button 
              onClick={onOpenWishlist}
              className="relative text-luxury-brown/70 hover:text-gold transition-colors"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={onOpenCart}
              className="relative text-luxury-brown/70 hover:text-gold transition-colors"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tablet/Mobile Toggle & Priority Contact */}
        <div className="flex xl:hidden items-center space-x-6">
          <button 
            onClick={() => setPage('search')}
            className="text-luxury-brown hover:text-gold transition-colors"
          >
            <Search size={22} />
          </button>
          <button 
            onClick={onOpenWishlist}
            className="relative text-luxury-brown hover:text-gold transition-colors"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold" style={{ zIndex: 1 }}>
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenCart}
            className="relative text-luxury-brown hover:text-gold transition-colors"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-luxury-brown" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-beige border-b border-gold/10 p-8 xl:hidden flex flex-col space-y-6"
          >
            {NAVBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsOpen(false);
                }}
                className={`text-sm uppercase tracking-widest font-medium text-left ${
                  currentPage === item.id ? 'text-gold' : 'text-luxury-brown'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="bg-white/50 border-t border-gold/10 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="text-xl font-serif tracking-widest uppercase">Aurelion</h3>
          <p className="text-sm text-luxury-brown/60 leading-relaxed italic">
            "Là où le corps devient œuvre d'art"
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/elise_aurelion/" target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-70 transition-opacity">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/aurelion_paris" target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-70 transition-opacity">
              <Facebook size={20} />
            </a>
            <button onClick={() => setPage('contact')} className="text-gold hover:opacity-70 transition-opacity">
              <Mail size={20} />
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Navigation</h4>
          <ul className="space-y-3 text-sm text-luxury-brown/70">
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('collections')}>Collections</li>
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('brand')}>La Marque</li>
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('register')}>Compte</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Service Client</h4>
          <ul className="space-y-3 text-sm text-luxury-brown/70">
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('deliveries-returns')}>Livraison & Retours</li>
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('size-guide')}>Guide des Tailles</li>
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('jewelry-care')}>Entretien des Bijoux</li>
            <li className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('contact')}>Contact</li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Newsletter</h4>
          <p className="text-[11px] text-luxury-brown/60 mb-6 leading-relaxed uppercase tracking-wider">Restez informé de nos créations exclusives.</p>
          <form onSubmit={handleNewsletterSubmit} className="relative group">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={status === 'success' ? 'Merci !' : 'votre@email.com'} 
              className={`w-full bg-transparent border-b py-2 pr-10 outline-none transition-all text-sm placeholder:text-luxury-brown/20 italic font-serif ${
                status === 'success' ? 'border-green-500/50' : status === 'error' ? 'border-red-500/50' : 'border-gold/20 focus:border-gold'
              }`}
              disabled={isSubmitting}
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`absolute right-0 top-1/2 -translate-y-1/2 text-gold group-hover:translate-x-1 transition-transform ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? <Clock size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            </button>
          </form>
          {status === 'error' && <p className="text-[9px] text-red-500 mt-2 uppercase tracking-tighter">Une erreur est survenue.</p>}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-luxury-brown/40">
        <p>© 2026 Aurelion Maison de Bijoux. Tous droits réservés.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('legal')}>Mentions Légales</span>
          <span className="hover:text-gold cursor-pointer transition-colors" onClick={() => setPage('privacy')}>Confidentialité</span>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = ({ setPage, onProductClick, onAddToCart, onToggleWishlist, wishlist, user }: { 
  setPage: (p: Page) => void, 
  onProductClick: (p: Product) => void, 
  onAddToCart: (p: Product) => void,
  onToggleWishlist: (p: Product) => void,
  wishlist: Product[],
  user: { firstName: string } | null
}) => (
  <div className="flex flex-col w-full">
    {/* Welcome Banner for Logged In Users */}
    {user && (
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        className="bg-gold/5 border-b border-gold/10 py-3 px-6 text-center"
      >
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
          Ravi de vous revoir, <span className="italic">{user.firstName}</span>. Votre collection vous attend.
        </p>
      </motion.div>
    )}
    {/* Hero Section */}
    <div className="relative h-screen w-full overflow-hidden shrink-0">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1920" 
          alt="Aurelion Jewelry Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="relative mb-4">
            <Sparkles className="text-gold w-12 h-12 animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-gold/30 rounded-full" />
          </div>
          <div className="text-white font-serif text-4xl tracking-[0.2em] uppercase">
            Aurelion
          </div>
          <div className="w-12 h-[1px] bg-gold mt-2" />
        </motion.div>

        <motion.span 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs uppercase tracking-[0.5em] text-white/80 mb-6"
        >
          Maison de Haute Joaillerie
        </motion.span>
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl md:text-4xl text-white font-serif mb-8 leading-tight"
        >
          Là où le corps devient <br /> <span className="italic text-gold-light text-xl md:text-3xl">œuvre d'art</span>
        </motion.h1>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => setPage('collections')}
          className="group relative px-10 py-4 border-2 border-gold text-white uppercase text-[10px] tracking-[0.3em] overflow-hidden transition-all hover:border-gold-light gold-glow"
        >
          <span className="relative z-10">Découvrir les Collections</span>
          <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-12 bg-white/30 animate-pulse" />
      </motion.div>



    </div>

    {/* Featured Collections Grid */}
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-24">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif mb-6">Collections Phares</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-luxury-brown/50 uppercase tracking-[0.3em] text-xs">L'essence de la joaillerie contemporaine</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {ALL_PRODUCTS.slice(0, 3).map((item, idx) => {
          const isLiked = wishlist.some(w => w.id === item.id);
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              onClick={() => onProductClick(item)}
              className="group cursor-pointer text-center relative"
            >
              <div className="aspect-[3/4] overflow-hidden gold-border mb-8 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item);
                    }}
                    className={`p-4 rounded-full shadow-2xl hover:scale-110 transition-all ${
                      isLiked ? 'bg-gold text-white' : 'bg-white text-gold'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="bg-white text-gold p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2 group-hover:text-gold transition-colors">{item.name}</h3>
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold italic">{item.price}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-24 text-center">
        <button 
          onClick={() => setPage('collections')}
          className="px-12 py-5 border border-gold text-gold uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-gold hover:text-white transition-all gold-glow"
        >
          Explorer le Catalogue
        </button>
      </div>
    </section>

    {/* Brand Statement Section */}
    <section className="bg-beige py-32 px-6 md:px-12 border-y border-gold/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 translate-x-1/2" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="md:w-1/2 space-y-10"
        >
          <div className="space-y-4">
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">La Vision Auréolienne</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Le Savoir-Faire <br /> Transcendant</h2>
          </div>
          <p className="text-luxury-brown/70 leading-relaxed text-lg font-serif italic">
            "Chaque création est une odyssée artisanale, où l'or est sculpté pour capturer l'éternité. Nous ne créons pas seulement des bijoux, nous forgeons des talismans pour l'âme moderne."
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
               onClick={() => setPage('brand')} 
               className="flex items-center space-x-4 text-gold group py-2"
            >
              <span className="uppercase tracking-[0.3em] text-[10px] font-bold">L'histoire de la Maison</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
               onClick={() => setPage('contact')} 
               className="flex items-center space-x-4 text-gold group py-2"
            >
              <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Visiter l'Atelier</span>
              <MapPin size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="md:w-1/2 relative"
        >
          <div className="aspect-[4/5] gold-border p-4 bg-white relative z-10 shadow-2xl">
            <img 
               src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
               alt="Aurelion Workshop" 
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-luxury-brown p-10 text-white hidden xl:block shadow-2xl z-20">
            <Sparkles className="text-gold mb-4 w-8 h-8" />
            <p className="font-serif italic text-2xl max-w-[200px]">"Le bijou est la ponctuation de l'élégance."</p>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);


const BrandPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<null | number>(null);

  const timelinePoints = [
    { 
      year: '2012', 
      image: "https://images.unsplash.com/photo-1531938716357-224c16b5ace3?auto=format&fit=crop&q=80&w=800",
      event: "Naissance du Brutalisme Précieux. Elise Aurelion fonde la Maison dans un atelier secret du Marais.",
      details: "Après des années d'études en architecture, Elise Aurelion décide de transposer les principes du brutalisme — l'honnêteté des matériaux, la force des structures — à l'échelle du bijou. Dans son premier atelier du Marais, elle sculpte des pièces massives, refusant les ornementations superflues pour célébrer la rudesse noble du métal précieux.",
      gallery: [
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1573408339305-6497fba30501?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      year: '2015', 
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
      event: "L'Héritage d'Exception. Présentation de 'Lignes de Vie' à la Fashion Week de Milan.",
      details: "Marquant l'entrée de la Maison sur la scène internationale, la collection 'Lignes de Vie' stupéfie par son utilisation audacieuse de l'or brossé et ses textures rappelant l'écorce terrestre. Milan devient le témoin d'une nouvelle ère où le bijou n'est plus un accessoire, mais une extension sculpturale de l'identité.",
      gallery: [
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      year: '2019', 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      event: "L'Atelier-Vaisseau. Inauguration d'un espace de création manifeste à Paris.",
      details: "Conçu comme une œuvre d'art totale, l'Atelier-Vaisseau est le cœur battant de la Maison. C'est ici que fusionnent les technologies de pointe et les gestes ancestraux. Les imprimantes 3D haute résolution côtoient les enclumes séculaires, permettant une liberté de forme jusqu'alors jugée impossible.",
      gallery: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      year: '2024', 
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
      event: "Résonance Mondiale. Ouverture des galeries à Tokyo et New York.",
      details: "L'art d'Aurelion traverse les océans. Les ouvertures simultanées à Tokyo et New York marquent la consécration du 'Brutalisme Précieux' comme un langage universel. Chaque galerie est pensée pour refléter l'âme de la Maison tout en s'imprégnant de la culture locale, créant un dialogue global entre matière et environnement.",
      gallery: [
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=600"
      ]
    }
  ];

  const craftSteps = [
    { title: "L'Épure", desc: "Tout commence par un trait architectural, une recherche d'équilibre entre le plein et le vide." },
    { title: "La Forge", desc: "Le métal est dompté par la flamme, sculpté avec une intensité qui confère à chaque pièce son caractère unique." },
    { title: "L'Âme", desc: "Le sertissage des pierres et le polissage final révèlent la lumière intérieure de l'œuvre." }
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <AnimatePresence mode="wait">
        {selectedMilestone === null ? (
          <motion.div
            key="main-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BackButton onClick={onBack} />
            
            {/* Hero Section - History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6 block">Notre Héritage</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">L'Odyssée <br /><span className="italic text-luxury-brown/40">du Métal</span></h2>
                <div className="space-y-8 text-luxury-brown/80 leading-relaxed font-serif text-lg italic">
                  <p>
                    Tout a commencé dans un appartement discret du Marais, à Paris, en 2012. Là où d'autres voyaient des bijoux comme de simples ornements, nous y voyions des manifestes. La Maison Aurelion est née de l'envie de briser les codes de la joaillerie traditionnelle, trop souvent figée dans le temps.
                  </p>
                  <p>
                    Au fil des années, Aurelion a évolué pour devenir un phare de l'innovation. En fusionnant les techniques de fonte à la cire perdue du XVIIIe siècle avec la modélisation architecturale 3D, nous avons créé un langage visuel unique : le "Brutalisme Précieux". Chaque pièce raconte le passage du temps et la permanence de l'esprit.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden gold-border-heavy">
                  <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200" 
                    alt="Atelier Aurelion - Le Savoir-Faire" 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-12 -right-12 bg-luxury-brown p-10 text-white hidden md:block gold-glow z-20 max-w-xs">
                  <p className="text-4xl font-serif mb-2 italic">12 Ans</p>
                  <p className="text-[10px] uppercase tracking-widest text-gold">De recherche sur la lumière et la forme</p>
                </div>
              </motion.div>
            </div>

            {/* Timeline Section */}
            <div className="mb-48 relative px-4">
              <div className="flex flex-col items-center mb-24">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Chronologie</span>
                <h3 className="text-4xl font-serif italic text-luxury-brown">Les Étapes du Temps</h3>
                <p className="text-gold text-[10px] uppercase tracking-widest mt-4 opacity-70">Cliquer sur une étape pour explorer</p>
              </div>
              <div className="relative">
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/20" />
                <div className="space-y-48 lg:space-y-32">
                  {timelinePoints.map((point, i) => (
                    <motion.div 
                      key={point.year}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-0 cursor-pointer group`}
                      onClick={() => setSelectedMilestone(i)}
                    >
                      {/* Content Side */}
                      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end lg:pr-20 text-center lg:text-right">
                        {i % 2 === 0 ? (
                          <div className="space-y-6">
                            <span className="text-6xl font-serif text-gold/20 block transition-colors group-hover:text-gold/40">{point.year}</span>
                            <div className="aspect-video w-full max-w-md gold-border overflow-hidden mb-6 mx-auto lg:ml-auto lg:mr-0 relative">
                               <img src={point.image} alt={point.year} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                               <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold">Découvrir</span>
                               </div>
                            </div>
                            <p className="text-luxury-brown/70 font-serif italic max-w-sm leading-relaxed text-lg transition-colors group-hover:text-luxury-brown">{point.event}</p>
                          </div>
                        ) : <div className="hidden lg:block" />}
                      </div>
                      
                      {/* Center Node */}
                      <div className="relative w-12 h-12 flex items-center justify-center hidden lg:flex">
                        <div className="w-4 h-4 bg-gold rounded-full gold-glow z-10 transition-transform group-hover:scale-150" />
                        <div className="absolute h-px w-20 bg-gold/20 -z-10" />
                      </div>

                      {/* Opposite Side */}
                      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:pl-20 text-center lg:text-left">
                        {i % 2 !== 0 ? (
                          <div className="space-y-6">
                            <span className="text-6xl font-serif text-gold/20 block transition-colors group-hover:text-gold/40">{point.year}</span>
                            <div className="aspect-video w-full max-w-md gold-border overflow-hidden mb-6 mx-auto lg:mr-auto lg:ml-0 relative">
                               <img src={point.image} alt={point.year} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                               <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold">Découvrir</span>
                               </div>
                            </div>
                            <p className="text-luxury-brown/70 font-serif italic max-w-sm leading-relaxed text-lg transition-colors group-hover:text-luxury-brown">{point.event}</p>
                          </div>
                        ) : <div className="hidden lg:block" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="mb-48 py-24 border-y border-gold/10">
              <div className="text-center mb-24">
                <h3 className="text-4xl font-serif italic mb-4">Nos Piliers</h3>
                <div className="w-24 h-px bg-gold mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
                {[
                  {
                    title: "Excellence Artisanale",
                    desc: "Nous ne tolérons aucune approximation. Chaque serti, chaque polissage est réalisé à la main dans nos ateliers parisiens par des maîtres joailliers dédiés.",
                    icon: <Sparkles size={32} />
                  },
                  {
                    title: "Éthique Radicale",
                    desc: "100% de notre or est recyclé. Nos pierres sont sourcées via des canaux certifiés garantissant des conditions de travail dignes et un impact environnemental réduit.",
                    icon: <Building size={32} />
                  },
                  {
                    title: "Innovation Formelle",
                    desc: "Nous explorons les limites du portable. Nos bijoux sont conçus pour être des extensions organiques du corps, défiant la gravité et les conventions.",
                    icon: <ArrowRight size={32} />
                  }
                ].map((value, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="text-center group"
                  >
                    <div className="mb-8 flex justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-serif mb-4 italic">{value.title}</h4>
                    <p className="text-luxury-brown/60 text-sm leading-relaxed tracking-wide">
                      {value.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Workshop Photo Section */}
            <div className="mb-48">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden gold-border-heavy aspect-21/9"
              >
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000" 
                  alt="L'Atelier Aurelion - Immersion" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block">L'Atelier</span>
                    <h3 className="text-4xl md:text-6xl font-serif italic drop-shadow-lg">Là où la matière devient poésie</h3>
                  </div>
                </div>
              </motion.div>
              <div className="mt-12 text-center max-w-2xl mx-auto">
                <p className="text-luxury-brown/60 font-serif italic leading-relaxed">
                  Travailler à l'établi requiert une patience infinie. Dans notre atelier du 3ème arrondissement, le silence n'est rompu que par le chant des limes et le souffle du chalumeau. C'est ici que l'âme de la Maison prend vie.
                </p>
              </div>
            </div>

            {/* Process Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48">
              <div className="order-2 lg:order-1 space-y-16">
                {craftSteps.map((step, idx) => (
                  <motion.div 
                    key={step.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-8"
                  >
                      <span className="text-5xl font-serif text-gold/20 italic">0{idx + 1}</span>
                      <div>
                        <h5 className="text-xl font-serif italic mb-2">{step.title}</h5>
                        <p className="text-luxury-brown/60 font-serif text-sm italic italic leading-relaxed">{step.desc}</p>
                      </div>
                  </motion.div>
                ))}
              </div>
              <div className="relative">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="aspect-[4/5] gold-border overflow-hidden bg-luxury-brown/5 shadow-2xl"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200" 
                      alt="Le Geste de la Création"
                      className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-8 -left-8 w-48 h-48 gold-border-heavy overflow-hidden hidden md:block"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1588795904427-f20387ba4782?auto=format&fit=crop&q=80&w=600" 
                      alt="Détail de la Forge"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
            </div>

            {/* Creator Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="aspect-square overflow-hidden gold-border-heavy bg-beige/50">
                  <img 
                    src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=1000" 
                    alt="Elise Aurelion - Fondatrice" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 space-y-10"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-gold font-bold block">La Visionnaire</span>
                <h2 className="text-5xl font-serif italic mb-8">Elise Aurelion</h2>
                <div className="space-y-6 text-luxury-brown/80 leading-relaxed font-serif text-lg italic">
                  <p>
                    "Le bijou est le dernier rempart de l'intimité. C'est l'objet qui touche la peau avant le monde."
                  </p>
                  <p>
                    Architecte de formation, Elise Aurelion a troqué le béton pour l'or massif après avoir compris que l'échelle monumentale ne permettait pas la même connexion émotionnelle que l'échelle du corps. 
                  </p>
                  <p>
                    Son approche sculpturale a redéfini ce que signifie porter un bijou aujourd'hui. Nommée Créatrice de l'Année à plusieurs reprises, elle continue de diriger chaque collection avec une exigence qui confine au sacré.
                  </p>
                </div>
                <div className="pt-8 flex items-center space-x-6">
                  <a 
                    href="https://www.instagram.com/elise_aurelion/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full gold-border flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all transform hover:scale-110"
                  >
                    <Instagram size={20} />
                  </a>
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold">@elise_aurelion</p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Quote */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-48 text-center"
            >
              <div className="w-px h-24 bg-gold mx-auto mb-12" />
              <p className="text-3xl font-serif italic text-luxury-brown/50 max-w-4xl mx-auto leading-relaxed">
                "Nous ne sommes pas là pour suivre les tendances, mais pour créer les reliques du futur."
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="milestone-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="pt-12 relative"
          >
            <div className="absolute top-0 right-0 -mr-24 -mt-24 pointer-events-none opacity-5 hidden xl:block">
               <span className="text-[30rem] font-serif italic text-gold leading-none">{timelinePoints[selectedMilestone].year}</span>
            </div>

            <BackButton onClick={() => setSelectedMilestone(null)} />
            
            <div className="mt-20 relative z-10">
              <div className="flex flex-col xl:flex-row gap-24 items-start">
                 <div className="w-full xl:w-2/5 space-y-12">
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold block">{timelinePoints[selectedMilestone].year} — ARCHIVES</span>
                      <h2 className="text-5xl md:text-7xl font-serif italic leading-[1.1] text-luxury-brown">
                        {timelinePoints[selectedMilestone].event}
                      </h2>
                    </div>
                    
                    <div className="space-y-12">
                      <div className="w-24 h-px bg-gold/30" />
                      <div className="space-y-8 text-luxury-brown/70 font-serif text-xl italic leading-relaxed text-justify">
                        <p className="first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:text-gold first-letter:font-serif first-letter:italic first-letter:leading-none pt-2">
                           {timelinePoints[selectedMilestone].details}
                        </p>
                      </div>
                    </div>
                 </div>
                 
                 <div className="w-full xl:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                   {timelinePoints[selectedMilestone].gallery.map((img, idx) => (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 40 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 + idx * 0.2, duration: 1 }}
                       className="aspect-[3/4] gold-border-heavy overflow-hidden shadow-2xl relative group"
                     >
                       <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" />
                       <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </motion.div>
                   ))}
                   <div className="md:col-span-1 flex items-center justify-center border border-dashed border-gold/20 p-12 text-center aspect-[3/4]">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-gold/30 font-bold">Documentaire Maison d'Aurelion <br />Archives Protégées</p>
                   </div>
                 </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-48 pt-24 border-t border-gold/10 text-center"
            >
               <button 
                onClick={() => setSelectedMilestone(null)}
                className="group flex flex-col items-center mx-auto space-y-6"
               >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold group-hover:tracking-[0.6em] transition-all">Retour au récit principal</span>
                  <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all transform group-hover:translate-y-[-5px]">
                     <ArrowRight className="rotate-180" size={24} />
                  </div>
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CollectionsPage = ({ onProductClick, onAddToCart, onToggleWishlist, wishlist, onBack }: { 
  onProductClick: (p: Product) => void, 
  onAddToCart: (p: Product) => void,
  onToggleWishlist: (p: Product) => void,
  wishlist: Product[],
  onBack: () => void 
}) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <BackButton onClick={onBack} />
      <div className="text-center mb-20">
        <h2 className="text-5xl font-serif mb-4">Les Collections</h2>
        <p className="text-luxury-brown/50 uppercase tracking-widest text-[10px]">Explorer l'univers Aurelion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ALL_PRODUCTS.map((item, idx) => {
          const isLiked = wishlist.some(w => w.id === item.id);
          return (
            <motion.div 
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => onProductClick(item)}
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 relative gold-border group-hover:border-gold transition-all duration-500">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item);
                    }}
                    className={`p-4 rounded-full shadow-xl hover:scale-110 transition-all ${
                      isLiked ? 'bg-gold text-white' : 'bg-white text-gold'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="bg-white text-gold p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif mb-1 group-hover:text-gold transition-colors">{item.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{item.price}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SignaturePage = ({ onProductClick, onAddToCart, onToggleWishlist, wishlist, onBack }: { 
  onProductClick: (p: Product) => void, 
  onAddToCart: (p: Product) => void,
  onToggleWishlist: (p: Product) => void,
  wishlist: Product[],
  onBack: () => void 
}) => {
  const isLiked = wishlist.some(w => w.id === FEATURED_PRODUCT.id);
  return (
    <div className="pt-20">
      <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute top-32 left-12 z-20">
        <BackButton onClick={onBack} />
      </div>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=1920" 
          alt="Signature Piece Background" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-40"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">Pièce Signature</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight text-gold-gradient">L'Auréole <br /> <span className="italic">d'Éternité</span></h2>
          <p className="text-luxury-brown/70 leading-relaxed mb-8 max-w-md">
            Une prouesse technique et artistique. Façonnée dans un or 24 carats recyclé, cette manchette sculpturale semble flotter autour du poignet, capturant la lumière sous chaque angle.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => onProductClick(SIGNATURE_PRODUCT)}
              className="px-8 py-4 border border-gold text-gold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all"
            >
              Découvrir son histoire
            </button>
            <button 
              onClick={() => onAddToCart(SIGNATURE_PRODUCT)}
              className="gold-gradient text-white px-8 py-4 text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity gold-glow flex items-center space-x-2"
            >
              <ShoppingBag size={14} />
              <span>Ajouter au panier</span>
            </button>
            <button 
              onClick={() => onToggleWishlist(SIGNATURE_PRODUCT)}
              className={`px-8 py-4 border ${wishlist.some(w => w.id === SIGNATURE_PRODUCT.id) ? 'bg-gold border-gold text-white' : 'border-gold text-gold'} uppercase text-[10px] tracking-widest hover:bg-gold hover:text-white transition-all flex items-center space-x-2`}
            >
              <Heart size={14} fill={wishlist.some(w => w.id === SIGNATURE_PRODUCT.id) ? "currentColor" : "none"} />
              <span>{wishlist.some(w => w.id === SIGNATURE_PRODUCT.id) ? 'Favori' : 'Aimer'}</span>
            </button>
            <span className="text-gold font-serif text-2xl">{SIGNATURE_PRODUCT.price}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative cursor-pointer group"
          onClick={() => onProductClick(SIGNATURE_PRODUCT)}
        >
          <div className="aspect-square rounded-full border border-gold/20 p-8 animate-[spin_20s_linear_infinite] group-hover:border-gold transition-colors">
            <div className="w-full h-full rounded-full border border-gold/40" />
          </div>
          <img 
            src={SIGNATURE_PRODUCT.image} 
            alt="Signature Piece" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 object-cover rounded-sm shadow-2xl transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  </div>
  );
};
const ContactPage = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Rendez-vous à la boutique Paris',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Attempt to send via API first
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      
      if (response.ok) {
        console.log('Successfully subscribed contact email via API');
      }
    } catch (err) {
      console.error('Contact subscription API error:', err);
    }

    const mailtoUrl = `mailto:Emilia.bmaniongui@gmail.com?subject=${encodeURIComponent(`Demande Aurelion: ${formData.subject}`)}&body=${encodeURIComponent(
      `Nom: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Sujet: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoUrl;
    setSubmitted(true);
    
    // Reset after some time
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <BackButton onClick={onBack} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-5xl font-serif mb-8">Nous Contacter</h2>
          <p className="text-luxury-brown/70 leading-relaxed mb-12">
            Pour toute demande de personnalisation, de rendez-vous privé ou d'information complémentaire, notre équipe dédiée est à votre entière disposition.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=24+Place+Vendôme+75001+Paris+France" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
              >
                <MapPin size={20} />
              </a>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-1">Boutique Signature</h4>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=24+Place+Vendôme+75001+Paris+France" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-luxury-brown/60 hover:text-gold transition-colors"
                >
                  24 Place Vendôme, 75001 Paris, France
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <a href="tel:+33145678900" className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
                <Phone size={20} />
              </a>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-1">Téléphone</h4>
                <a href="tel:+33145678900" className="text-sm text-luxury-brown/60 hover:text-gold transition-colors">+33 (0)1 45 67 89 00</a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
              >
                <Mail size={20} />
              </button>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-1">Email</h4>
                <button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-luxury-brown/60 hover:text-gold transition-colors text-left"
                >
                  Emilia.bmaniongui@gmail.com
                </button>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          id="contact-form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-12 shadow-2xl border border-gold/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-serif mb-2">Conciergerie Aurelion</h3>
            <p className="text-[10px] text-gold font-medium uppercase tracking-[0.2em] mb-10 pb-4 border-b border-gold/10 inline-block">Service de rendez-vous privilégié</p>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-xl font-serif">Demande transmise</h4>
                <p className="text-sm text-luxury-brown/60">Votre client mail a été ouvert pour finaliser l'envoi. <br /> Nous reviendrons vers vous dans les plus brefs délais.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] uppercase tracking-widest font-bold text-gold hover:opacity-70 transition-opacity pt-8"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Prénom</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Jean"
                      className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Nom</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Dupont"
                      className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Email de contact</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Nature de la demande</label>
                  <div className="relative">
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                    >
                      <option value="Rendez-vous à la boutique Paris">Rendez-vous à la boutique Paris</option>
                      <option value="Conseil en joaillerie personnalisée">Conseil en joaillerie personnalisée</option>
                      <option value="Entretien d'une pièce d'exception">Entretien d'une pièce d'exception</option>
                      <option value="Autre demande prestigieuse">Autre demande prestigieuse</option>
                    </select>
                    <ChevronRight size={14} className="absolute right-0 top-3 rotate-90 text-gold pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Votre message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3} 
                    placeholder="Comment pouvons-nous vous accompagner ?"
                    className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all resize-none placeholder:text-luxury-brown/20" 
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-5 gold-gradient text-white uppercase text-[10px] tracking-[0.4em] font-bold gold-glow hover:translate-y-[-2px] hover:shadow-xl transition-all active:translate-y-[0px]"
                >
                  Solliciter un rendez-vous
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Deliveries & Returns Page Component ---
const DeliveriesReturnsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BackButton onClick={onBack} />
        
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h1 className="text-5xl font-serif mb-8 italic uppercase tracking-widest text-luxury-brown">Expéditions & Retours</h1>
          <div className="w-24 h-px bg-gold mx-auto mb-12" />
          <p className="text-luxury-brown/70 leading-relaxed font-serif italic text-lg max-w-2xl mx-auto">
            "Chaque création Aurelion voyage avec le plus grand soin, protégée par l'excellence de notre savoir-faire logistique."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          {/* Shipping Methods */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 text-gold group">
              <div className="p-3 bg-gold/5 rounded-full group-hover:bg-gold/10 transition-colors">
                <Truck size={24} />
              </div>
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown">Modes de Livraison</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Standard France", detail: "Livraison offerte (48h-72h) via transporteur sécurisé.", price: "Gratuit" },
                { title: "Express 24h", detail: "Pour toute commande passée avant 12h. Option premium.", price: "25€" },
                { title: "International Express", detail: "DHL Express sécurisé (3 à 5 jours ouvrés).", price: "Sur devis" }
              ].map((item, index) => (
                <div key={index} className="p-6 border border-gold/10 bg-beige/10 hover:bg-beige/20 transition-all rounded-sm group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-luxury-brown">{item.title}</h3>
                    <span className="text-gold font-serif italic text-xs">{item.price}</span>
                  </div>
                  <p className="text-luxury-brown/60 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Packing & Experience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 text-gold group">
              <div className="p-3 bg-gold/5 rounded-full group-hover:bg-gold/10 transition-colors">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown">L'Art de l'Écrin</h2>
            </div>

            <div className="space-y-6">
              <div className="gold-border overflow-hidden bg-white/5 aspect-square mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" 
                  alt="Aurelion Luxury Jewelry Ecrin" 
                  className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 text-luxury-brown/70 leading-relaxed text-sm">
                <p>
                  Toutes nos pièces sont présentées dans leur écrin certifié, niché au cœur d'un coffret scellé à la cire, gage de discrétion et de sécurité absolue.
                </p>
                <ul className="space-y-3 italic">
                  <li className="flex items-start space-x-3">
                    <Sparkles size={14} className="text-gold mt-1 flex-shrink-0" />
                    <span>Certificat d'Authenticité et de Garantie à vie inclus.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Sparkles size={14} className="text-gold mt-1 flex-shrink-0" />
                    <span>Option "Message Personnalisé" manuscrit sur papier vergé.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Sparkles size={14} className="text-gold mt-1 flex-shrink-0" />
                    <span>Kit de soin signature offert pour chaque création.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Returns & Refund */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 text-gold group">
              <div className="p-3 bg-gold/5 rounded-full group-hover:bg-gold/10 transition-colors">
                <Clock size={24} />
              </div>
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown">Retours & Échanges</h2>
            </div>

            <div className="space-y-6">
              <div className="p-6 border border-gold/20 bg-luxury-brown text-beige rounded-sm">
                <h3 className="font-serif italic text-lg mb-4">Garantie 30 Jours</h3>
                <p className="text-beige/70 text-sm leading-relaxed mb-6">
                  Si votre création ne vous donne pas entière satisfaction, vous disposez de 30 jours pour nous la retourner gratuitement.
                </p>
                
                <div className="space-y-4">
                  {[
                    { step: "01", text: "Contactez notre conciergerie pour votre bon de retour." },
                    { step: "02", text: "Replacez le bijou intact dans son écrin d'origine." },
                    { step: "03", text: "Déposez votre colis assuré auprès du transporteur." }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center space-x-4 text-xs font-serif italic text-beige/50">
                      <span className="text-gold font-bold font-sans not-italic">{s.step}</span>
                      <span>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-luxury-brown/70 leading-relaxed text-xs italic">
                <p>
                  * Les pièces personnalisées, gravées ou sur-mesure ne peuvent faire l'objet d'un retour ou d'un échange.
                </p>
                <p>
                  * Le remboursement est effectué sous 7 jours après réception et expertise de la pièce.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Banner */}
        <div className="p-12 border border-gold/10 bg-beige/5 text-center space-y-6">
          <h3 className="text-2xl font-serif italic text-luxury-brown">Assistance aux Expéditions</h3>
          <p className="text-luxury-brown/60 max-w-xl mx-auto text-sm leading-relaxed">
            Notre conciergerie est à votre entière disposition pour le suivi de votre commande ou pour organiser un retour en mains propres dans l'une de nos boutiques.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 pt-4">
            <a href="tel:+33123456789" className="flex items-center space-x-2 text-luxury-brown hover:text-gold transition-colors text-sm uppercase tracking-widest font-bold border-b border-gold/20 pb-1">
              <Phone size={16} />
              <span>01 23 45 67 89</span>
            </a>
            <a href="mailto:conciergerie@aurelion.fr" className="flex items-center space-x-2 text-luxury-brown hover:text-gold transition-colors text-sm uppercase tracking-widest font-bold border-b border-gold/20 pb-1">
              <Mail size={16} />
              <span>conciergerie@aurelion.fr</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Size Guide Page Component ---
const SizeGuidePage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <BackButton onClick={onBack} />
      
      <div className="max-w-3xl mx-auto text-center mb-24">
        <h1 className="text-5xl font-serif mb-8 italic uppercase tracking-widest">Guide des Tailles</h1>
        <div className="w-24 h-px bg-gold mx-auto mb-12" />
        <p className="text-luxury-brown/70 leading-relaxed font-serif italic text-lg">
          "La perfection d'Aurelion réside dans le détail. Trouvez la mesure qui sublimera votre geste."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-serif italic border-b border-gold/20 pb-4">Bagues & Alliances</h2>
            <p className="text-luxury-brown/70 leading-relaxed">
              Pour mesurer votre tour de doigt, utilisez un ruban à mesurer souple ou une ficelle que vous mesurerez ensuite avec une règle. La circonférence en millimètres correspond à la taille Aurelion.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold font-bold uppercase tracking-widest text-[10px]">
                    <th className="py-4 px-2">Circonférence (mm)</th>
                    <th className="py-4 px-2">Taille Aurelion</th>
                    <th className="py-4 px-2">Taille US</th>
                  </tr>
                </thead>
                <tbody className="text-luxury-brown/80">
                  <tr className="border-b border-gold/10">
                    <td className="py-4 px-2">48 mm</td>
                    <td className="py-4 px-2">48</td>
                    <td className="py-4 px-2">4 ½</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-4 px-2">50 mm</td>
                    <td className="py-4 px-2">50</td>
                    <td className="py-4 px-2">5 ¼</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-4 px-2">52 mm</td>
                    <td className="py-4 px-2">52</td>
                    <td className="py-4 px-2">6</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-4 px-2">54 mm</td>
                    <td className="py-4 px-2">54</td>
                    <td className="py-4 px-2">6 ¾</td>
                  </tr>
                  <tr className="border-b border-gold/10">
                    <td className="py-4 px-2">56 mm</td>
                    <td className="py-4 px-2">56</td>
                    <td className="py-4 px-2">7 ½</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-serif italic border-b border-gold/20 pb-4">Bracelets</h2>
            <p className="text-luxury-brown/70 leading-relaxed">
              Nous recommandons d'ajouter 1 à 2 cm à la mesure de votre poignet pour un confort optimal, selon le tombé souhaité.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gold/10">
                <span className="font-bold tracking-widest text-[10px] uppercase">Petit (S)</span>
                <span className="text-luxury-brown/70 italic">15 - 16 cm</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gold/10">
                <span className="font-bold tracking-widest text-[10px] uppercase">Moyen (M)</span>
                <span className="text-luxury-brown/70 italic">17 - 18 cm</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gold/10">
                <span className="font-bold tracking-widest text-[10px] uppercase">Large (L)</span>
                <span className="text-luxury-brown/70 italic">19 - 20 cm</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8">
            <h2 className="text-2xl font-serif italic border-b border-gold/20 pb-4">Colliers</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="font-bold tracking-widest text-[10px] uppercase block">Choker</span>
                <span className="text-luxury-brown/70 text-sm italic">35 - 40 cm</span>
              </div>
              <div className="space-y-2">
                <span className="font-bold tracking-widest text-[10px] uppercase block">Princesse</span>
                <span className="text-luxury-brown/70 text-sm italic">45 cm</span>
              </div>
              <div className="space-y-2">
                <span className="font-bold tracking-widest text-[10px] uppercase block">Matinée</span>
                <span className="text-luxury-brown/70 text-sm italic">50 - 60 cm</span>
              </div>
              <div className="space-y-2">
                <span className="font-bold tracking-widest text-[10px] uppercase block">Opéra</span>
                <span className="text-luxury-brown/70 text-sm italic">70 - 90 cm</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-12 border border-gold/10 bg-luxury-brown/5 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h3 className="text-xl font-serif italic">Besoin d'un baguier gratuit ?</h3>
          <p className="text-luxury-brown/70 max-w-md">
            Recevez notre baguier physique par courrier sous 3 jours pour une mesure d'une précision absolue.
          </p>
        </div>
        <button className="px-10 py-4 bg-gold text-white uppercase text-[10px] tracking-widest hover:bg-luxury-brown transition-colors">
          Demander mon baguier
        </button>
      </div>
    </div>
  );
};

// --- Jewelry Care Page Component ---
const JewelryCarePage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <BackButton onClick={onBack} />
      
      <div className="max-w-3xl mx-auto text-center mb-24">
        <h1 className="text-5xl font-serif mb-8 italic uppercase tracking-widest">Entretien des Bijoux</h1>
        <div className="w-24 h-px bg-gold mx-auto mb-12" />
        <p className="text-luxury-brown/70 leading-relaxed font-serif italic text-lg">
          "Préservez l'éclat éternel de vos créations Aurelion à travers les âges."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        {[
          {
            title: "L'Or & Le Platine",
            icon: <Sparkles size={32} />,
            tips: [
              "Nettoyez avec une brosse souple et de l'eau tiède savonneuse.",
              "Rincez abondamment et séchez avec un chiffon doux.",
              "Évitez le contact avec le chlore et les produits chimiques."
            ]
          },
          {
            title: "Les Diamants",
            icon: <Heart size={32} />,
            tips: [
              "Utilisez un dégraissant doux pour maintenir leur brillance.",
              "Faites vérifier les griffes de sertissage une fois par an.",
              "Rangez-les individuellement pour éviter les rayures."
            ]
          },
          {
            title: "Les Perles",
            icon: <Clock size={32} />,
            tips: [
              "Essuyez-les après chaque port avec un chiffon humide.",
              "Évitez les parfums et sprays directement sur les perles.",
              "Rangez-les à plat dans un écrin tapissé de soie."
            ]
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-10 border border-gold/10 bg-white shadow-sm flex flex-col items-center text-center space-y-6"
          >
            <div className="text-gold">{item.icon}</div>
            <h2 className="text-lg uppercase tracking-widest font-bold">{item.title}</h2>
            <ul className="space-y-4 text-sm text-luxury-brown/70 italic leading-relaxed text-left">
              {item.tips.map((tip, j) => (
                <li key={j} className="flex items-start space-x-2">
                  <span className="text-gold mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center bg-beige/30 p-12 rounded-sm border border-gold/5">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif italic">Rituels de Préservation</h2>
          <div className="space-y-6 text-luxury-brown/80 leading-relaxed font-serif text-lg italic">
            <p>
              "Un bijou Aurelion est un héritage. Son entretien régulier garantit que son histoire sera racontée avec le même éclat par les générations à venir."
            </p>
          </div>
          <ul className="space-y-4 text-luxury-brown/70">
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Retirez vos bijoux avant le sport ou le coucher.</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Attendez 10 minutes après vous être parfumé.</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Rangez les pièces séparément dans leurs écrins d'origine.</span>
            </li>
          </ul>
        </div>
        <div className="space-y-8 border-l border-gold/10 pl-0 lg:pl-12">
          <div className="p-8 bg-luxury-brown text-beige space-y-6">
            <h3 className="text-xl font-serif">Aurelion Conciergerie</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Nous offrons un service gracieux de nettoyage aux ultrasons et de vérification des sertissages pour toutes nos créations, à vie.
            </p>
            <button className="w-full py-4 border border-beige/30 text-beige uppercase text-[10px] tracking-widest hover:bg-beige hover:text-luxury-brown transition-all">
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Legal Page Component ---
const LegalPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BackButton onClick={onBack} />
        
        <div className="max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl font-serif mb-8 italic uppercase tracking-widest text-center text-luxury-brown">Mentions Légales</h1>
          <div className="w-24 h-px bg-gold mx-auto mb-12" />
          
          <div className="space-y-12 text-luxury-brown/70 leading-relaxed font-serif">
            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">1. Éditeur du Site</h2>
              <p>
                Le présent site est édité par la Maison Aurelion Joaillerie, Société par Actions Simplifiée au capital de 500 000 €, dont le siège social est situé au 12 Place Vendôme, 75001 Paris, France.
              </p>
              <p>
                Immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">2. Responsable de la Publication</h2>
              <p>Le directeur de la publication est Monsieur Aurélien de la Roche, en sa qualité de Président Fondateur.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">3. Hébergement</h2>
              <p>
                Le site est hébergé par une infrastructure sécurisée dédiée à la haute joaillerie.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">4. Propriété Intellectuelle</h2>
              <p>
                L'ensemble du contenu (textes, images, designs, logos) est la propriété exclusive de la Maison Aurelion. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Privacy Page Component ---
const PrivacyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BackButton onClick={onBack} />
        
        <div className="max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl font-serif mb-8 italic uppercase tracking-widest text-center text-luxury-brown">Confidentialité</h1>
          <div className="w-24 h-px bg-gold mx-auto mb-12" />
          
          <div className="space-y-12 text-luxury-brown/70 leading-relaxed font-serif">
            <section className="space-y-4">
              <h3 className="text-2xl italic text-luxury-brown">Notre Engagement</h3>
              <p>
                La protection de vos données est au cœur de la relation de confiance que nous tissons avec nos clients. Aurelion s'engage à traiter vos informations avec la plus grande discrétion et sécurité.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">Collecte de Données</h2>
              <p>
                Nous collectons uniquement les informations nécessaires au traitement de vos commandes et à la personnalisation de votre expérience (nom, adresse, email).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">Utilisation des Informations</h2>
              <p>
                Vos données ne sont jamais partagées avec des tiers à des fins commerciales sans votre consentement explicite. Elles sont stockées sur des serveurs hautement sécurisés.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-brown not-italic">Vos Droits</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour toute demande, contactez notre Délégué à la Protection des Données à l'adresse confidentialite@aurelion.fr.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const normalize = (str: string) => 
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const ProductSearchCard: React.FC<{ 
  item: Product, 
  onClick: () => void, 
  onAddToCart: (p: Product) => void,
  onToggleWishlist: (p: Product) => void,
  isLiked: boolean
}> = ({ item, onClick, onAddToCart, onToggleWishlist, isLiked }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="aspect-[4/5] overflow-hidden mb-4 gold-border group-hover:border-gold transition-all relative">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item);
          }}
          className={`p-3 rounded-full shadow-xl hover:scale-110 transition-all ${
            isLiked ? 'bg-gold text-white' : 'bg-white text-gold'
          }`}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="bg-white text-gold p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
    </div>
    <h4 className="font-serif italic group-hover:text-gold transition-colors">{item.name}</h4>
    <p className="text-[10px] uppercase tracking-widest text-gold mt-1">{item.price}</p>
  </motion.div>
);

const SearchPage = ({ setPage, onProductClick, onAddToCart, onToggleWishlist, wishlist, onBack }: { 
  setPage: (p: Page) => void, 
  onProductClick: (p: Product) => void, 
  onAddToCart: (p: Product) => void,
  onToggleWishlist: (p: Product) => void,
  wishlist: Product[],
  onBack: () => void
}) => {
  const [query, setQuery] = useState('');

  const results = React.useMemo(() => {
    const searchStr = normalize(query);
    if (!searchStr) return { products: [] };

    const filteredProducts = ALL_PRODUCTS.filter(p => {
      const name = normalize(p.name);
      const hist = normalize(p.history);
      const cat = p.category ? normalize(p.category) : '';
      const mats = p.materials.map(normalize).join(' ');
      
      return name.includes(searchStr) || 
             hist.includes(searchStr) || 
             cat.includes(searchStr) || 
             mats.includes(searchStr);
    }).sort((a, b) => {
      const aName = normalize(a.name);
      const bName = normalize(b.name);
      
      // Exact match
      if (aName === searchStr) return -1;
      if (bName === searchStr) return 1;
      
      // Starts with
      const aStarts = aName.startsWith(searchStr) ? 1 : 0;
      const bStarts = bName.startsWith(searchStr) ? 1 : 0;
      if (aStarts !== bStarts) return bStarts - aStarts;
      
      // Contains name
      const aInc = aName.includes(searchStr) ? 1 : 0;
      const bInc = bName.includes(searchStr) ? 1 : 0;
      if (aInc !== bInc) return bInc - aInc;
      
      return aName.localeCompare(bName);
    });

    return { products: filteredProducts };
  }, [query]);

  return (
    <div className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
      <BackButton onClick={onBack} />
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-serif mb-8 text-center uppercase tracking-widest">Recherche</h2>
        <div className="relative">
          <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold/50" />
          <input 
            type="text" 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une collection..."
            className="w-full bg-transparent border-b-2 border-gold/20 py-4 pl-10 text-xl md:text-2xl outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20 italic font-serif"
          />
        </div>
      </div>

      {(results.products.length > 0) ? (
        <div className="space-y-24">
          {results.products.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-12 flex items-center">
                <span className="w-8 h-[1px] bg-gold mr-4" />
                Pièces & Collections ({results.products.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {results.products.map((item) => (
                  <ProductSearchCard 
                    key={item.id} 
                    item={item} 
                    onClick={() => onProductClick(item)} 
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isLiked={wishlist.some(w => w.id === item.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : query.trim().length > 0 ? (
        <div className="text-center py-20">
          <p className="text-luxury-brown/50 italic font-serif text-lg">Aucun résultat trouvé pour "{query}"</p>
        </div>
      ) : (
        <div className="space-y-24">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-12 flex items-center">
              <span className="w-8 h-[1px] bg-gold mr-4" />
              Les plus populaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ALL_PRODUCTS.slice(0, 4).map((item) => (
                <ProductSearchCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => onProductClick(item)} 
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isLiked={wishlist.some(w => w.id === item.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-12 flex items-center">
              <span className="w-8 h-[1px] bg-gold mr-4" />
              Notre sélection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ALL_PRODUCTS.slice(4, 8).map((item) => (
                <ProductSearchCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => onProductClick(item)} 
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isLiked={wishlist.some(w => w.id === item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RegisterPage = ({ setPage, onBack, user, setUser }: { 
  setPage: (p: Page) => void, 
  onBack: () => void,
  user: { firstName: string, lastName: string, email: string } | null,
  setUser: (u: { firstName: string, lastName: string, email: string } | null) => void
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      if (!isLogin) {
        try {
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email }),
          });
        } catch (err) {
          console.warn('API subscription warning:', err);
        }

        const newUser = { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email 
        };
        
        const users = JSON.parse(localStorage.getItem('aurelion_users_db') || '[]');
        users.push({ ...newUser, password: formData.password });
        localStorage.setItem('aurelion_users_db', JSON.stringify(users));
        
        setUser(newUser);
        setStatus('success');
      } else {
        const users = JSON.parse(localStorage.getItem('aurelion_users_db') || '[]');
        const found = users.find((u: any) => u.email === formData.email && u.password === formData.password);
        
        if (found) {
          setUser({ firstName: found.firstName, lastName: found.lastName, email: found.email });
          setPage('home');
        } else {
          setStatus('error');
        }
      }
    } catch (error) {
      console.error('Registration/Login error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center min-h-[60vh]">
        <div className="max-w-md w-full mb-8">
          <BackButton onClick={onBack} />
        </div>
        <div className="text-center space-y-8 max-w-md w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center text-gold mx-auto mb-8 border border-gold/10"
          >
            <Sparkles size={40} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif italic">Bienvenue, {user.firstName}</h2>
            <p className="text-[10px] text-gold font-medium uppercase tracking-[0.2em]">Votre espace exclusif</p>
          </div>

          <div className="p-10 bg-white shadow-2xl border border-gold/10 text-left space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Identité</p>
                <p className="text-luxury-brown font-serif italic text-xl">{user.firstName} {user.lastName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Adresse Mail</p>
                <p className="text-luxury-brown/60 text-sm italic">{user.email}</p>
              </div>
            </div>

            <div className="pt-8 space-y-4 relative z-10 border-t border-gold/10">
              <button className="w-full py-4 border border-gold/20 text-gold uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-gold/5 transition-all">
                Mes Commandes Privées
              </button>
              <button className="w-full py-4 border border-transparent text-luxury-brown/40 uppercase text-[10px] tracking-[0.4em] font-bold hover:text-luxury-brown transition-all">
                Gérer mes Adresses
              </button>
              <div className="pt-6">
                <button 
                  onClick={() => setUser(null)}
                  className="w-full py-4 text-red-500/50 uppercase text-[9px] tracking-[0.4em] font-bold hover:text-red-500 transition-all"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex justify-center flex-col items-center">
      <div className="max-w-md w-full mb-8">
        <BackButton onClick={onBack} />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 shadow-2xl border border-gold/10 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl font-serif mb-2">{isLogin ? 'Connexion' : 'Rejoindre Aurelion'}</h2>
          <p className="text-[10px] text-gold font-medium uppercase tracking-[0.2em]">Cercle des collectionneurs</p>
        </div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-4"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="font-serif italic text-xl">Bienvenue au Cercle</h3>
            <p className="text-sm text-luxury-brown/60 italic">Votre compte a été créé avec succès.</p>
            <button 
              onClick={() => setPage('home')}
              className="text-[10px] uppercase tracking-widest font-bold text-gold hover:opacity-70 transition-opacity pt-8"
            >
              Retour à l'accueil
            </button>
          </motion.div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Prénom</label>
                  <input 
                    type="text" 
                    placeholder="Jean"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Nom</label>
                  <input 
                    type="text" 
                    placeholder="Dupont"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
                className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40">Mot de passe</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-gold/20 py-2 outline-none focus:border-gold transition-all placeholder:text-luxury-brown/20" 
              />
            </div>

            {status === 'error' && <p className="text-[10px] text-red-500 uppercase tracking-tighter">{isLogin ? 'Échec de connexion' : 'Erreur d\'inscription'}</p>}

            <button 
              disabled={isSubmitting}
              className={`w-full py-4 gold-gradient text-white uppercase text-[10px] tracking-[0.4em] font-bold gold-glow hover:translate-y-[-2px] transition-all mt-4 ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? <Clock size={16} className="animate-spin mx-auto" /> : (isLogin ? 'Se connecter' : "S'inscrire")}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setStatus('idle');
            }}
            className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/40 hover:text-gold transition-colors"
          >
            {isLogin ? "Pas encore membre ? S'inscrire" : "Déjà membre ? Se connecter"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ProductDetailPage = ({ product, setPage, onAddToCart, onToggleWishlist, isLiked, onBack }: { 
  product: Product, 
  setPage: (p: Page) => void, 
  onAddToCart: (p: Product) => void, 
  onToggleWishlist: (p: Product) => void,
  isLiked: boolean,
  onBack: () => void 
}) => (
  <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
    <BackButton onClick={onBack} />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="gold-border overflow-hidden"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full aspect-[4/5] object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="space-y-12"
      >
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-5xl md:text-7xl font-serif mb-4">{product.name}</h1>
            <button 
              onClick={() => onToggleWishlist(product)}
              className={`p-4 rounded-full shadow-lg hover:scale-110 transition-all ${
                isLiked ? 'bg-gold text-white' : 'bg-white text-gold'
              }`}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
          <p className="text-gold font-serif text-2xl">{product.price}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-serif border-b border-gold/20 pb-2">L'Histoire</h3>
          <p className="text-luxury-brown/80 leading-relaxed italic">
            "{product.history}"
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-serif border-b border-gold/20 pb-2">Matières Précieuses</h3>
          <ul className="grid grid-cols-2 gap-4">
            {product.materials.map((material, i) => (
              <li key={i} className="flex items-center space-x-3 text-sm text-luxury-brown/70">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>{material}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-serif border-b border-gold/20 pb-2">Processus de Création</h3>
          <p className="text-sm text-luxury-brown/70 leading-relaxed">
            {product.process}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-grow py-5 gold-gradient text-white uppercase text-xs tracking-[0.3em] font-bold gold-glow hover:opacity-90 transition-opacity flex items-center justify-center space-x-3"
          >
            <ShoppingBag size={18} />
            <span>Ajouter au panier</span>
          </button>
          <button 
            onClick={() => setPage('contact')}
            className="flex-grow py-5 border border-gold/50 text-gold uppercase text-xs tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all flex items-center justify-center"
          >
            Consultation privée
          </button>
        </div>
      </motion.div>
    </div>

    {/* Gallery Section */}
    <div className="space-y-12">
      <div className="text-center">
        <h3 className="text-3xl font-serif mb-2 italic">Galerie de Détails</h3>
        <div className="w-24 h-[1px] bg-gold mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.gallery.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="gold-border overflow-hidden aspect-square group"
          >
            <img 
              src={img} 
              alt={`${product.name} detail ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// --- Drawer Cart Component ---
const CartDrawer = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onRemove: (id: number) => void,
  onUpdateQuantity: (id: number, delta: number) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((acc, item) => {
    const priceStr = item.price.replace(/[^0-9]/g, '');
    const price = parseInt(priceStr);
    return acc + (price * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-beige shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 border-b border-gold/10 flex justify-between items-center">
              <h2 className="text-2xl font-serif uppercase tracking-wider">Votre Panier</h2>
              <button onClick={onClose} className="text-luxury-brown hover:text-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-gold/20" />
                  <p className="text-luxury-brown/40 font-serif italic">Votre panier est vide</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-6">
                    <div className="w-24 aspect-square gold-border overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif italic text-lg">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-luxury-brown/30 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gold text-xs font-bold">{item.price}</p>
                      <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center border border-gold/20 rounded-full px-2 py-1 space-x-4">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-luxury-brown/40 hover:text-gold transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold border-x border-gold/10 px-2">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-luxury-brown/40 hover:text-gold transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-gold/10 bg-white/50 space-y-6">
                <div className="flex justify-between items-center text-lg font-serif">
                  <span>Total estimé</span>
                  <span className="text-gold">{total.toLocaleString()}€</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-brown/40 leading-relaxed">
                  TVA incluse. Frais de livraison calculés lors de la commande.
                </p>
                <button 
                  onClick={onCheckout}
                  className="w-full py-5 gold-gradient text-white uppercase text-xs tracking-[0.4em] font-bold gold-glow hover:opacity-90 transition-opacity"
                >
                  Passer à la commande
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Wishlist Drawer Component ---
const WishlistDrawer = ({ isOpen, onClose, items, onRemove, onAddToCart }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: Product[], 
  onRemove: (id: number) => void,
  onAddToCart: (p: Product) => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-beige shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 border-b border-gold/10 flex justify-between items-center">
              <h2 className="text-2xl font-serif uppercase tracking-wider">Favoris</h2>
              <button onClick={onClose} className="text-luxury-brown hover:text-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Heart size={48} className="text-gold/20" />
                  <p className="text-luxury-brown/40 font-serif italic">Vous n'avez pas encore de favoris</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-6 items-center">
                    <div className="w-20 aspect-square gold-border overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif italic text-lg leading-tight">{item.name}</h3>
                      <p className="text-gold text-xs font-bold mt-1">{item.price}</p>
                      <div className="flex space-x-4 mt-3">
                        <button 
                          onClick={() => onAddToCart(item)}
                          className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown hover:text-gold transition-colors underline decoration-gold/30"
                        >
                          Ajouter au panier
                        </button>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] uppercase tracking-widest font-bold text-luxury-brown/30 hover:text-red-400 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-white/50 border-t border-gold/10">
              <button 
                onClick={onClose}
                className="w-full py-4 border border-gold text-gold uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all flex items-center justify-center"
              >
                Continuer mes explorations
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Checkout Page Component ---
const CheckoutPage = ({ items, onComplete, onBack }: { items: CartItem[], onComplete: () => void, onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'store' | 'installments' | 'delivery'>('card');
  const [deliveryMethod, setDeliveryMethod] = useState<'carrier' | 'pickup' | 'store'>('carrier');
  const total = items.reduce((acc, item) => {
    const priceStr = item.price.replace(/[^0-9]/g, '');
    const price = parseInt(priceStr);
    return acc + (price * item.quantity);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <button 
        onClick={handleBack}
        className="flex items-center space-x-2 text-luxury-brown/50 hover:text-gold transition-colors mb-8 group"
      >
        <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Retour</span>
      </button>

      <div className="flex justify-between items-center mb-16">
        <h1 className="text-3xl font-serif uppercase tracking-widest">Paiement Sécurisé</h1>
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === s ? 'bg-gold text-white' : step > s ? 'bg-gold/20 text-gold' : 'bg-white border border-gold/20 text-gold/30'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-xl font-serif italic border-b border-gold/10 pb-4">Informations de livraison</h2>
              <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Prénom</label>
                  <input required type="text" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Nom</label>
                  <input required type="text" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Adresse</label>
                  <input required type="text" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Ville</label>
                  <input required type="text" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Code Postal</label>
                  <input required type="text" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                </div>
                <button className="col-span-2 mt-4 py-5 gold-gradient text-white uppercase text-xs tracking-[0.4em] font-bold gold-glow">
                  Continuer vers la livraison
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-xl font-serif italic border-b border-gold/10 pb-4">Mode de livraison</h2>
              <div className="space-y-4">
                <div 
                  onClick={() => setDeliveryMethod('carrier')}
                  className={`border p-6 flex justify-between items-center cursor-pointer transition-all ${
                    deliveryMethod === 'carrier' ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full border-4 ${deliveryMethod === 'carrier' ? 'border-gold' : 'border-gold/10'}`} />
                    <div>
                      <p className="font-serif italic">Livraison Sécurisée par Porteur</p>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-brown/40">2-3 jours ouvrés</p>
                    </div>
                  </div>
                  <span className="text-gold font-bold">Inclus</span>
                </div>

                <div 
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`border p-6 flex justify-between items-center cursor-pointer transition-all ${
                    deliveryMethod === 'pickup' ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full border-4 ${deliveryMethod === 'pickup' ? 'border-gold' : 'border-gold/10'}`} />
                    <div>
                      <p className="font-serif italic">Point Relais Premium</p>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-brown/40">3-4 jours ouvrés</p>
                    </div>
                  </div>
                  <span className="text-gold font-bold">Gratuit</span>
                </div>

                <div 
                  onClick={() => setDeliveryMethod('store')}
                  className={`border p-6 flex justify-between items-center cursor-pointer transition-all ${
                    deliveryMethod === 'store' ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full border-4 ${deliveryMethod === 'store' ? 'border-gold' : 'border-gold/10'}`} />
                    <div>
                      <p className="font-serif italic">Retrait en Boutique (Click & Collect)</p>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-brown/40">Disponible sous 2h</p>
                    </div>
                  </div>
                  <span className="text-gold font-bold">Gratuit</span>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="w-full mt-4 py-5 gold-gradient text-white uppercase text-xs tracking-[0.4em] font-bold gold-glow"
                >
                  Continuer vers le paiement
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-xl font-serif italic border-b border-gold/10 pb-4">Mode de paiement</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'card', label: 'Carte', icon: <CreditCard size={20} /> },
                  { id: 'store', label: 'En boutique', icon: <Banknote size={20} /> },
                  { id: 'installments', label: '3x / 4x', icon: <Clock size={20} /> },
                  { id: 'delivery', label: 'À la livraison', icon: <Truck size={20} /> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`flex flex-col items-center justify-center p-4 border transition-all space-y-2 ${
                      paymentMethod === method.id 
                        ? 'border-gold bg-gold/5 text-gold' 
                        : 'border-gold/10 text-luxury-brown/50 hover:border-gold/30'
                    }`}
                  >
                    {method.icon}
                    <span className="text-[10px] uppercase tracking-widest font-bold">{method.label}</span>
                  </button>
                ))}
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Numéro de carte</label>
                      <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Date d'expiration</label>
                        <input required type="text" placeholder="MM/YY" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">CVC</label>
                        <input required type="password" placeholder="***" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'store' && (
                  <div className="p-8 bg-beige/30 border border-gold/10 space-y-4">
                    <h3 className="font-serif italic">Réservation confirmée</h3>
                    <p className="text-xs text-luxury-brown/70 leading-relaxed">
                      Finalisez votre achat dans notre boutique historique du 1er arrondissement. Vos articles seront réservés pendant 48 heures.
                    </p>
                    <div className="flex items-center space-x-3 text-gold">
                      <MapPin size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">22 Place Vendôme, 75001 Paris</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'installments' && (
                  <div className="space-y-6">
                    <p className="text-xs text-luxury-brown/70 italic">Paiement fractionné via notre partenaire Alma.</p>
                    <div className="border border-gold/10 p-6 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span>Aujourd'hui</span>
                        <span className="font-bold">{(total / 3).toLocaleString()}€</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-luxury-brown/50">
                        <span>Dans 30 jours</span>
                        <span>{(total / 3).toLocaleString()}€</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-luxury-brown/50">
                        <span>Dans 60 jours</span>
                        <span>{(total / 3).toLocaleString()}€</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-brown/50">Numéro de carte pour le prélèvement</label>
                      <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white border border-gold/20 px-4 py-3 focus:border-gold outline-none text-sm transition-colors" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'delivery' && (
                  <div className="p-8 bg-gold/5 border border-gold/20 space-y-4">
                    <h3 className="font-serif italic">Paiement à la remise en main propre</h3>
                    <p className="text-xs text-luxury-brown/70 leading-relaxed">
                      Notre transporteur spécialisé accepte les règlements par carte bancaire ou chèque de banque au moment de la livraison sécurisée.
                    </p>
                    <div className="flex items-center space-x-3 text-gold">
                      <Truck size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Livraison par porteur spécialisé</span>
                    </div>
                  </div>
                )}

                <div className="p-6 bg-beige/50 border border-gold/10 rounded-lg flex items-start space-x-4">
                  <div className="p-2 bg-gold/10 rounded-full text-gold">
                    <Sparkles size={16} />
                  </div>
                  <p className="text-[10px] leading-relaxed text-luxury-brown/60 uppercase tracking-wider">
                    {paymentMethod === 'card' || paymentMethod === 'installments' 
                      ? "Votre transaction est protégée par un cryptage SSL de qualité bancaire 256 bits." 
                      : "Votre réservation est sécurisée. Un justificatif d'identité pourra vous être demandé."}
                  </p>
                </div>
                <button className="w-full mt-4 py-5 gold-gradient text-white uppercase text-xs tracking-[0.4em] font-bold gold-glow">
                  {paymentMethod === 'store' ? 'Confirmer la réservation' : `Confirmer le paiement - ${total.toLocaleString()}€`}
                </button>
              </form>
            </motion.div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-beige/30 border border-gold/10 p-8 space-y-6">
            <h3 className="font-serif italic text-lg border-b border-gold/10 pb-4">Résumé de la commande</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-luxury-brown/60">{item.name} x{item.quantity}</span>
                  <span className="font-bold">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-gold/10 flex justify-between items-center text-lg font-serif">
              <span>Total</span>
              <span className="text-gold">{total.toLocaleString()}€</span>
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-luxury-brown/40">Besoin d'aide ?</p>
            <div className="flex justify-center space-x-4 text-gold">
              <Phone size={14} />
              <span className="text-[10px] font-bold tracking-widest">+33 1 23 45 67 89</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const [page, setPage] = useState<Page>('home');
  const [history, setHistory] = useState<Page[]>(['home']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(() => {
    const saved = localStorage.getItem('aurelion_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aurelion_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aurelion_user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navigate = (nextPage: Page) => {
    setHistory(prev => [...prev, nextPage]);
    setPage(nextPage);
  };

  const handleGoBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current
      const prevPage = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setPage(prevPage);
      if (prevPage !== 'product-detail') setSelectedProduct(null);
    } else {
      setPage('home');
      setHistory(['home']);
      setSelectedProduct(null);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, image: product.image, price: product.price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const isLiked = prev.find(item => item.id === product.id);
      if (isLiked) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate('product-detail');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-[100] origin-left shadow-[0_0_10px_rgba(197,160,89,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />
      
      <Navbar 
        currentPage={page} 
        setPage={navigate} 
        cartCount={cartCount} 
        wishlistCount={wishlistCount}
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenWishlist={() => setIsWishlistOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('checkout');
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={(id) => setWishlist(prev => prev.filter(item => item.id !== id))}
        onAddToCart={(p) => {
          addToCart(p);
          setIsWishlistOpen(false);
        }}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {page === 'home' && <HomePage setPage={navigate} onProductClick={handleProductClick} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} user={user} />}
            {page === 'brand' && <BrandPage onBack={handleGoBack} />}
            {page === 'collections' && <CollectionsPage onProductClick={handleProductClick} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onBack={handleGoBack} />}
            {page === 'signature' && <SignaturePage onProductClick={handleProductClick} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onBack={handleGoBack} />}
            {page === 'search' && <SearchPage setPage={navigate} onProductClick={handleProductClick} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onBack={handleGoBack} />}
            {page === 'contact' && <ContactPage onBack={handleGoBack} />}

            {page === 'deliveries-returns' && <DeliveriesReturnsPage onBack={handleGoBack} />}
            {page === 'size-guide' && <SizeGuidePage onBack={handleGoBack} />}
            {page === 'jewelry-care' && <JewelryCarePage onBack={handleGoBack} />}
            {page === 'legal' && <LegalPage onBack={handleGoBack} />}
            {page === 'privacy' && <PrivacyPage onBack={handleGoBack} />}
            {page === 'register' && <RegisterPage setPage={navigate} onBack={handleGoBack} user={user} setUser={setUser} />}
            {page === 'checkout' && (
              <CheckoutPage 
                items={cart} 
                onComplete={() => {
                  setCart([]);
                  setPage('home');
                  setHistory(['home']);
                  // Using a more modern way to notify than alert
                }} 
                onBack={handleGoBack}
              />
            )}
            {page === 'product-detail' && selectedProduct && (
              <ProductDetailPage product={selectedProduct} setPage={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isLiked={wishlist.some(w => w.id === selectedProduct.id)} onBack={handleGoBack} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={navigate} />
    </div>
  );
}
