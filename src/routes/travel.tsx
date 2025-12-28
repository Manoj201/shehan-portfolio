import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Calendar,
  Check,
  Plane,
  Star,
  Sparkles,
  Info,
  MapPin,
  Utensils,
  Hotel,
  Camera,
  X,
} from "lucide-react";

// Import Sri Lanka images
import img1 from "@/assets/sl/1.png";
import img3 from "@/assets/sl/3.png";
import img5 from "@/assets/sl/5.png";
import img6 from "@/assets/sl/6.png";
import img7 from "@/assets/sl/7.png";

export const Route = createFileRoute("/travel")({
  component: TravelPage,
});

const images = [
  { src: img1, alt: "Sri Lanka Beach" },
  { src: img3, alt: "Sri Lanka Temple" },
  { src: img5, alt: "Sri Lanka Nature" },
  { src: img6, alt: "Sri Lanka Wildlife" },
  { src: img7, alt: "Sri Lanka Landscape" },
];

interface TravelPackage {
  id: string;
  duration: string;
  durationKey: string;
  price: number;
  features: string[];
  popular?: boolean;
  detailsKey: string;
  itineraryKey: string;
  includesKey: string;
}

const travelPackages: TravelPackage[] = [
  {
    id: "1-week",
    duration: "7",
    durationKey: "pages.travel.packages.week1.title",
    price: 12999,
    features: [
      "pages.travel.packages.week1.feature1",
      "pages.travel.packages.week1.feature2",
      "pages.travel.packages.week1.feature3",
      "pages.travel.packages.week1.feature4",
    ],
    detailsKey: "pages.travel.packages.week1.details",
    itineraryKey: "pages.travel.packages.week1.itinerary",
    includesKey: "pages.travel.packages.week1.includes",
  },
  {
    id: "10-days",
    duration: "10",
    durationKey: "pages.travel.packages.days10.title",
    price: 16999,
    features: [
      "pages.travel.packages.days10.feature1",
      "pages.travel.packages.days10.feature2",
      "pages.travel.packages.days10.feature3",
      "pages.travel.packages.days10.feature4",
    ],
    popular: true,
    detailsKey: "pages.travel.packages.days10.details",
    itineraryKey: "pages.travel.packages.days10.itinerary",
    includesKey: "pages.travel.packages.days10.includes",
  },
  {
    id: "2-weeks",
    duration: "14",
    durationKey: "pages.travel.packages.weeks2.title",
    price: 21999,
    features: [
      "pages.travel.packages.weeks2.feature1",
      "pages.travel.packages.weeks2.feature2",
      "pages.travel.packages.weeks2.feature3",
      "pages.travel.packages.weeks2.feature4",
    ],
    detailsKey: "pages.travel.packages.weeks2.details",
    itineraryKey: "pages.travel.packages.weeks2.itinerary",
    includesKey: "pages.travel.packages.weeks2.includes",
  },
  {
    id: "20-days",
    duration: "20",
    durationKey: "pages.travel.packages.days20.title",
    price: 28999,
    features: [
      "pages.travel.packages.days20.feature1",
      "pages.travel.packages.days20.feature2",
      "pages.travel.packages.days20.feature3",
      "pages.travel.packages.days20.feature4",
    ],
    detailsKey: "pages.travel.packages.days20.details",
    itineraryKey: "pages.travel.packages.days20.itinerary",
    includesKey: "pages.travel.packages.days20.includes",
  },
];

function TravelPage() {
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePackageClick = (packageId: string) => {
    // Placeholder for future functionality
    console.log("Package selected:", packageId);
  };

  const handleMoreInfo = (e: React.MouseEvent, pkg: TravelPackage) => {
    e.stopPropagation();
    setSelectedPackage(pkg);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="animate-fade-in-up mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Plane className="h-4 w-4" />
            {t("pages.travel.badge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t("pages.travel.title")}
            </span>
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("pages.travel.description")}
          </p>
        </div>

        {/* Image Carousel */}
        <div className="animate-fade-in-up animation-delay-300 mx-auto mb-16 max-w-4xl px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-2xl border border-purple-500/20">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-purple-500/30 bg-background/80 backdrop-blur-sm hover:bg-purple-500/20" />
            <CarouselNext className="border-purple-500/30 bg-background/80 backdrop-blur-sm hover:bg-purple-500/20" />
          </Carousel>
        </div>

        {/* Section Title */}
        <div className="animate-fade-in-up animation-delay-400 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t("pages.travel.packagesTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("pages.travel.packagesSubtitle")}
          </p>
        </div>

        {/* Travel Packages Grid */}
        <div className="animate-fade-in-up animation-delay-500 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {travelPackages.map((pkg) => (
            <Card
              key={pkg.id}
              onClick={() => handlePackageClick(pkg.id)}
              className={`group relative cursor-pointer overflow-hidden border-purple-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 ${
                pkg.popular ? "ring-2 ring-purple-500" : ""
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -right-8 top-6 rotate-45 bg-gradient-to-r from-pink-500 to-purple-600 px-10 py-1 text-xs font-semibold text-white shadow-lg">
                  <Star className="mr-1 inline h-3 w-3" />
                  {t("pages.travel.popular")}
                </div>
              )}

              <CardHeader className="pb-4">
                {/* Duration Badge */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-110">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-white">
                      {pkg.duration}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {t("pages.travel.days")}
                    </span>
                  </div>
                </div>

                <CardTitle className="text-xl text-white transition-colors duration-300 group-hover:text-purple-400">
                  {t(pkg.durationKey)}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("pages.travel.packageDesc")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 shrink-0 text-green-500" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>

                {/* More Info Link */}
                <button
                  onClick={(e) => handleMoreInfo(e, pkg)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 py-2 text-sm text-purple-300 transition-all hover:border-purple-500/50 hover:bg-purple-500/20"
                >
                  <Info className="h-4 w-4" />
                  {t("pages.travel.moreInfo")}
                </button>

                {/* Price */}
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">
                      {t("pages.travel.from")}
                    </span>
                    <span className="text-3xl font-bold text-white">
                      {pkg.price.toLocaleString()}
                    </span>
                    <span className="text-lg font-semibold text-purple-400">
                      NOK
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("pages.travel.perPerson")}
                  </p>
                </div>

                {/* CTA Button */}
                <Link to="/contact" onClick={(e) => e.stopPropagation()}>
                  <Button
                    className={`w-full transition-all duration-300 ${
                      pkg.popular
                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t("pages.travel.bookNow")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="animate-fade-in-up animation-delay-600 mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-purple-500/20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 p-8">
            <h3 className="text-xl font-semibold text-white">
              {t("pages.travel.customTitle")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("pages.travel.customDesc")}
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
              onClick={() => (window.location.href = "/contact")}
            >
              {t("pages.travel.contactUs")}
            </Button>
          </div>
        </div>
      </div>

      {/* Package Details Drawer */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="bottom"
      >
        <DrawerContent className="max-h-[90vh] rounded-t-[20px]">
          {selectedPackage && (
            <>
              <DrawerHeader className="relative border-b border-purple-500/20 pb-4">
                <DrawerClose className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-5 w-5" />
                </DrawerClose>
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-500/20">
                    <Calendar className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <DrawerTitle className="text-xl text-white">
                      {t(selectedPackage.durationKey)}
                    </DrawerTitle>
                    <DrawerDescription className="flex items-center gap-2">
                      <span className="font-semibold text-purple-400">
                        {selectedPackage.duration} {t("pages.travel.days")}
                      </span>
                      <span>•</span>
                      <span>{selectedPackage.price.toLocaleString()} NOK</span>
                    </DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {/* Package Description */}
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold text-white">
                    {t("pages.travel.drawer.about")}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(selectedPackage.detailsKey)}
                  </p>
                </div>

                {/* What's Included */}
                <div className="mb-6 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <h3 className="mb-3 font-semibold text-white">
                    {t("pages.travel.drawer.included")}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                        <Plane className="h-4 w-4 text-green-400" />
                      </div>
                      {t("pages.travel.drawer.flights")}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                        <Hotel className="h-4 w-4 text-blue-400" />
                      </div>
                      {t("pages.travel.drawer.hotels")}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20">
                        <Utensils className="h-4 w-4 text-orange-400" />
                      </div>
                      {t("pages.travel.drawer.meals")}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                        <Camera className="h-4 w-4 text-purple-400" />
                      </div>
                      {t("pages.travel.drawer.tours")}
                    </div>
                  </div>
                </div>

                {/* Itinerary Highlights */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-white">
                    {t("pages.travel.drawer.itinerary")}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(selectedPackage.itineraryKey)}
                  </p>
                </div>

                {/* Destinations */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-white">
                    {t("pages.travel.drawer.destinations")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Colombo",
                      "Sigiriya",
                      "Kandy",
                      "Ella",
                      "Galle",
                      "Mirissa",
                    ].map((destination) => (
                      <span
                        key={destination}
                        className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                      >
                        <MapPin className="h-3 w-3" />
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h3 className="mb-3 font-semibold text-white">
                    {t("pages.travel.drawer.highlights")}
                  </h3>
                  <ul className="space-y-2">
                    {selectedPackage.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 shrink-0 text-green-500" />
                        {t(feature)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <DrawerFooter className="border-t border-purple-500/20 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    window.location.href = "/contact";
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t("pages.travel.drawer.bookThis")}
                </Button>
                <div className="h-4" />
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
