"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage, type Language } from "@/lib/language-context";

type LegalSubsection = {
  title: string;
  content: string;
};

type LegalSection = {
  id: string;
  title: string;
  content: string;
  subsections?: LegalSubsection[];
};

const copy: Record<
  Language,
  {
    back: string;
    title: string;
    description: string;
    contents: string;
    sections: LegalSection[];
  }
> = {
  es: {
    back: "Volver al portfolio",
    title: "Legal",
    description:
      "Aviso legal, condiciones de uso, política de privacidad y política de cookies de este sitio web.",
    contents: "Contenido",
    sections: [
      {
        id: "aviso-legal",
        title: "1. Aviso legal",
        content: `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web.

Titular: Alex Vicente López
Correo electrónico de contacto: alexviclop@gmail.com
Sitio web: aleviclop.dev

Este sitio web tiene carácter personal y no ejerce ninguna actividad comercial. Su finalidad exclusiva es presentar el portfolio profesional y personal de su titular.`,
      },
      {
        id: "condiciones-uso",
        title: "2. Condiciones de uso",
        content: `El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de estas condiciones. El titular se reserva el derecho a modificar, en cualquier momento y sin previo aviso, la presentación y configuración del sitio web.

El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen, no utilizándolos para realizar actividades ilícitas o contrarias a la buena fe, difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atenten contra los derechos humanos, o causar daños en los sistemas físicos y lógicos del titular.

Los contenidos de este sitio web —textos, imágenes, diseño, código fuente y demás elementos— son propiedad intelectual de Alex Vicente López, salvo indicación en contrario, y están protegidos por la legislación vigente en materia de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.`,
      },
      {
        id: "privacidad",
        title: "3. Política de privacidad",
        content:
          "De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa de lo siguiente:",
        subsections: [
          {
            title: "3.1. Responsable del tratamiento",
            content:
              "Alex Vicente López\nCorreo electrónico: alexviclop@gmail.com",
          },
          {
            title: "3.2. Datos que se recopilan",
            content: `A través del formulario de contacto de este sitio web se pueden recopilar los siguientes datos personales:
- Nombre
- Dirección de correo electrónico
- Contenido del mensaje

No se recogen datos especialmente protegidos, datos de menores ni datos bancarios.`,
          },
          {
            title: "3.3. Finalidad del tratamiento",
            content: `Los datos facilitados a través del formulario de contacto se utilizan exclusivamente para:
- Responder a las consultas enviadas por el usuario.
- Contactar con el usuario en el marco de relaciones profesionales derivadas de dicha solicitud.

No se realiza ningún otro tratamiento ni se utilizan los datos con fines de marketing o publicidad.`,
          },
          {
            title: "3.4. Base jurídica",
            content:
              "La base jurídica del tratamiento es el consentimiento del interesado al enviar el formulario —artículo 6.1.a del RGPD— y el interés legítimo del titular para gestionar las comunicaciones profesionales recibidas —artículo 6.1.f del RGPD—.",
          },
          {
            title: "3.5. Destinatarios y encargados del tratamiento",
            content: `Los datos facilitados a través del formulario son procesados por Web3Forms (web3forms.com), servicio de tercero utilizado para la gestión y entrega de los mensajes. Web3Forms actúa como encargado del tratamiento y dispone de su propia política de privacidad.

El titular no cede ni vende datos personales a ningún otro tercero.`,
          },
          {
            title: "3.6. Conservación de los datos",
            content:
              "Los datos se conservarán durante el tiempo necesario para atender la consulta y, posteriormente, durante los plazos legalmente exigibles o hasta que el interesado solicite su supresión.",
          },
          {
            title: "3.7. Derechos del interesado",
            content: `El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos, enviando un correo electrónico a alexviclop@gmail.com con el asunto "Protección de datos".

Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento de sus datos vulnera la normativa vigente.`,
          },
        ],
      },
      {
        id: "cookies",
        title: "4. Política de cookies",
        content: "",
        subsections: [
          {
            title: "4.1. ¿Qué son las cookies?",
            content:
              "Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario. Permiten que el sitio recuerde información sobre la visita, lo que facilita la navegación y mejora la experiencia de usuario.",
          },
          {
            title: "4.2. Cookies utilizadas en este sitio",
            content: `Este sitio web utiliza exclusivamente cookies técnicas y de análisis anónimo:

- Vercel Analytics: Servicio de análisis de rendimiento web de Vercel Inc. Recopila métricas anónimas de rendimiento (Web Vitals) sin asociarlas a usuarios concretos ni usar identificadores persistentes entre sesiones. No requiere consentimiento según la normativa vigente al no tratar datos personales identificables.

- Vercel Speed Insights: Servicio de análisis de velocidad de carga de Vercel Inc. con el mismo funcionamiento anónimo descrito anteriormente.

Este sitio web NO utiliza cookies de publicidad, cookies de redes sociales (de terceros) ni cookies de seguimiento entre sitios.`,
          },
          {
            title: "4.3. Gestión y desactivación de cookies",
            content: `El usuario puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envíe una cookie. La desactivación de cookies técnicas puede afectar al correcto funcionamiento del sitio.

Puede gestionar sus preferencias de cookies desde la configuración de su navegador:
- Chrome: Configuración > Privacidad y seguridad > Cookies
- Firefox: Opciones > Privacidad y seguridad
- Safari: Preferencias > Privacidad
- Edge: Configuración > Privacidad, búsqueda y servicios`,
          },
        ],
      },
      {
        id: "enlaces",
        title: "5. Hipervínculos",
        content:
          "Este sitio web puede contener enlaces a sitios web de terceros (GitHub, LinkedIn, Instagram, Web3Forms, Vercel, etc.). El titular no se hace responsable del contenido ni de la política de privacidad de dichos sitios. Se recomienda al usuario revisar las políticas de privacidad de cada sitio web externo que visite.",
      },
      {
        id: "modificaciones",
        title: "6. Modificaciones",
        content:
          "El titular se reserva el derecho a modificar el presente aviso legal, la política de privacidad y la política de cookies en cualquier momento. Se recomienda al usuario revisar periódicamente esta página. La última actualización de este documento fue el 21 de junio de 2026.",
      },
    ],
  },
  en: {
    back: "Back to portfolio",
    title: "Legal",
    description:
      "Legal notice, terms of use, privacy policy, and cookie policy for this website.",
    contents: "Contents",
    sections: [
      {
        id: "aviso-legal",
        title: "1. Legal notice",
        content: `In accordance with Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the website owner’s identifying information is provided below.

Owner: Alex Vicente López
Contact email: alexviclop@gmail.com
Website: aleviclop.dev

This is a personal website and does not conduct commercial activity. Its sole purpose is to present the owner’s professional and personal portfolio.`,
      },
      {
        id: "condiciones-uso",
        title: "2. Terms of use",
        content: `Accessing and using this website grants visitor status and implies acceptance of these terms. The owner may change the website’s presentation and configuration at any time without prior notice.

Users agree to use the available content and services appropriately. They must not use them for unlawful activities, actions contrary to good faith, distribution of racist, xenophobic, pornographic, or human-rights-violating material, or damage to the owner’s physical or digital systems.

Unless stated otherwise, this website’s text, images, design, source code, and other content are the intellectual property of Alex Vicente López and are protected by applicable intellectual property law. Full or partial reproduction without express permission is prohibited.`,
      },
      {
        id: "privacidad",
        title: "3. Privacy policy",
        content:
          "The following information is provided in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 on Personal Data Protection and the Guarantee of Digital Rights (LOPDGDD):",
        subsections: [
          {
            title: "3.1. Data controller",
            content: "Alex Vicente López\nEmail: alexviclop@gmail.com",
          },
          {
            title: "3.2. Data collected",
            content:
              "The contact form may collect your name, email address, and message content. It does not collect special-category data, children’s data, or banking information.",
          },
          {
            title: "3.3. Purpose of processing",
            content:
              "Submitted data is used solely to answer enquiries and contact users regarding professional relationships arising from their request. It is not used for marketing or advertising.",
          },
          {
            title: "3.4. Legal basis",
            content:
              "Processing is based on the user’s consent when submitting the form under Article 6(1)(a) GDPR and the owner’s legitimate interest in managing professional communications under Article 6(1)(f) GDPR.",
          },
          {
            title: "3.5. Recipients and processors",
            content:
              "Contact form data is processed by Web3Forms (web3forms.com), a third-party service used to manage and deliver messages. Web3Forms acts as a data processor and maintains its own privacy policy. The owner does not transfer or sell personal data to other third parties.",
          },
          {
            title: "3.6. Data retention",
            content:
              "Data is retained for as long as needed to handle the enquiry and afterwards for legally required periods, or until the data subject requests its deletion.",
          },
          {
            title: "3.7. Your rights",
            content:
              'You may exercise your rights of access, rectification, erasure, objection, restriction, and portability by emailing alexviclop@gmail.com with the subject "Data protection". You may also lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).',
          },
        ],
      },
      {
        id: "cookies",
        title: "4. Cookie policy",
        content: "",
        subsections: [
          {
            title: "4.1. What are cookies?",
            content:
              "Cookies are small text files stored by websites on a user’s device. They can remember information about a visit and make navigation easier.",
          },
          {
            title: "4.2. Cookies used on this website",
            content:
              "This website uses only technical cookies and anonymous analytics services. Vercel Analytics collects anonymous usage metrics, while Vercel Speed Insights measures loading performance. No advertising, social media, or cross-site tracking cookies are used.",
          },
          {
            title: "4.3. Managing and disabling cookies",
            content:
              "You can configure your browser to reject cookies or notify you when one is sent. Disabling technical cookies may affect website functionality. These preferences are available in the privacy settings of Chrome, Firefox, Safari, and Edge.",
          },
        ],
      },
      {
        id: "enlaces",
        title: "5. External links",
        content:
          "This website may link to third-party services such as GitHub, LinkedIn, Instagram, Web3Forms, or Vercel. The owner is not responsible for their content or privacy policies. Review the terms of every external website you visit.",
      },
      {
        id: "modificaciones",
        title: "6. Changes",
        content:
          "The owner may amend this legal notice and the privacy and cookie policies. Review this page periodically. Last updated: 21 June 2026.",
      },
    ],
  },
};

export function LegalPageContent() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <main id="main-content" className="relative min-h-screen bg-background px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
            <span className="h-px w-5 bg-current" />
            {content.back}
          </Link>
          <LanguageToggle />
        </div>

        <header className="mb-14 space-y-4">
          <h1 className="text-4xl font-black leading-[0.94] text-foreground sm:text-6xl">
            {content.title}
          </h1>
          <p className="max-w-xl text-base font-medium leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </header>

        <nav aria-label={content.contents} className="mb-14 rounded-lg border border-border/60 bg-card/60 p-6">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {content.contents}
          </p>
          <ul className="space-y-2">
            {content.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {content.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-px max-w-12 flex-1 bg-primary/40" />
                <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                  {section.title}
                </h2>
              </div>
              {section.content ? (
                <div className="rounded-lg border border-border/50 bg-card/40 p-6">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              ) : null}
              {section.subsections ? (
                <div className="space-y-6">
                  {section.subsections.map((subsection) => (
                    <article key={subsection.title} className="rounded-lg border border-border/40 bg-card/30 p-6">
                      <h3 className="mb-3 text-base font-bold text-foreground">
                        {subsection.title}
                      </h3>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {subsection.content}
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t border-border/40 pt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            &copy; 2026 Alex Vicente López · aleviclop.dev
          </p>
        </footer>
      </div>
    </main>
  );
}
