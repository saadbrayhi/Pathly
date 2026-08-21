import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import type { CountryDetails } from "../../../../constant/countries";

type CountryStudyInfoProps = {
  details: CountryDetails;
};

export default function CountryStudyInfo({ details }: CountryStudyInfoProps) {
  return (
    <div className="space-y-6">
      {/* Study Levels */}
      <section
        id="study-levels"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">Study Levels</h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-[#8ba0c0]">
                <th className="pb-3 pr-5 font-semibold">Level</th>

                <th className="pb-3 pr-5 font-semibold">Duration</th>

                <th className="pb-3 pr-5 font-semibold">Language</th>

                <th className="pb-3 font-semibold">Tuition</th>
              </tr>
            </thead>

            <tbody>
              {details.studyLevelDetails.map((level) => (
                <tr
                  key={level.level}
                  className="border-b border-slate-100 align-top"
                >
                  <td className="py-4 pr-5 text-sm font-semibold text-[#111827]">
                    {level.level}
                  </td>

                  <td className="py-4 pr-5 text-sm text-[#61779a]">
                    {level.duration}
                  </td>

                  <td className="py-4 pr-5 text-sm text-[#61779a]">
                    {level.language}
                  </td>

                  <td className="py-4 text-sm text-[#344968]">
                    <p>{level.tuition}</p>

                    {level.note && (
                      <p className="mt-1 text-xs leading-5 text-[#8ba0c0]">
                        {level.note}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs italic text-[#8ba0c0]">
          Tuition figures are indicative. Verify current amounts with the
          specific institution.
        </p>
      </section>

      {/* Required Documents */}
      <section
        id="required-documents"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">
          Required Documents
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#43597b]">
          The documents required vary by program and study level. These are the
          most commonly requested:
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {details.requiredDocuments.map((document) => (
            <div
              key={document}
              className="flex items-center gap-3 rounded-xl bg-[#f7f8f5] px-4 py-3"
            >
              <FileText size={15} className="shrink-0 text-[#8ba0c0]" />

              <span className="text-sm text-[#43597b]">{document}</span>
            </div>
          ))}
        </div>

        <Link
          href="/documents"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3157d5]"
        >
          View full document guide
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
