import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal y Privacidad",
  description:
    "Aviso legal, política de privacidad y política de cookies de aleviclop.dev, el portfolio de Alex Vicente López.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    id: "aviso-legal",
    title: "1. Aviso Legal",
    content: `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web.

Titular: Alex Vicente López
Correo electrónico de contacto: alexviclop@gmail.com
Sitio web: aleviclop.dev

Este sitio web tiene carácter personal y no ejerce ninguna actividad comercial. Su finalidad exclusiva es presentar el portfolio profesional y personal de su titular.`,
  },
  {
    id: "condiciones-uso",
    title: "2. Condiciones de Uso",
    content: `El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de estas condiciones. El titular se reserva el derecho a modificar, en cualquier momento y sin previo aviso, la presentación y configuración del sitio web.

El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen, no utilizándolos para: realizar actividades ilícitas o contrarias a la buena fe, difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atenten contra los derechos humanos, o causar daños en los sistemas físicos y lógicos del titular.

Los contenidos de este sitio web (textos, imágenes, diseño, código fuente y demás elementos) son propiedad intelectual de Alex Vicente López, salvo indicación en contrario, y están protegidos por la legislación vigente en materia de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.`,
  },
  {
    id: "privacidad",
    title: "3. Política de Privacidad",
    content: `De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa de lo siguiente:`,
    subsections: [
      {
        title: "3.1. Responsable del tratamiento",
        content: `Alex Vicente López\nCorreo: alexviclop@gmail.com`,
      },
      {
        title: "3.2. Datos que se recopilan",
        content: `A través del formulario de contacto de este sitio web se pueden recopilar los siguientes datos personales:\n- Nombre\n- Dirección de correo electrónico\n- Contenido del mensaje\n\nNo se recogen datos especialmente protegidos, datos de menores ni datos bancarios.`,
      },
      {
        title: "3.3. Finalidad del tratamiento",
        content: `Los datos facilitados a través del formulario de contacto se utilizan exclusivamente para:\n- Responder a las consultas enviadas por el usuario.\n- Contactar con el usuario en el marco de relaciones profesionales derivadas de dicha solicitud.\n\nNo se realiza ningún otro tratamiento ni se utilizan los datos con fines de marketing o publicidad.`,
      },
      {
        title: "3.4. Base jurídica",
        content: `La base jurídica del tratamiento es el consentimiento del interesado al enviar el formulario (art. 6.1.a RGPD), así como el interés legítimo del titular para gestionar las comunicaciones profesionales recibidas (art. 6.1.f RGPD).`,
      },
      {
        title: "3.5. Destinatarios y encargados de tratamiento",
        content: `Los datos facilitados a través del formulario son procesados por Web3Forms (web3forms.com), servicio de tercero utilizado para la gestión y entrega de los mensajes. Web3Forms actúa como encargado del tratamiento y dispone de su propia política de privacidad.\n\nEl titular no cede ni vende datos personales a ningún otro tercero.`,
      },
      {
        title: "3.6. Conservación de los datos",
        content: `Los datos se conservarán durante el tiempo necesario para atender la consulta y, posteriormente, durante los plazos legalmente exigibles, o hasta que el interesado solicite su supresión.`,
      },
      {
        title: "3.7. Derechos del interesado",
        content: `El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos, enviando un correo electrónico a alexviclop@gmail.com con el asunto "Protección de datos".\n\nAsimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento de sus datos vulnera la normativa vigente.`,
      },
    ],
  },
  {
    id: "cookies",
    title: "4. Política de Cookies",
    content: ``,
    subsections: [
      {
        title: "4.1. ¿Qué son las cookies?",
        content: `Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario. Permiten que el sitio recuerde información sobre la visita, lo que facilita la navegación y mejora la experiencia de usuario.`,
      },
      {
        title: "4.2. Cookies utilizadas en este sitio",
        content: `Este sitio web utiliza exclusivamente cookies técnicas y de análisis anónimo:\n\n- Vercel Analytics: Servicio de análisis de rendimiento web de Vercel Inc. Recopila métricas anónimas de rendimiento (Web Vitals) sin asociarlas a usuarios concretos ni usar identificadores persistentes entre sesiones. No requiere consentimiento según la normativa vigente al no tratar datos personales identificables.\n\n- Vercel Speed Insights: Servicio de análisis de velocidad de carga de Vercel Inc. con el mismo funcionamiento anónimo descrito anteriormente.\n\nEste sitio web NO utiliza cookies de publicidad, cookies de redes sociales (de terceros) ni cookies de seguimiento entre sitios.`,
      },
      {
        title: "4.3. Gestión y desactivación de cookies",
        content: `El usuario puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envíe una cookie. La desactivación de cookies técnicas puede afectar al correcto funcionamiento del sitio.\n\nPuede gestionar sus preferencias de cookies desde la configuración de su navegador:\n- Chrome: Configuración > Privacidad y seguridad > Cookies\n- Firefox: Opciones > Privacidad y seguridad\n- Safari: Preferencias > Privacidad\n- Edge: Configuración > Privacidad, búsqueda y servicios`,
      },
    ],
  },
  {
    id: "enlaces",
    title: "5. Hipervínculos",
    content: `Este sitio web puede contener enlaces a sitios web de terceros (GitHub, LinkedIn, Instagram, Web3Forms, Vercel, etc.). El titular no se hace responsable del contenido ni de la política de privacidad de dichos sitios. Se recomienda al usuario revisar las políticas de privacidad de cada sitio web externo que visite.`,
  },
  {
    id: "modificaciones",
    title: "6. Modificaciones",
    content: `El titular se reserva el derecho a modificar el presente aviso legal, la política de privacidad y la política de cookies en cualquier momento. Se recomienda al usuario revisar periódicamente esta página. La última actualización de este documento fue el 21 de junio de 2026.`,
  },
];

export default function LegalPage() {
  return (
    <main id="main-content" className="relative min-h-screen bg-background px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute left-[10%] top-[5%] h-[30rem] w-[30rem] rounded-full bg-primary/6 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 transition-colors hover:text-primary"
        >
          <span className="h-px w-5 bg-current" />
          Volver al portfolio
        </Link>

        {/* Title */}
        <div className="mb-14 space-y-4">
          <h1 className="text-4xl font-black leading-[0.94] tracking-normal text-foreground sm:text-6xl">
            Legal
          </h1>
          <p className="text-muted-foreground text-base font-medium leading-relaxed max-w-xl">
            Aviso legal, condiciones de uso, política de privacidad y política
            de cookies de este sitio web.
          </p>
        </div>

        {/* TOC */}
        <nav className="mb-14 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            Contenido
          </p>
          <ul className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 max-w-[3rem] bg-primary/40" />
                <h2 className="text-2xl font-black tracking-normal text-foreground sm:text-3xl">
                  {section.title}
                </h2>
              </div>

              {section.content && (
                <div className="rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              )}

              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.title}
                      className="rounded-2xl border border-border/40 bg-card/30 p-6"
                    >
                      <h3 className="mb-3 text-base font-bold tracking-normal text-foreground">
                        {sub.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-border/40 pt-8 text-center">
          <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest">
            &copy; 2026 Alex Vicente López · aleviclop.dev
          </p>
        </div>
      </div>
    </main>
  );
}
