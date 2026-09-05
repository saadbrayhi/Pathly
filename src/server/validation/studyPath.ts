import { z } from "zod";

import {
  STUDY_PATH_DEGREES,
  STUDY_PATH_DESTINATIONS,
  STUDY_PATH_EDUCATION_LEVELS,
  STUDY_PATH_FIELDS,
} from "@/types/studyPath";

export const createStudyPathSchema = z
  .object({
    educationLevel: z.enum(STUDY_PATH_EDUCATION_LEVELS),
    desiredDegree: z.enum(STUDY_PATH_DEGREES),
    fieldOfStudy: z.enum(STUDY_PATH_FIELDS),
    destination: z.enum(STUDY_PATH_DESTINATIONS),
  })
  .strict();

export type CreateStudyPathInput = z.infer<typeof createStudyPathSchema>;
