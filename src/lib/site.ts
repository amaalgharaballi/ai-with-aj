// Single source of truth for every piece of editable content on the site.
//
// Data is split across four JSON files so the CMS at /admin can edit small,
// focused pieces without touching the rest:
//
//   - content/cohort.json   → next workshop dates + venue       (CMS-editable)
//   - content/pricing.json  → tier prices + seats-left counter  (CMS-editable)
//   - content/faq.json      → FAQ list                          (CMS-editable)
//   - content/site.json     → everything else                   (dev-only)
//
// Components read from SITE.* and don't know about the split. To change copy
// not exposed in /admin, edit content/site.json directly on GitHub.

import siteData from "@/content/site.json";
import cohortData from "@/content/cohort.json";
import pricingData from "@/content/pricing.json";
import faqData from "@/content/faq.json";

const tiers = siteData.tiersMeta.map((meta) => {
  if (meta.id === "early-bird") {
    return {
      ...meta,
      price: pricingData.earlyBirdPrice,
      seatsLeft: pricingData.earlyBirdSeatsLeft as number | null,
    };
  }
  return {
    ...meta,
    price: pricingData.standardPrice,
    seatsLeft: null as number | null,
  };
});

export const SITE = {
  ...siteData,
  cohort: cohortData,
  tiers,
  faq: faqData.faq,
};

export type SiteData = typeof SITE;
