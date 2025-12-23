import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, FileCheck, Briefcase, Users, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/advice")({
  component: AdvicePage,
});

interface AdviceItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const adviceItems: AdviceItem[] = [
  {
    icon: Globe,
    titleKey: "pages.advice.cards.immigration.title",
    descriptionKey: "pages.advice.cards.immigration.description",
  },
  {
    icon: FileCheck,
    titleKey: "pages.advice.cards.residence.title",
    descriptionKey: "pages.advice.cards.residence.description",
  },
  {
    icon: Briefcase,
    titleKey: "pages.advice.cards.work.title",
    descriptionKey: "pages.advice.cards.work.description",
  },
  {
    icon: Users,
    titleKey: "pages.advice.cards.family.title",
    descriptionKey: "pages.advice.cards.family.description",
  },
  {
    icon: CreditCard,
    titleKey: "pages.advice.cards.tax.title",
    descriptionKey: "pages.advice.cards.tax.description",
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
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="animate-fade-in-up text-4xl font-bold md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {t("pages.advice.title")}
          </span>
        </h1>
        <p className="animate-fade-in-up animation-delay-200 mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("pages.advice.description")}
        </p>
      </div>

      {/* Advice Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adviceItems.map((item, index) => (
          <Link key={item.titleKey} to="/contact">
            <Card
              className={`animate-fade-in-scale ${getAnimationDelay(index)} group h-full cursor-pointer border-purple-500/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20`}
            >
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-purple-400">
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
    </div>
  );
}
