import './globals.css';

export const metadata = {
  title: 'ViceCity Web — آفتاب سرخ',
  description: 'Original browser-based 3D urban action game prototype.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
