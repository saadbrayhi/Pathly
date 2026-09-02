import {
  DocumentCategory,
  PreparationLevel,
  type PrismaClient,
} from "../../src/generated/prisma/client";
import { documents } from "../../src/data/documents";
import { getDocumentGuide } from "../../src/data/documentGuides";

function mapDocumentCategory(category: string): DocumentCategory {
  switch (category) {
    case "Academic":
      return DocumentCategory.ACADEMIC;

    case "Personal":
      return DocumentCategory.PERSONAL;

    case "Application":
      return DocumentCategory.APPLICATION;

    case "Language":
      return DocumentCategory.LANGUAGE;

    case "Financial":
      return DocumentCategory.FINANCIAL;

    default:
      return DocumentCategory.APPLICATION;
  }
}

function mapPreparationLevel(level: string): PreparationLevel {
  switch (level) {
    case "Low":
      return PreparationLevel.LOW;

    case "Medium":
      return PreparationLevel.MEDIUM;

    case "High":
      return PreparationLevel.HIGH;

    default:
      return PreparationLevel.MEDIUM;
  }
}

export async function seedDocumentGuides(prisma: PrismaClient) {
  console.log("Seeding document guides...");

  for (const document of documents) {
    const guide = getDocumentGuide(document);

    const databaseDocument = await prisma.documentGuide.upsert({
      where: {
        slug: document.slug,
      },
      update: {
        name: document.name,
        category: mapDocumentCategory(document.category),
        description: document.description,
        neededFor: document.neededFor,
        preparation: mapPreparationLevel(document.preparation),
        translationRequired: document.translationRequired,
        authenticationRequired: document.authenticationRequired,
        whatItIs: guide.whatItIs,
        whyItIsNeeded: guide.whyItIsNeeded,
        structureNote: guide.structureNote,
        mistakes: guide.mistakes,
      },
      create: {
        slug: document.slug,
        name: document.name,
        category: mapDocumentCategory(document.category),
        description: document.description,
        neededFor: document.neededFor,
        preparation: mapPreparationLevel(document.preparation),
        translationRequired: document.translationRequired,
        authenticationRequired: document.authenticationRequired,
        whatItIs: guide.whatItIs,
        whyItIsNeeded: guide.whyItIsNeeded,
        structureNote: guide.structureNote,
        mistakes: guide.mistakes,
      },
    });

    await prisma.documentStructureStep.deleteMany({
      where: {
        documentGuideId: databaseDocument.id,
      },
    });

    if (guide.structure.length > 0) {
      await prisma.documentStructureStep.createMany({
        data: guide.structure.map((step, index) => ({
          title: step.title,
          description: step.description,
          sortOrder: index,
          documentGuideId: databaseDocument.id,
        })),
      });
    }

    console.log(`Document guide seeded: ${document.name}`);
  }
}
