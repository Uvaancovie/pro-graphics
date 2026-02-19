import { z } from "zod";

const baseSchema = z.object({
    // Personal Information
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    company: z.string().optional(),

    // Service Selection
    serviceType: z.enum([
        "vehicle-branding",
        "sign-boards",
        "contravisions",
        "custom-stickers",
        "banners-flags",
        "promotional-materials",
    ], {
        message: "Please select a service type",
    }),

    // Additional (Optional in both)
    additionalNotes: z.string().optional(),
    hearAboutUs: z.string().optional(),
});

export const quickQuoteSchema = baseSchema;

export const detailedQuoteSchema = baseSchema.extend({
    // Service-Specific Fields
    vehicleType: z.string().optional(),
    coverageLevel: z.enum(["spot", "partial", "full"]).optional(),

    signMaterial: z.enum(["chromadek", "abs", "perspex"]).optional(),
    signDimensions: z.string().optional(),

    stickerQuantity: z.number().min(1).optional(),
    stickerSize: z.string().optional(),

    // Project Details
    projectDescription: z.string().min(10, "Please provide more details about your project"),
    budget: z.enum(["under-5k", "5k-15k", "15k-30k", "30k-50k", "50k-plus"], {
        message: "Please select a budget range",
    }),
    timeline: z.enum(["urgent", "1-2-weeks", "2-4-weeks", "flexible"], {
        message: "Please select a timeline",
    }),

    // File Uploads (handled separately in form)
    hasDesignFiles: z.boolean().default(false),
});

export type QuickQuoteFormData = z.infer<typeof quickQuoteSchema>;
export type DetailedQuoteFormData = z.infer<typeof detailedQuoteSchema>;
export type QuoteFormData = DetailedQuoteFormData; // For backward compatibility
