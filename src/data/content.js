export const WHATSAPP_NUMBER = '573024097860'
export const WHATSAPP_DISPLAY = '+57 302 409 7860'
export const INSTAGRAM_URL = 'https://instagram.com'
export const EMAIL = 'hola@salvaia.com'

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}` + (text ? `?text=${encodeURIComponent(text)}` : '')

export const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#historia', label: 'Mi historia' },
  { href: '#tienda', label: 'Tienda' },
  { href: '#especialistas', label: 'Especialistas' },
]

export const ticker = [
  { bold: 'Soy mamá. Y también soy yo.', hand: 'Tu momento también cuenta.' },
  { bold: 'Tu cuerpo. Tu ritmo.', hand: 'Hay espacio para los dos.' },
  { bold: 'Una mamá más libre también inspira.', hand: 'Mamá también brilla ♡' },
  { bold: 'Una marca. Todos tus matices.', hand: 'Tu momento también cuenta.' },
]

export const services = [
  {
    title: 'Tu cuerpo. Tu ritmo.',
    text: 'Rutinas cortas de recuperación: suelo pélvico, core profundo y movilidad, desde la semana que te toque.',
    tag: 'Rutinas y ejercicios',
    color: '#F8B9AA',
    offset: '0',
    iconRadius: '50%',
    iconT: 'none',
  },
  {
    title: 'Batidos y nutrición',
    text: 'Recetas que alimentan la lactancia y la energía. Sin dietas, con antojo permitido.',
    tag: 'Nutrición',
    color: '#BFE5D5',
    offset: '40px',
    iconRadius: '6px',
    iconT: 'rotate(45deg)',
  },
  {
    title: 'Conversaciones que sostienen',
    text: 'Sesiones para hablar de lo que nadie pregunta, durante el embarazo y después del parto.',
    tag: 'Embarazo y posparto',
    color: '#CCBBEF',
    offset: '0',
    iconRadius: '50% 50% 50% 4px',
    iconT: 'none',
  },
  {
    title: 'Red de especialistas',
    text: 'Fisio, psicóloga, gine, nutri, lactancia y doula. Te derivo a quien necesitas.',
    tag: 'Especialistas',
    color: '#9FC9FA',
    offset: '40px',
    iconRadius: '50%',
    iconT: 'scale(.7)',
  },
]

export const reels = [
  { title: '5 minutos de suelo pélvico', dur: '0:58', color: '#F7E6E3', offset: '0', rot: '-1.5deg', thumb: 'miniatura · sala' },
  { title: 'El batido que me salvó las mañanas', dur: '0:42', color: '#BFE5D5', offset: '36px', rot: '1.5deg', thumb: 'miniatura · cocina' },
  { title: 'Lo que nadie te dice del posparto', dur: '1:12', color: '#CCBBEF', offset: '0', rot: '-1.5deg', thumb: 'miniatura · íntimo' },
  { title: 'Estirar con el bebé encima', dur: '0:35', color: '#FDEAB2', offset: '36px', rot: '1.5deg', thumb: 'miniatura · mamá-bebé' },
  { title: 'Mi semana 6, sin filtros', dur: '1:04', color: '#F8B9AA', offset: '0', rot: '-1.5deg', thumb: 'miniatura · palmeras' },
]

export const products = [
  { type: 'Programa · 6 semanas', title: 'Vuelve a ti', desc: 'Rutinas progresivas, batidos y una conversación semanal en grupo.', price: '89 €', color: '#E8BDB8', thumb: 'foto · entrenando', link: '#' },
  { type: 'Guía digital', title: 'Guía de 30 batidos', desc: 'Treinta recetas para energía, lactancia y recuperación.', price: '19 €', color: '#BFE5D5', thumb: 'foto · batido', link: '#' },
  { type: 'Mini curso', title: 'Suelo pélvico en casa', desc: 'Cuatro videos cortos para reconectar con tu base.', price: '29 €', color: '#CCBBEF', thumb: 'foto · mat', link: '#' },
  { type: 'Sesión 1:1', title: 'Hablemos de ti', desc: 'Una hora contigo: cuerpo, ánimo y un plan realista.', price: '60 €', color: '#FDEAB2', thumb: 'foto · conversación', link: '#' },
  { type: 'Membresía mensual', title: 'Club Salva', desc: 'Rutinas nuevas cada semana, comunidad y descuentos con la red.', price: '15 € / mes', color: '#F8B9AA', thumb: 'foto · grupo', link: '#' },
]

export const specialists = [
  { name: 'Nombre Apellido', role: 'Fisioterapeuta de suelo pélvico', desc: 'Valoración y recuperación de diástasis, incontinencia y cicatrices.', color: '#F8B9AA', initial: 'F' },
  { name: 'Nombre Apellido', role: 'Psicóloga perinatal', desc: 'Acompañamiento emocional en embarazo, parto y posparto.', color: '#CCBBEF', initial: 'P' },
  { name: 'Nombre Apellido', role: 'Ginecóloga', desc: 'Revisión posparto, anticoncepción y salud hormonal.', color: '#9FC9FA', initial: 'G' },
  { name: 'Nombre Apellido', role: 'Nutricionista', desc: 'Planes para lactancia, energía y recomposición sin restricción.', color: '#BFE5D5', initial: 'N' },
  { name: 'Nombre Apellido', role: 'Asesora de lactancia', desc: 'Agarre, dolor, producción y destete respetuoso.', color: '#FDEAB2', initial: 'L' },
  { name: 'Nombre Apellido', role: 'Doula', desc: 'Presencia y sostén antes, durante y después del nacimiento.', color: '#E8BDB8', initial: 'D' },
].map((e) => ({
  ...e,
  wa: waLink(`Hola, llego desde Salva IA y quiero contactar con la ${e.role.toLowerCase()}.`),
}))

const reviewColors = ['#E8BDB8', '#BFE5D5', '#F7E6E3', '#CCBBEF']
export const reviews = [
  { quote: 'Por primera vez alguien me habló de mi cuerpo sin hacerme sentir culpable.', name: 'Laura, mamá de Vega' },
  { quote: 'El programa de 6 semanas cabe en una siesta. Eso lo cambió todo.', name: 'Andrea, 4 meses posparto' },
  { quote: 'Los batidos me devolvieron energía cuando no dormía nada.', name: 'Carla, mamá de dos' },
  { quote: 'Me derivó a una fisio increíble en dos mensajes.', name: 'Marta, semana 10' },
  { quote: 'Las conversaciones me sostuvieron en el embarazo más que cualquier libro.', name: 'Inés, embarazada de 32 semanas' },
  { quote: 'Volví a sentirme yo. No la de antes: una nueva.', name: 'Sofía, mamá de Leo' },
].map((r, i) => ({ ...r, color: reviewColors[i % 4] }))

export const faqs = [
  { q: '¿Cuándo puedo empezar a ejercitarme después del parto?', a: 'Con el alta médica, normalmente entre la semana 6 y 8. Antes puedes trabajar respiración y suelo pélvico suave. Adaptamos todo a tu tipo de parto.' },
  { q: '¿Sirve si tuve cesárea?', a: 'Sí. Las rutinas tienen una versión específica para cicatriz de cesárea y el ritmo lo marcas tú.' },
  { q: '¿Necesito material?', a: 'Una esterilla y, si quieres, una banda elástica. Todo se hace en casa, con el bebé cerca.' },
  { q: '¿Puedo unirme estando embarazada?', a: 'Sí. Las conversaciones y la nutrición están pensadas también para el embarazo, y preparan tu posparto.' },
  { q: '¿Esto sustituye a mi médica o fisio?', a: 'No. Es acompañamiento y educación. Si detectamos algo que necesita atención, te derivo a la red de especialistas.' },
]

export const moments = [
  { value: 'Embarazada', label: 'Embarazada' },
  { value: 'Bebé menor de 3 meses', label: 'Bebé < 3 meses' },
  { value: 'Bebé mayor de 3 meses', label: 'Bebé > 3 meses' },
  { value: 'Profesional de la salud', label: 'Profesional de la salud' },
]
