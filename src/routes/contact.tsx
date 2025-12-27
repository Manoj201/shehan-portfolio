import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Send,
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
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
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12 lg:py-16">
        {/* Header */}
        <div className="animate-fade-in-up mb-12 text-center lg:mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t("contact.title")}
            </span>
          </h1>
          <p className="animate-fade-in-up animation-delay-200 mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("contact.description")}
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="animate-fade-in-up animation-delay-300 space-y-6 lg:col-span-2">
            {/* Contact Info Card */}
            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-semibold text-white">
                {t("contact.info.title")}
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <a
                  href="mailto:post@skkonsulent.no"
                  className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-500/20">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.info.email")}
                    </p>
                    <p className="font-medium text-white transition-colors group-hover:text-purple-400">
                      post@skkonsulent.no
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+4796699204"
                  className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/20">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.info.phone")}
                    </p>
                    <p className="font-medium text-white transition-colors group-hover:text-purple-400">
                      +47 966 99 204
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 rounded-xl p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.info.location")}
                    </p>
                    <p className="font-medium text-white">
                      Bøgardsvegen 50A
                      <br />
                      6814 Førde, Norway
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="text-lg">💬</span> {t("contact.info.note")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="animate-fade-in-up animation-delay-400 lg:col-span-3">
            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm md:p-8">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 ring-4 ring-green-500/10">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {t("contact.form.successTitle")}
                  </h3>
                  <p className="mt-3 text-center text-muted-foreground">
                    {t("contact.form.successMessage")}
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 text-white hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    {t("contact.form.sendAnother")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                      {t("contact.form.title")}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("contact.form.subtitle")}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-2 text-sm"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          {t("contact.form.name")}
                          <span className="text-pink-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder={t("contact.form.namePlaceholder")}
                          disabled={isSubmitting}
                          {...formik.getFieldProps("name")}
                          className={`h-12 border-white/10 bg-white/5 transition-colors focus:border-purple-500/50 focus:bg-white/10 ${
                            formik.touched.name && formik.errors.name
                              ? "border-destructive"
                              : ""
                          }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <p className="text-xs text-destructive">
                            {formik.errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="contactNumber"
                          className="flex items-center gap-2 text-sm"
                        >
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {t("contact.form.contactNumber")}
                          <span className="text-pink-500">*</span>
                        </Label>
                        <Input
                          id="contactNumber"
                          placeholder={t(
                            "contact.form.contactNumberPlaceholder"
                          )}
                          disabled={isSubmitting}
                          {...formik.getFieldProps("contactNumber")}
                          className={`h-12 border-white/10 bg-white/5 transition-colors focus:border-purple-500/50 focus:bg-white/10 ${
                            formik.touched.contactNumber &&
                            formik.errors.contactNumber
                              ? "border-destructive"
                              : ""
                          }`}
                        />
                        {formik.touched.contactNumber &&
                          formik.errors.contactNumber && (
                            <p className="text-xs text-destructive">
                              {formik.errors.contactNumber}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm"
                      >
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {t("contact.form.email")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("contact.form.emailPlaceholder")}
                        disabled={isSubmitting}
                        {...formik.getFieldProps("email")}
                        className={`h-12 border-white/10 bg-white/5 transition-colors focus:border-purple-500/50 focus:bg-white/10 ${
                          formik.touched.email && formik.errors.email
                            ? "border-destructive"
                            : ""
                        }`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-xs text-destructive">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="flex items-center gap-2 text-sm"
                      >
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        {t("contact.form.message")}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {formik.values.message.length}/500
                        </span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t("contact.form.messagePlaceholder")}
                        rows={4}
                        disabled={isSubmitting}
                        {...formik.getFieldProps("message")}
                        className={`resize-none border-white/10 bg-white/5 transition-colors focus:border-purple-500/50 focus:bg-white/10 ${
                          formik.touched.message && formik.errors.message
                            ? "border-destructive"
                            : ""
                        }`}
                      />
                      {formik.touched.message && formik.errors.message && (
                        <p className="text-xs text-destructive">
                          {formik.errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-base font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("contact.form.submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t("contact.form.submit")}
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
