import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const requestSchema = z
  .object({
    websiteUrl: z.string(),
    companyName: z.string(),
    productDescription: z.string(),
    targetMarket: z.string(),
    targetAudienceDescription: z.string(),
    primaryObjective: z.string(),
    costStructure: z.string(),
    marketSpecificInsights: z.string(),
  })
  .partial();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Received Request Body:", req.body);
  console.log("API Key:", process.env.OPENAI_API_KEY ? "Exists" : "Missing");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    try {
      requestSchema.parse(req.body);
    } catch (validationError) {
      console.error("Input Validation Error:", validationError);
    }

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    const prompt = `
Analyze the landing page at ${req.body.websiteUrl} for ${
      req.body.companyName
    }, which offers ${
      req.body.productDescription
    }. The page is targeting a new audience in ${
      req.body.targetMarket
    }, consisting of ${
      req.body.targetAudienceDescription
    }. The primary goal of the page is ${
      req.body.primaryObjective
    }. The product/service is positioned as ${
      req.body.costStructure
    }. Check local competitors of ${req.body.productDescription} in the ${
      req.body.targetMarket
    }.

      Evaluate the page comprehensively by its segments:

      1. Hero Section: Headline, subheadline, visuals, and CTA.
      2. Navigation Bar: Structure, language, and link relevance.
      3. Value Proposition: Key benefits and supporting details.
      4. Product/Service Showcase: Images, features, and pricing.
      5. Social Proof: Testimonials, case studies, logos, or media mentions.
      6. Trust Indicators: Certifications, guarantees, and security badges.
      7. Conversion Elements: Forms, CTAs, and offers.
      8. Blog/Resources: Content relevance and localization.
      9. Footer: Contact information, social links, and compliance.
      10. SEO and Technical Aspects: Meta tags, page speed, and responsiveness.

      Incorporate the following additional market-specific insights: ${
        req.body.marketSpecificInsights || "No specific insights provided"
      }.

      Provide actionable recommendations for each segment, ensuring they are tailored to the cultural, linguistic, and competitive nuances of ${
        req.body.targetMarket
      }.
      `;

    const responseObject = z.object({
      HeroSection: z.string(),
      NavigationBar: z.string(),
      ValueProposition: z.string(),
      ProductServiceShowcase: z.string(),
      SocialProof: z.string(),
      TrustIndicators: z.string(),
      ConversionElements: z.string(),
      BlogResources: z.string(),
      Footer: z.string(),
      SEOAndTechnicalAspects: z.string(),
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content:
            "You are a landing page analyst. Provide a detailed evaluation of the landing page based on the provided data. You will be given structured data about company and should convert it into the given response structure.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: zodResponseFormat(responseObject, "response_format"),
    });

    console.log("OpenAI Response:", completion.choices[0]?.message?.content);

    res.status(200).json({
      analysis: completion.choices[0]?.message?.content,
    });
  } catch (error: any) {
    console.error("Detailed Error during OpenAI request:", {
      message: error.message,
      stack: error.stack,
      fullError: error,
    });
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export default handler;
