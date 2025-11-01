import Link from 'next/link';

// Componente para un ícono SVG genérico
const SocialIcon = ({ href, path }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Carreras', href: '/carreras' },
    { name: 'Prensa', href: '/prensa' },
  ];

  const supportLinks = [
    { name: 'Contacto', href: '/contacto' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Envíos y Devoluciones', href: '/envios' },
  ];

  const legalLinks = [
    { name: 'Términos de Servicio', href: '/terminos' },
    { name: 'Política de Privacidad', href: '/privacidad' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { name: 'Instagram', href: 'https://instagram.com', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z' },
    { name: 'Twitter', href: 'https://twitter.com', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  ];

  const FooterLink = ({ href, children }) => (
    <li>
      <Link href={href} className="text-sm hover:text-black dark:hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Columna de Compañía */}
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white mb-4">Compañía</h3>
            <ul className="space-y-3">
              {companyLinks.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </ul>
          </div>

          {/* Columna de Soporte */}
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white mb-4">Soporte</h3>
            <ul className="space-y-3">
              {supportLinks.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </ul>
          </div>

          {/* Columna Legal */}
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </ul>
          </div>

          {/* Columna de Redes Sociales */}
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map(link => <SocialIcon key={link.name} href={link.href} path={link.path} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior del Footer */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm">
          <p>&copy; {currentYear} MiTienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}