"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Globe2,
  GraduationCap,
  Plus,
} from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/admin/StatCard";
import Card from "@/components/shared/Card";
import { fetchCountries } from "@/services/countryApi";
import { fetchScholarships } from "@/services/scholarship";

export default function AdminOverview() {
  const countriesQuery = useQuery({
    queryKey: ["admin", "countries"],
    queryFn: () => fetchCountries(),
  });
  const scholarshipsQuery = useQuery({
    queryKey: ["admin", "scholarships"],
    queryFn: () => fetchScholarships(),
  });

  const countries = countriesQuery.data ?? [];
  const scholarships = scholarshipsQuery.data ?? [];
  const isLoading = countriesQuery.isPending || scholarshipsQuery.isPending;
  const hasError = countriesQuery.isError || scholarshipsQuery.isError;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Overview"
        title="Admin Dashboard"
        description="Manage the country and scholarship information powering Pathly’s public experience."
      />

      {hasError && (
        <div
          role="alert"
          className="rounded-2xl border border-danger-border bg-soft-danger p-5"
        >
          <h2 className="font-semibold text-heading">Some data is unavailable</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            The dashboard could not load every total. Check the database connection and try again.
          </p>
          <button
            type="button"
            onClick={() => {
              countriesQuery.refetch();
              scholarshipsQuery.refetch();
            }}
            className="mt-3 text-sm font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Retry dashboard data
          </button>
        </div>
      )}

      <section aria-labelledby="content-totals-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="content-totals-heading" className="text-lg font-semibold text-heading">
            Content totals
          </h2>
          <div className="flex items-center gap-2 text-xs font-medium text-muted">
            {hasError ? (
              <>
                <span className="size-2 rounded-full bg-danger" />
                Connection issue
              </>
            ) : isLoading ? (
              <>
                <span className="size-2 animate-pulse rounded-full bg-warning" />
                Loading live data
              </>
            ) : (
              <>
                <CheckCircle2 aria-hidden="true" size={14} className="text-success" />
                Live data
              </>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Total countries"
            value={countriesQuery.isPending ? "—" : countries.length}
            icon={<Globe2 aria-hidden="true" size={22} />}
            description="Destinations in the study-abroad directory"
          />
          <StatCard
            label="Total scholarships"
            value={scholarshipsQuery.isPending ? "—" : scholarships.length}
            icon={<GraduationCap aria-hidden="true" size={22} />}
            description="Scholarship opportunities in the database"
          />
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
        <Card className="overflow-hidden">
          <div className="border-b border-border px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-heading">Quick actions</h2>
            <p className="mt-1 text-sm text-muted">
              Add a new public destination or scholarship opportunity.
            </p>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            <Link
              href="/admin/countries?action=new"
              className="group rounded-2xl border border-border bg-surface-subtle p-5 transition hover:border-soft-blue-border hover:bg-soft-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <Plus aria-hidden="true" size={19} />
              </span>
              <h3 className="mt-5 font-semibold text-heading">Add country</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Create a destination and its core study information.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Create country
                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>

            <Link
              href="/admin/scholarships?action=new"
              className="group rounded-2xl border border-border bg-surface-subtle p-5 transition hover:border-soft-blue-border hover:bg-soft-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
                <Plus aria-hidden="true" size={19} />
              </span>
              <h3 className="mt-5 font-semibold text-heading">Add scholarship</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Publish an opportunity and connect destinations.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Create scholarship
                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex size-11 items-center justify-center rounded-xl bg-soft-mint text-accent">
            <Database aria-hidden="true" size={21} />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-heading">Database content</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            These values come directly from the existing Pathly APIs. No sample analytics are shown.
          </p>

          <div className="mt-5 divide-y divide-border-subtle border-y border-border-subtle">
            <Link
              href="/admin/countries"
              className="group flex items-center justify-between gap-3 py-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="font-medium text-content">Manage countries</span>
              <ArrowRight size={15} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
            <Link
              href="/admin/scholarships"
              className="group flex items-center justify-between gap-3 py-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="font-medium text-content">Manage scholarships</span>
              <ArrowRight size={15} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
