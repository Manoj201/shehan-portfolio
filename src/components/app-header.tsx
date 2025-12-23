import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MessageCircle, Languages, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

export function AppHeader() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const router = useRouter();

  const isChildRoute = location.pathname !== "/";

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "no" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const handleBack = () => {
    router.history.back();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {isChildRoute && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="SK Konsulent"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Languages className="h-4 w-4" />
            <span className="font-medium">
              {i18n.language === "en" ? "NO" : "EN"}
            </span>
          </Button>

          <Link to="/contact">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                {t("header.contactUs")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
