export const WHATSAPP_NUMBER = "254740447931"; // 0740447931 in international format
export const PHONE_DISPLAY = "0740447931";
export const BUSINESS_NAME = "NYATI HARDWARE";
export const LOCATION = "Ndumberi / Githunguri Road";
export const HOURS = "Mon - Sat: 7:00 AM - 7:00 PM · Sun: 9:00 AM - 4:00 PM";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const formatKES = (n: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);
