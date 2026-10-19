import { Laptop, Monitor, Wrench, Users, Box, Mouse, Cpu, MemoryStick, Settings, Wifi, Shield, ShieldCheck, Headphones, Tag, Gem, Gamepad2, Briefcase, Video, MessageSquare, Search, FileText, Star, ThumbsUp, HelpCircle, Handshake, Tablet, PlusCircle, Power, Gauge, BatteryFull, Keyboard, Phone, Mail, MapPin, Clock, Store, Send, ArrowRight, ArrowUpRight, ChevronRight, ChevronLeft, Plus, Minus, Menu, X, Check, CheckCircle2, ShoppingCart, Building2, Lock, MessageSquareMore, MessageCircleMore, Server, HardDrive } from "lucide-react";

const MAP = {
  laptop: Laptop, monitor: Monitor, wrench: Wrench, users: Users, box: Box, mouse: Mouse, cpu: Cpu, ram: MemoryStick,
  gear: Settings, wifi: Wifi, shield: ShieldCheck, shield2: Shield, headset: Headphones, tag: Tag, diamond: Gem, gamepad: Gamepad2,
  briefcase: Briefcase, video: Video, chat: MessageSquare, search: Search, file: FileText, star: Star, thumb: ThumbsUp, help: HelpCircle,
  handshake: Handshake, tablet: Tablet, plus: PlusCircle, power: Power, gauge: Gauge, battery: BatteryFull, keyboard: Keyboard,
  phone: Phone, mail: Mail, pin: MapPin, clock: Clock, store: Store, send: Send, arrow: ArrowRight, arrowUp: ArrowUpRight,
  right: ChevronRight, left: ChevronLeft, plusS: Plus, minus: Minus, menu: Menu, x: X, check: Check, checkc: CheckCircle2,
  cart: ShoppingCart, building: Building2, lock: Lock, chatDots: MessageSquareMore, chatCircle: MessageCircleMore,
  server: Server, harddrive: HardDrive,
};
export default function Icon({ name, className = "h-5 w-5", ...p }) {
  const C = MAP[name] || Box;
  return <C className={className} strokeWidth={1.9} aria-hidden="true" {...p} />;
}
export const WhatsAppIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.1L2 22l5.05-1.5A9.94 9.94 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3 .88.9-2.92-.2-.31a8.1 8.1 0 1 1 6.85 3.7Zm4.45-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.1 3.64.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);
