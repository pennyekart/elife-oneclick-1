import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="e-life One-click" className="h-12 w-auto" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">e-life One-click</h1>
            <p className="text-xs text-muted-foreground">All apps in one place</p>
          </div>
        </Link>
        <Link 
          to="/admin" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
