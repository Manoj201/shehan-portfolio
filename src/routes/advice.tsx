import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Globe,
  FileCheck,
  Briefcase,
  Users,
  CreditCard,
  Lightbulb,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/advice")({
  component: AdvicePage,
});

interface AdviceItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  color: string;
  shadow: string;
}

const adviceItems: AdviceItem[] = [
  {
    icon: Globe,
    titleKey: "pages.advice.cards.immigration.title",
    descriptionKey: "pages.advice.cards.immigration.description",
    color: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-500/20",
  },
  {
    icon: FileCheck,
    titleKey: "pages.advice.cards.residence.title",
    descriptionKey: "pages.advice.cards.residence.description",
    color: "from-purple-500 to-indigo-600",
    shadow: "shadow-purple-500/20",
  },
  {
    icon: Briefcase,
    titleKey: "pages.advice.cards.work.title",
    descriptionKey: "pages.advice.cards.work.description",
    color: "from-blue-500 to-cyan-600",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: Users,
    titleKey: "pages.advice.cards.family.title",
    descriptionKey: "pages.advice.cards.family.description",
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: CreditCard,
    titleKey: "pages.advice.cards.tax.title",
    descriptionKey: "pages.advice.cards.tax.description",
    color: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/20",
  },
];

const benefits = [
  {
    icon: Shield,
    textKey: "pages.advice.benefits.expert",
  },
  {
    icon: Clock,
    textKey: "pages.advice.benefits.quick",
  },
  {
    icon: Award,
    textKey: "pages.advice.benefits.trusted",
  },
];

const getAnimationDelay = (index: number) => {
  const delays = [
    "animation-delay-300",
    "animation-delay-400",
    "animation-delay-500",
    "animation-delay-600",
    "animation-delay-700",
  ];
  return delays[index] || "animation-delay-300";
};

function AdvicePage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="animate-fade-in-up mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Lightbulb className="h-4 w-4" />
            {t("pages.advice.badge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t("pages.advice.title")}
            </span>
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("pages.advice.description")}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="animate-fade-in-up animation-delay-300 mb-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-purple-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm">
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.textKey}
                  className="flex items-center gap-3 rounded-xl bg-purple-500/10 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {t(benefit.textKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="animate-fade-in-up animation-delay-400 mb-8 text-center">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            {t("pages.advice.servicesTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("pages.advice.servicesSubtitle")}
          </p>
        </div>

        {/* Advice Cards Grid */}
        <div className="animate-fade-in-up animation-delay-500 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adviceItems.map((item, index) => (
            <Link key={item.titleKey} to="/contact">
              <Card
                className={`animate-fade-in-scale ${getAnimationDelay(index)} group h-full cursor-pointer border-purple-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20`}
              >
                <CardHeader>
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg ${item.shadow} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white transition-colors duration-300 group-hover:text-purple-400">
                    {t(item.titleKey)}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t(item.descriptionKey)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="animate-fade-in-up animation-delay-600 mt-16">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

            <div className="relative px-6 py-10 text-center md:py-12">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {t("pages.advice.ctaTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/80">
                {t("pages.advice.ctaDescription")}
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="mt-8 bg-white text-purple-700 transition-all duration-200 hover:scale-105 hover:bg-white/90"
                >
                  {t("pages.advice.ctaButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
