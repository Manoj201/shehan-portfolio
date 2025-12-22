import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
        // In development, log and simulate success
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

        // Auto close after 2 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onOpenChange(false);
        }, 2000);
      } catch {
        setError(t("contact.form.error"));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      formik.resetForm();
      setIsSuccess(false);
      setError(null);
    }
    onOpenChange(isOpen);
  };

  const successContent = (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold">{t("contact.form.successTitle")}</h3>
      <p className="mt-2 text-center text-muted-foreground">
        {t("contact.form.successMessage")}
      </p>
    </div>
  );

  const formContent = (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">
          {t("contact.form.name")} <span className="text-destructive">*</span>
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
          <p className="text-sm text-destructive">{formik.errors.name}</p>
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
            formik.touched.contactNumber && formik.errors.contactNumber
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.contactNumber && formik.errors.contactNumber && (
          <p className="text-sm text-destructive">
            {formik.errors.contactNumber}
          </p>
        )}
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
          <p className="text-sm text-destructive">{formik.errors.email}</p>
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
          rows={4}
          disabled={isSubmitting}
          {...formik.getFieldProps("message")}
          className={
            formik.touched.message && formik.errors.message
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.message && formik.errors.message && (
          <p className="text-sm text-destructive">{formik.errors.message}</p>
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
  );

  const mobileFormContent = (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">
          {t("contact.form.name")} <span className="text-destructive">*</span>
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
          <p className="text-sm text-destructive">{formik.errors.name}</p>
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
            formik.touched.contactNumber && formik.errors.contactNumber
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.contactNumber && formik.errors.contactNumber && (
          <p className="text-sm text-destructive">
            {formik.errors.contactNumber}
          </p>
        )}
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
          <p className="text-sm text-destructive">{formik.errors.email}</p>
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
          rows={4}
          disabled={isSubmitting}
          {...formik.getFieldProps("message")}
          className={
            formik.touched.message && formik.errors.message
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.message && formik.errors.message && (
          <p className="text-sm text-destructive">{formik.errors.message}</p>
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
      <div className="h-8 shrink-0" />
    </form>
  );

  const headerContent = (
    <>
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
        <Sparkles className="h-7 w-7 text-white" />
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="border-purple-500/20 bg-background/95 backdrop-blur-xl sm:max-w-md">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10" />
          {isSuccess ? (
            <div className="relative">{successContent}</div>
          ) : (
            <>
              <DialogHeader className="relative">
                {headerContent}
                <DialogTitle className="text-center text-2xl">
                  {t("contact.title")}
                </DialogTitle>
                <DialogDescription className="text-center">
                  {t("contact.description")}
                </DialogDescription>
              </DialogHeader>
              <div className="relative mt-4">{formContent}</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="border-purple-500/20 bg-background/95 backdrop-blur-xl max-h-[90vh]">
        <div className="absolute inset-0 rounded-t-lg bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />
        <div className="mx-auto w-full max-w-md flex flex-col overflow-hidden">
          {isSuccess ? (
            <div className="relative px-4 py-8">{successContent}</div>
          ) : (
            <>
              <DrawerHeader className="relative text-center flex-shrink-0">
                {headerContent}
                <DrawerTitle className="text-2xl">{t("contact.title")}</DrawerTitle>
                <DrawerDescription>{t("contact.description")}</DrawerDescription>
              </DrawerHeader>
              <div className="relative flex-1 overflow-y-auto px-4">
                {mobileFormContent}
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
