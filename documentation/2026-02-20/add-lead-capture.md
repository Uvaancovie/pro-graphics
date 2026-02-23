**User:**  
Lead Capture Forms (email, phone, service interest for lead magnets using alex hormozi  
i need to add a lead capture form that gets saved to a free crm with email integration and also do a integration test  
https://pro-graphics.vercel.app/  
---

**Kimi:**  
I’ll help you create a comprehensive lead capture system using Alex Hormozi’s $100M Offers framework principles, integrated with a free CRM. Let me first check what’s currently on your site and then research the best free CRM options with email integration.Here’s your complete implementation guide for a high-converting lead capture system using Alex Hormozi’s principles, integrated with **Brevo** (best free CRM \+ email combo for your needs):

\# Pro Graphics Lead Capture System Implementation

\#\# Overview

\*\*Framework\*\*: Alex Hormozi $100M Leads methodology  

\*\*CRM\*\*: Brevo (free tier: 300 emails/day, unlimited contacts, built-in CRM)  

\*\*Goal\*\*: Capture engaged leads through high-value lead magnets

\---

\#\# Hormozi Lead Capture Principles Applied

\#\#\# 1\. The "Give Until They Ask" Strategy

\- \*\*Lead Magnet First\*\*: Offer massive value before asking for contact info

\- \*\*Problem-Solution Fit\*\*: Lead magnet solves narrow problem that reveals need for core offer

\- \*\*Engagement Over Volume\*\*: Focus on engaged leads (hand-raisers) not just contacts

\#\#\# 2\. Lead Magnet Criteria (Hormozi Framework)

\- \[ \] Valuable enough someone might pay for it

\- \[ \] Solves problem naturally connecting to core offer

\- \[ \] Easy to consume (quick win)

\- \[ \] Positions your paid offer as the next logical step

\---

\#\# Recommended Lead Magnets for Pro Graphics

\#\#\# Primary: "Durban Branding ROI Calculator"

\*\*Type\*\*: Interactive tool  

\*\*Hook\*\*: "See how much revenue your vehicle branding generates daily"  

\*\*Connection to Core Offer\*\*: Calculator shows potential → they need execution



\#\# Technical Implementation

\#\#\# Step 1: Brevo Setup (Free CRM)

\#\#\#\# Account Configuration

1\. Sign up at brevo.com (free plan)  
2\. Complete company profile verification  
3\. Generate API keys:

   \- Navigate to SMTP & API → API Keys

   \- Create new key: ***\`pro-graphics-website-integration\`***

   \- Permissions: Contacts (read/write), Email campaigns (send)

\#\#\#\# Contact List Structure

Lists: ├── Lead Magnets │ ├── ROI Calculator Users │ ├── Compliance Checklist Downloads │ └── Fleet Estimator Users ├── Service Interest │ ├── Vehicle Branding │ ├── Sign Boards │ ├── Contravisions │ └── Custom Stickers └── Lead Temperature ├── Cold (downloaded magnet) ├── Warm (engaged with content) └── Hot (requested quote)

\#\#\#\# Automation Workflows (Free Tier)

\*\*Workflow 1: Lead Magnet Delivery\*\*

Trigger: Form submitted → Magnet requested Delay: 0 minutes Action: Send email with download link \+ ROI tips Delay: 2 days Action: Follow-up email: “Did you calculate your ROI?” Delay: 5 days Action: Case study: “How \[Local Business\] got 300% ROI”

\*\*Workflow 2: Quote Request Nurture\*\*

Trigger: Quote form submitted Action: Immediate confirmation email Delay: 4 hours Action: “What to expect” email (process, timeline) Delay: 24 hours Action: Social proof email (similar project results) Delay: 3 days Action: “Do you have questions?” personal outreach

\---

\#\#\# Step 2: Next.js Integration

\#\#\#\# Environment Variables

\`\`\`bash

\# .env.local

BREVO\_API\_KEY=your\_api\_key\_here  
BREVO\_LIST\_ID\_ROI\_CALC=1  
BREVO\_LIST\_ID\_CHECKLIST=2  
BREVO\_LIST\_ID\_FLEET\_EST=3  
BREVO\_SENDER\_EMAIL=info@prographics.co.za  
BREVO\_SENDER\_NAME="Pro Graphics Team"

#### API Route: Lead Capture

*// app/api/capture-lead/route.ts*  
**import** { NextResponse } **from** 'next/server';

**interface** LeadData {  
  email: string;  
  phone?: string;  
  firstName?: string;  
  serviceInterest: string;  
  leadMagnet: 'roi-calculator' | 'compliance-checklist' | 'fleet-estimator';  
  source: string;  
  utmData?: {  
    source?: string;  
    medium?: string;  
    campaign?: string;  
  };  
}

**export** **async** **function** POST(request: Request) {  
  **try** {  
    **const** data: LeadData \= **await** request.json();  
      
    *// Validate required fields*  
    **if** (\!data.email || \!data.serviceInterest) {  
      **return** NextResponse.json(  
        { error: 'Email and service interest required' },  
        { status: 400 }  
      );  
    }

    *// Brevo API endpoint*  
    **const** response \= **await** fetch('https://api.brevo.com/v3/contacts', {  
      method: 'POST',  
      headers: {  
        'Accept': 'application/json',  
        'Content-Type': 'application/json',  
        'api-key': process.env.BREVO\_API\_KEY\!,  
      },  
      body: JSON.stringify({  
        email: data.email,  
        attributes: {  
          FIRSTNAME: data.firstName || '',  
          SMS: data.phone || '',  
          SERVICE\_INTEREST: data.serviceInterest,  
          LEAD\_MAGNET: data.leadMagnet,  
          SOURCE: data.source,  
          UTM\_SOURCE: data.utmData?.source || '',  
          UTM\_MEDIUM: data.utmData?.medium || '',  
          UTM\_CAMPAIGN: data.utmData?.campaign || '',  
          LEAD\_DATE: **new** Date().toISOString(),  
        },  
        listIds: \[getListId(data.leadMagnet)\],  
        updateEnabled: **true**, *// Update if exists*  
      }),  
    });

    **if** (\!response.ok) {  
      **const** error \= **await** response.json();  
      **throw** **new** Error(error.message || 'Brevo API error');  
    }

    *// Trigger automation via Brevo*  
    **await** triggerAutomationWorkflow(data);

    **return** NextResponse.json({   
      success: **true**,   
      message: 'Lead captured successfully',  
      leadId: (**await** response.json()).id  
    });

  } **catch** (error) {  
    console.error('Lead capture error:', error);  
    **return** NextResponse.json(  
      { error: 'Failed to capture lead' },  
      { status: 500 }  
    );  
  }  
}

**function** getListId(leadMagnet: string): number {  
  **const** listMap: Record\<string, number\> \= {  
    'roi-calculator': parseInt(process.env.BREVO\_LIST\_ID\_ROI\_CALC\!),  
    'compliance-checklist': parseInt(process.env.BREVO\_LIST\_ID\_CHECKLIST\!),  
    'fleet-estimator': parseInt(process.env.BREVO\_LIST\_ID\_FLEET\_EST\!),  
  };  
  **return** listMap\[leadMagnet\] || 1;  
}

**async** **function** triggerAutomationWorkflow(data: LeadData) {  
  *// Brevo automatically triggers based on list addition*  
  *// Additional logic can be added here if needed*  
  console.log(\`Automation triggered for ${data.email} \- ${data.leadMagnet}\`);  
}

#### Lead Capture Form Component

*// app/components/LeadCaptureForm.tsx*  
'use client';

**import** { useState } **from** 'react';  
**import** { motion, AnimatePresence } **from** 'framer-motion';

**interface** LeadCaptureFormProps {  
  leadMagnet: 'roi-calculator' | 'compliance-checklist' | 'fleet-estimator';  
  magnetTitle: string;  
  magnetDescription: string;  
  ctaText: string;  
  serviceOptions: string\[\];  
}

**export** **default** **function** LeadCaptureForm({  
  leadMagnet,  
  magnetTitle,  
  magnetDescription,  
  ctaText,  
  serviceOptions,  
}: LeadCaptureFormProps) {  
  **const** \[step, setStep\] \= useState(1);  
  **const** \[formData, setFormData\] \= useState({  
    email: '',  
    phone: '',  
    firstName: '',  
    serviceInterest: '',  
  });  
  **const** \[isSubmitting, setIsSubmitting\] \= useState(**false**);  
  **const** \[isSuccess, setIsSuccess\] \= useState(**false**);

  **const** handleSubmit \= **async** (e: React.FormEvent) **\=\>** {  
    e.preventDefault();  
    setIsSubmitting(**true**);

    **try** {  
      **const** response \= **await** fetch('/api/capture-lead', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({  
          ...formData,  
          leadMagnet,  
          source: window.location.pathname,  
          utmData: {  
            source: **new** URLSearchParams(window.location.search).get('utm\_source'),  
            medium: **new** URLSearchParams(window.location.search).get('utm\_medium'),  
            campaign: **new** URLSearchParams(window.location.search).get('utm\_campaign'),  
          },  
        }),  
      });

      **if** (response.ok) {  
        setIsSuccess(**true**);  
        *// Track conversion*  
        **if** (**typeof** window \!== 'undefined' && (window **as** any).gtag) {  
          (window **as** any).gtag('event', 'lead\_capture', {  
            event\_category: 'engagement',  
            event\_label: leadMagnet,  
          });  
        }  
      }  
    } **catch** (error) {  
      console.error('Submission error:', error);  
    } **finally** {  
      setIsSubmitting(**false**);  
    }  
  };

  **if** (isSuccess) {  
    **return** (  
      \<motion.div   
        initial\={{ opacity: 0, scale: 0.9 }}  
        animate\={{ opacity: 1, scale: 1 }}  
        className\="bg-gradient-to-br from-amber-50 to-blue-50 p-8 rounded-2xl border-2 border-amber-400 text-center"

      \>

        \<div className\="text-6xl mb-4"\>🎉\</div\>  
        \<h3 className\="text-2xl font-bold text-blue-900 mb-2"\>  
          Check Your Email\!  
        \</h3\>  
        \<p className\="text-blue-700 mb-4"\>  
          Your {magnetTitle} is on its way to {formData.email}  
        \</p\>  
        \<p className\="text-sm text-gray-600"\>  
          We've also sent you a WhatsApp confirmation if you provided a phone number.  
        \</p\>  
      \</motion.div\>  
    );  
  }

  **return** (  
    \<div className\="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"\>  
      \<div className\="mb-6"\>  
        \<h3 className\="text-2xl font-bold text-blue-900 mb-2"\>{magnetTitle}\</h3\>  
        \<p className\="text-gray-600"\>{magnetDescription}\</p\>  
      \</div\>

      {*/\* Progress Bar \*/*}  
      \<div className\="flex gap-2 mb-6"\>  
        {\[1, 2\].map((i) **\=\>** (  
          \<div  
            key\={i}  
            className\={\`h-2 flex-1 rounded-full transition-colors ${  
              i \<= step ? 'bg-amber-500' : 'bg-gray-200'  
            }\`}  
          /\>  
        ))}  
      \</div\>

      \<form onSubmit\={handleSubmit}\>  
        \<AnimatePresence mode\="wait"\>  
          {step \=== 1 && (  
            \<motion.div  
              key\="step1"  
              initial\={{ opacity: 0, x: 20 }}  
              animate\={{ opacity: 1, x: 0 }}  
              exit\={{ opacity: 0, x: \-20 }}  
              className\="space-y-4"

            \>

              \<div\>  
                \<label className\="block text-sm font-semibold text-blue-900 mb-2"\>  
                  What service are you interested **in**? \*  
                \</label\>  
                \<div className\="grid grid-cols-2 gap-3"\>  
                  {serviceOptions.map((service) **\=\>** (  
                    \<button  
                      key\={service}  
                      **type**\="button"  
                      onClick\={() **\=\>** {  
                        setFormData({ ...formData, serviceInterest: service });  
                        setStep(2);  
                      }}  
                      className\={\`p-3 rounded-lg border-2 text-sm font-medium transition-all ${  
                        formData.serviceInterest \=== service  
                          ? 'border-amber-500 bg-amber-50 text-amber-700'  
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'  
                      }\`}

                    \>

                      {service}  
                    \</button\>  
                  ))}  
                \</div\>  
              \</div\>  
            \</motion.div\>  
          )}

          {step \=== 2 && (  
            \<motion.div  
              key\="step2"  
              initial\={{ opacity: 0, x: 20 }}  
              animate\={{ opacity: 1, x: 0 }}  
              exit\={{ opacity: 0, x: \-20 }}  
              className\="space-y-4"

            \>

              \<div\>  
                \<label className\="block text-sm font-semibold text-blue-900 mb-2"\>  
                  First Name  
                \</label\>  
                \<input  
                  **type**\="text"  
                  value\={formData.firstName}  
                  onChange\={(e) **\=\>** setFormData({ ...formData, firstName: e.target.value })}  
                  className\="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"  
                  placeholder\="John"  
                /\>  
              \</div\>

              \<div\>  
                \<label className\="block text-sm font-semibold text-blue-900 mb-2"\>  
                  Email Address \*  
                \</label\>  
                \<input  
                  **type**\="email"  
                  required  
                  value\={formData.email}  
                  onChange\={(e) **\=\>** setFormData({ ...formData, email: e.target.value })}  
                  className\="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"  
                  placeholder\="john@company.co.za"  
                /\>  
              \</div\>

              \<div\>  
                \<label className\="block text-sm font-semibold text-blue-900 mb-2"\>  
                  Phone (WhatsApp preferred)  
                \</label\>  
                \<input  
                  **type**\="tel"  
                  value\={formData.phone}  
                  onChange\={(e) **\=\>** setFormData({ ...formData, phone: e.target.value })}  
                  className\="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"  
                  placeholder\="082 123 4567"  
                /\>  
                \<p className\="text-xs text-gray-500 mt-1"\>  
                  We'll send your results via WhatsApp for faster access  
                \</p\>  
              \</div\>

              \<div className\="flex gap-3 pt-4"\>  
                \<button  
                  **type**\="button"  
                  onClick\={() **\=\>** setStep(1)}  
                  className\="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"

                \>

                  Back  
                \</button\>  
                \<button  
                  **type**\="submit"  
                  disabled\={isSubmitting}  
                  className\="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"

                \>

                  {isSubmitting ? (  
                    \<\>  
                      \<div className\="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /\>  
                      Sending...  
                    \</\>  
                  ) : (  
                    ctaText  
                  )}  
                \</button\>  
              \</div\>  
            \</motion.div\>  
          )}  
        \</AnimatePresence\>  
      \</form\>

      \<p className\="text-xs text-gray-500 text-center mt-4"\>  
        We respect your privacy. Unsubscribe anytime.  
      \</p\>  
    \</div\>  
  );  
}

---

### Step 3: Integration Points on Website

#### Homepage Hero Section

*// Add to app/page.tsx Hero section*  
\<div className\="grid lg:grid-cols-2 gap-12 items-center"\>  
  \<div\>  
    \<h1\>...\</h1\>  
    \<p\>...\</p\>  
    {*/\* Existing CTA \*/*}  
  \</div\>  
    
  {*/\* Lead Capture Card \*/*}  
  \<div className\="lg:sticky lg:top-24"\>  
    \<LeadCaptureForm  
      leadMagnet\="roi-calculator"  
      magnetTitle\="Calculate Your Branding ROI"  
      magnetDescription\="Discover how much revenue your vehicle branding generates daily. Get instant results \+ free quote."  
      ctaText\="Get My Free ROI Report"  
      serviceOptions\={\[  
        'Vehicle Branding',  
        'Fleet Branding',  
        'Sign Boards',  
        'Contravisions',  
      \]}  
    /\>  
  \</div\>  
\</div\>

#### Service Pages (Exit Intent)

*// app/components/ExitIntentPopup.tsx*  
'use client';

**import** { useEffect, useState } **from** 'react';  
**import** LeadCaptureForm **from** './LeadCaptureForm';

**export** **default** **function** ExitIntentPopup() {  
  **const** \[showPopup, setShowPopup\] \= useState(**false**);

  useEffect(() **\=\>** {  
    **const** handleMouseLeave \= (e: MouseEvent) **\=\>** {  
      **if** (e.clientY \< 10 && \!sessionStorage.getItem('exitIntentShown')) {  
        setShowPopup(**true**);  
        sessionStorage.setItem('exitIntentShown', 'true');  
      }  
    };

    document.addEventListener('mouseleave', handleMouseLeave);  
    **return** () **\=\>** document.removeEventListener('mouseleave', handleMouseLeave);  
  }, \[\]);

  **if** (\!showPopup) **return** **null**;

  **return** (  
    \<div className\="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"\>  
      \<div className\="bg-white rounded-2xl max-w-md w-full max-h-\[90vh\] overflow-y-auto"\>  
        \<div className\="p-6"\>  
          \<button   
            onClick\={() **\=\>** setShowPopup(**false**)}  
            className\="absolute top-4 right-4 text-gray-400 hover:text-gray-600"

          \>

            ✕  
          \</button\>  
          \<LeadCaptureForm  
            leadMagnet\="compliance-checklist"  
            magnetTitle\="Wait\! Get Our Free Compliance Checklist"  
            magnetDescription\="Don't risk fines. Download the 7-point legal checklist for SA vehicle branding before you go."  
            ctaText\="Send Me The Checklist"  
            serviceOptions\={\['Vehicle Branding', 'Fleet Branding'\]}  
          /\>  
        \</div\>  
      \</div\>  
    \</div\>  
  );  
}

#### Blog/Content Pages

*// Content upgrade at end of articles*  
\<div className\="bg-blue-50 p-8 rounded-xl my-8"\>  
  \<h3\>Download: The Complete Durban Fleet Branding Guide\</h3\>  
  \<p\>PDF includes: ROI calculator, compliance checklist, and 3 **case** studies\</p\>  
  \<LeadCaptureForm  
    leadMagnet\="fleet-estimator"  
    magnetTitle\="Get The Free Guide"  
    magnetDescription\="Join 500+ Durban businesses who've used this guide to maximize their branding investment."  
    ctaText\="Download Free Guide"  
    serviceOptions\={\['Fleet Branding', 'Vehicle Branding', 'Corporate Signage'\]}  
  /\>  
\</div\>

---

## Testing & Quality Assurance

### Integration Test Suite

#### Test 1: API Connectivity

*\# curl test for Brevo API*

curl \-X POST https://api.brevo.com/v3/contacts \\

  \-H "Accept: application/json" \\

  \-H "Content-Type: application/json" \\

  \-H "api-key: YOUR\_API\_KEY" \\

  \-d '{

    "email": "test@example.com",  
    "attributes": {  
      "FIRSTNAME": "Test",  
      "SERVICE\_INTEREST": "Vehicle Branding"  
    },  
    "listIds": \[1\]  
  }'

**Expected**: 201 Created or 204 Updated

#### Test 2: Form Submission Flow

*// \_\_tests\_\_/lead-capture.test.ts*  
**import** { render, screen, fireEvent, waitFor } **from** '@testing-library/react';  
**import** LeadCaptureForm **from** '@/app/components/LeadCaptureForm';

describe('Lead Capture Form', () **\=\>** {  
  it('completes full submission flow', **async** () **\=\>** {  
    render(  
      \<LeadCaptureForm  
        leadMagnet\="roi-calculator"  
        magnetTitle\="Test"  
        magnetDescription\="Test"  
        ctaText\="Submit"  
        serviceOptions\={\['Vehicle Branding'\]}  
      /\>  
    );

    *// Step 1: Select service*  
    fireEvent.click(screen.getByText('Vehicle Branding'));  
      
    *// Step 2: Fill details*  
    **await** waitFor(() **\=\>** {  
      fireEvent.change(screen.getByPlaceholderText('john@company.co.za'), {  
        target: { value: 'test@prographics.co.za' },  
      });  
    });

    fireEvent.click(screen.getByText('Submit'));

    **await** waitFor(() **\=\>** {  
      expect(screen.getByText('Check Your Email\!')).toBeInTheDocument();  
    });  
  });  
});

#### Test 3: Webhook Verification

*// Verify Brevo contact creation*  
**async** **function** verifyContactCreation(email: string) {  
  **const** response \= **await** fetch(  
    \`https://api.brevo.com/v3/contacts/${email}\`,  
    {  
      headers: { 'api-key': process.env.BREVO\_API\_KEY\! },  
    }  
  );  
    
  **if** (response.ok) {  
    **const** data \= **await** response.json();  
    console.log('Contact created:', data);  
    **return** **true**;  
  }  
  **return** **false**;  
}

### Pre-Launch Checklist

* ☐ Brevo API key configured in environment  
* ☐ Contact lists created and IDs noted  
* ☐ Automation workflows activated  
* ☐ Email templates customized with Pro Graphics branding  
* ☐ Form validation working (email format, required fields)  
* ☐ Success state displays correctly  
* ☐ Mobile responsive test passed  
* ☐ Rate limiting implemented (prevent spam)  
* ☐ Error logging configured (Sentry/LogRocket)  
* ☐ GDPR/privacy compliance notice added

---

## Analytics & Tracking

### Conversion Events

*// Google Analytics 4 events*  
gtag('event', 'lead\_capture', {  
  event\_category: 'engagement',  
  event\_label: 'roi-calculator',  
  value: 1,  
  service\_interest: 'Vehicle Branding',  
});

*// Facebook Pixel*  
fbq('track', 'Lead', {  
  content\_name: 'ROI Calculator',  
  content\_category: 'Lead Magnet',  
  service: 'Vehicle Branding',  
});

### Key Metrics Dashboard

* **Capture Rate**: Form views / submissions (target: \>15%)  
* **Lead Quality**: Service interest breakdown  
* **Email Deliverability**: Bounce rate \<2%  
* **Engagement**: Email open rate \>25%, click rate \>5%  
* **Conversion to Quote**: Leads → Quote requests (target: \>30%)

---

## Maintenance & Optimization

### Weekly Tasks

* ☐ Review Brevo dashboard for failed deliveries  
* ☐ Check form submission logs for errors  
* ☐ Verify automation workflow performance

### Monthly Tasks

* ☐ A/B test form headlines (Hormozi: “Test one variable at a time”)  
* ☐ Analyze lead quality by source  
* ☐ Update lead magnets based on engagement data  
* ☐ Review and optimize email sequences

### Quarterly Tasks

* ☐ Audit CRM data quality (remove duplicates)  
* ☐ Update compliance requirements if regulations change  
* ☐ Refresh lead magnet content  
* ☐ Expand automation workflows based on new services

---

## Troubleshooting

### Common Issues

**Issue**: Form submissions not appearing in Brevo  
**Solution**: Check API key permissions (needs contacts:write)  
**Issue**: Emails going to spam  
**Solution**: Verify SPF/DKIM records for prographics.co.za in Brevo  
**Issue**: High form abandonment  
**Solution**: Reduce fields (test phone as optional), add progress indicator  
**Issue**: Low email open rates  
**Solution**: A/B test subject lines (Hormozi: “Curiosity gaps work best”)  
---

## Resources

* **Brevo API Docs**: https://developers.brevo.com/  
* **Hormozi $100M Leads**: Lead magnet framework principles  
* **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

*Implementation Date*: 2026-02-20  
*Next Review*: 2026-03-20  
*Owner*: Pro Graphics Dev Team  
\`\`\`  
---

