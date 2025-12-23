import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plane, MessageCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

interface Service {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  route: "/advice" | "/travel" | "/want-to-speak";
}

const services: Service[] = [
  {
    icon: Lightbulb,
    titleKey: "services.advice.title",
    descriptionKey: "services.advice.description",
    route: "/advice",
  },
  {
    icon: Plane,
    titleKey: "services.travel.title",
    descriptionKey: "services.travel.description",
    route: "/travel",
  },
  {
    icon: MessageCircle,
    titleKey: "services.wantToSpeak.title",
    descriptionKey: "services.wantToSpeak.description",
    route: "/want-to-speak",
  },
];

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex h-full flex-col justify-between px-4 py-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="animate-fade-in-up text-5xl font-bold md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {t("home.title")}
          </span>
        </h1>
        <p className="animate-fade-in-up animation-delay-200 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t("home.description")}
        </p>
      </div>

      {/* Cards Section */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <Link key={service.route} to={service.route}>
            <Card
              className={`animate-fade-in-scale group h-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 ${
                index === 0
                  ? "animation-delay-300"
                  : index === 1
                    ? "animation-delay-400"
                    : "animation-delay-500"
              }`}
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-400">
                  {t(service.titleKey)}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t(service.descriptionKey)}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Contact CTA Section */}
      <div className="animate-fade-in-up animation-delay-600 relative mt-8 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

        <div className="relative px-6 py-8 text-center md:py-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            {t("cta.description")}
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="mt-8 bg-white text-purple-700 hover:bg-white/90 hover:scale-105 transition-transform duration-200"
            >
              {t("cta.button")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
