import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("contact.form.nameRequired")),
    contactNumber: Yup.string().required(
      t("contact.form.contactNumberRequired")
    ),
    email: Yup.string().email(t("contact.form.emailInvalid")),
    message: Yup.string().max(500, t("contact.form.messageMax")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      email: "",
      message: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setError(null);

      try {
        if (import.meta.env.DEV) {
          console.log("Form submitted (dev mode):", values);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error("Failed to submit");
          }
        }

        setIsSuccess(true);
        resetForm();
      } catch {
        setError(t("contact.form.error"));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="animate-fade-in-up text-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {t("contact.title")}
          </span>
        </h1>
        <p className="animate-fade-in-up animation-delay-200 mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("contact.description")}
        </p>
      </div>

      {/* Contact Info Cards - Horizontal Row */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Card className="animate-fade-in-scale animation-delay-300 border-purple-500/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {t("contact.info.email")}
              </CardTitle>
              <CardDescription>contact@skkonsulent.no</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="animate-fade-in-scale animation-delay-400 border-purple-500/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {t("contact.info.phone")}
              </CardTitle>
              <CardDescription>+47 XXX XX XXX</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="animate-fade-in-scale animation-delay-500 border-purple-500/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {t("contact.info.location")}
              </CardTitle>
              <CardDescription>Norway</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Contact Form - Full Width Below */}
      <Card className="animate-fade-in-up animation-delay-600 mt-8 border-purple-500/20 bg-card/50 backdrop-blur-sm">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5" />
        <CardHeader className="relative">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-center text-2xl">
            {t("contact.form.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("contact.form.subtitle")}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">
                {t("contact.form.successTitle")}
              </h3>
              <p className="mt-2 text-center text-muted-foreground">
                {t("contact.form.successMessage")}
              </p>
              <Button
                onClick={() => setIsSuccess(false)}
                className="mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              >
                {t("contact.form.sendAnother")}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              className="mx-auto max-w-2xl space-y-5"
            >
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {t("contact.form.name")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder={t("contact.form.namePlaceholder")}
                    disabled={isSubmitting}
                    {...formik.getFieldProps("name")}
                    className={
                      formik.touched.name && formik.errors.name
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-destructive">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">
                    {t("contact.form.contactNumber")}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactNumber"
                    placeholder={t("contact.form.contactNumberPlaceholder")}
                    disabled={isSubmitting}
                    {...formik.getFieldProps("contactNumber")}
                    className={
                      formik.touched.contactNumber &&
                      formik.errors.contactNumber
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {formik.touched.contactNumber &&
                    formik.errors.contactNumber && (
                      <p className="text-sm text-destructive">
                        {formik.errors.contactNumber}
                      </p>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                  disabled={isSubmitting}
                  {...formik.getFieldProps("email")}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "border-destructive"
                      : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-destructive">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  {t("contact.form.message")}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({formik.values.message.length}/500)
                  </span>
                </Label>
                <Textarea
                  id="message"
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={5}
                  disabled={isSubmitting}
                  {...formik.getFieldProps("message")}
                  className={
                    formik.touched.message && formik.errors.message
                      ? "border-destructive"
                      : ""
                  }
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-sm text-destructive">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("contact.form.submitting")}
                  </>
                ) : (
                  t("contact.form.submit")
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
