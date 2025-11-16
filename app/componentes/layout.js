import './globals.css'; // Asegúrate de tener este archivo de estilos
import Header from './components/Header';

export const metadata = {
  title: 'Mi Tienda Online',
  description: 'El mejor lugar para tus compras.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}