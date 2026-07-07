export const TAGS = {
  MES: {
    name: "Primer mes gratis",
    class: "bg-[#339933]/20 text-[#6cc24a]",
    icon: "lucide:gift",
  },
  INSTALACION: {
    name: "$1000 de instalación",
    class: "bg-[#7836cf]/20 text-[#bc95ff]",
    icon: "lucide:dollar-sign",
  },
  PREPAGO: {
  name: "Mensualidad fija por adelantado",
  class: "bg-[#7836cf]/20 text-[#bc95ff]",
  icon: "lucide:receipt",
},

};

export const PROJECTS = [
  {
    title: "BÁSICO",
    price: 350,
    color: "text-[#2ABFC2]",
    bgColor: "bg-[#2ABFC2]",
    subida: "Velocidad de subida de 10 Mbps",
    descarga: "Velocidad de bajada de 50 Mbps",
    folio: 2643192,
    tags: [TAGS.MES, TAGS.INSTALACION, TAGS.PREPAGO],
  },
  {
    title: "PLUS",
    price: 400,
    color: "text-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]",
     subida: "Velocidad de subida de 10 Mbps",
    descarga: "Velocidad de bajada de 70 Mbps",
    folio: 2663789,
    tags: [TAGS.MES, TAGS.INSTALACION, TAGS.PREPAGO],
  },
  {
    title: "PREMIUM",
    price: 500,
    color: "text-[#FBBF24]",
    bgColor: "bg-[#FBBF24]",
     subida: "Velocidad de subida de 10 Mbps",
    descarga: "Velocidad de bajada de 100 Mbps",
    folio: 2663828,
    tags: [TAGS.MES, TAGS.INSTALACION, TAGS.PREPAGO, ],
  },
];
