import { z } from "zod";

export const generalSubmissionSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().optional(),
    queryType: z.enum([
        "general-question",
        "quote-request",
        "support-request",
        "privacy-request",
        "security-concern",
        "billing",
        "partnership",
        "other",
    ], {
        message: "Please select a query type",
    }),
    urgency: z.enum(["low", "normal", "urgent"], {
        message: "Please select a priority level",
    }),
    summary: z.string().min(20, "Please add a few more details so we can help"),
    hasSensitiveData: z.boolean().default(false),
    noSecretsAcknowledged: z.boolean().refine((val) => val === true, {
        message: "Please confirm you are not submitting passwords or payment details",
    }),
    consentGiven: z.boolean().refine((val) => val === true, {
        message: "You must agree to the privacy policy",
    }),
});

export type GeneralSubmissionFormData = z.infer<typeof generalSubmissionSchema>;
