import { Header } from '@/components/Header';
import { CompanyCard } from '@/components/CompanyCard';
import { useData } from '@/context/DataContext';
import { Rocket } from 'lucide-react';

const Index = () => {
  const { getAllCompaniesWithDetails } = useData();
  const companies = getAllCompaniesWithDetails();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-cyan-light/30 to-background py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Rocket className="h-4 w-4" />
              Quick Access Portal
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              All Your Apps, <span className="text-primary">One Click</span> Away
            </h1>
            <p className="text-muted-foreground text-lg">
              Access all company websites, admin panels, and Android apps from a single place. Fast, simple, and always available.
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Companies <span className="text-muted-foreground font-normal">({companies.length})</span>
            </h2>
          </div>
          
          {companies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No companies available yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} e-life One-click. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
