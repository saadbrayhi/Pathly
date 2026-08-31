-- CreateEnum
CREATE TYPE "RequirementStatus" AS ENUM ('REQUIRED', 'MAY_BE_REQUIRED', 'OPTIONAL', 'VARIES');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'COMMUNITY_CONFIRMED', 'NEEDS_VERIFICATION');

-- CreateEnum
CREATE TYPE "DeadlineState" AS ENUM ('OPEN', 'UPCOMING', 'CLOSED', 'VARIES', 'NOT_PUBLISHED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('ACADEMIC', 'PERSONAL', 'APPLICATION', 'LANGUAGE', 'FINANCIAL');

-- CreateEnum
CREATE TYPE "PreparationLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "SupportRequestStatus" AS ENUM ('NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED');

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "flag" TEXT,
    "image" TEXT,
    "description" TEXT,
    "languages" TEXT,
    "tuition" TEXT,
    "livingCost" TEXT,
    "tuitionRange" TEXT,
    "overview" TEXT,
    "lastReviewedAt" DATE,
    "mainLanguage" TEXT,
    "livingCostSummary" TEXT,
    "educationSystem" TEXT,
    "whoCanApply" TEXT,
    "eligibilityWarning" TEXT,
    "languageWarning" TEXT,
    "visaType" TEXT,
    "visaSummary" TEXT,
    "visaDescription" TEXT,
    "visaProcessingTime" TEXT,
    "visaAppointment" TEXT,
    "visaEstimatedFee" TEXT,
    "visaFinancialProof" TEXT,
    "visaWarning" TEXT,
    "visaLastReviewedAt" DATE,
    "visaOfficialSourceLabel" TEXT,
    "visaOfficialSourceUrl" TEXT,
    "languageOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "studyLevelOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requiredDocuments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "commonMistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "visaDocuments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "visaSteps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "visaCommonMistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "scholarshipNotes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionRequirement" (
    "id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "status" "RequirementStatus" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "countryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyLevelDetail" (
    "id" UUID NOT NULL,
    "level" TEXT NOT NULL,
    "duration" TEXT,
    "language" TEXT,
    "tuition" TEXT,
    "note" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "countryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyLevelDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageRequirement" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "countryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficialSource" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "countryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfficialSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "flag" TEXT,
    "scopeLabel" TEXT,
    "provider" TEXT,
    "level" TEXT,
    "field" TEXT,
    "funding" TEXT,
    "overview" TEXT,
    "whoCanApply" TEXT,
    "eligibilityNote" TEXT,
    "fundingCoverage" TEXT,
    "fundingNote" TEXT,
    "officialUrl" TEXT,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'NEEDS_VERIFICATION',
    "lastReviewedAt" DATE,
    "requiredDocuments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "applicationSteps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "commonMistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipDeadline" (
    "id" UUID NOT NULL,
    "label" TEXT,
    "displayText" TEXT NOT NULL,
    "deadlineDate" DATE,
    "state" "DeadlineState" NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL,
    "lastVerifiedAt" TIMESTAMP(3),
    "sourceUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "scholarshipId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipDeadline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPathRequest" (
    "id" UUID NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "desiredDegree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "destinationValue" TEXT NOT NULL,
    "countryId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyPathRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalSupportRequest" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "currentCountry" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "desiredDegree" TEXT,
    "fieldOfStudy" TEXT,
    "helpType" TEXT NOT NULL,
    "target" TEXT,
    "deadline" TEXT,
    "description" TEXT NOT NULL,
    "status" "SupportRequestStatus" NOT NULL DEFAULT 'NEW',
    "preferredCountryId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalSupportRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiNavigatorRequest" (
    "id" UUID NOT NULL,
    "prompt" TEXT NOT NULL,
    "currentCountry" TEXT,
    "educationLevel" TEXT,
    "desiredDegree" TEXT,
    "fieldOfStudy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiNavigatorRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentGuide" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "description" TEXT,
    "neededFor" TEXT NOT NULL,
    "preparation" "PreparationLevel" NOT NULL,
    "translationRequired" BOOLEAN NOT NULL DEFAULT false,
    "translationNote" TEXT,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'NEEDS_VERIFICATION',
    "authenticationRequired" BOOLEAN NOT NULL DEFAULT false,
    "authenticationNote" TEXT,
    "whatItIs" TEXT NOT NULL,
    "whyItIsNeeded" TEXT NOT NULL,
    "structureNote" TEXT,
    "mistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentStructureStep" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "documentGuideId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentStructureStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CountryToScholarship" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CountryToScholarship_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_slug_key" ON "Scholarship"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentGuide_slug_key" ON "DocumentGuide"("slug");

-- CreateIndex
CREATE INDEX "_CountryToScholarship_B_index" ON "_CountryToScholarship"("B");

-- AddForeignKey
ALTER TABLE "AdmissionRequirement" ADD CONSTRAINT "AdmissionRequirement_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyLevelDetail" ADD CONSTRAINT "StudyLevelDetail_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageRequirement" ADD CONSTRAINT "LanguageRequirement_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfficialSource" ADD CONSTRAINT "OfficialSource_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipDeadline" ADD CONSTRAINT "ScholarshipDeadline_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPathRequest" ADD CONSTRAINT "StudyPathRequest_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalSupportRequest" ADD CONSTRAINT "PersonalSupportRequest_preferredCountryId_fkey" FOREIGN KEY ("preferredCountryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStructureStep" ADD CONSTRAINT "DocumentStructureStep_documentGuideId_fkey" FOREIGN KEY ("documentGuideId") REFERENCES "DocumentGuide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToScholarship" ADD CONSTRAINT "_CountryToScholarship_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToScholarship" ADD CONSTRAINT "_CountryToScholarship_B_fkey" FOREIGN KEY ("B") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
