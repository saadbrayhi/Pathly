"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Edit3,
  GraduationCap,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import ScholarshipForm from "@/components/admin/ScholarshipForm";
import { getAdminApiErrorMessage } from "@/components/admin/apiError";
import Button from "@/components/shared/Button";
import { fetchCountries } from "@/services/countryApi";
import {
  adminCreateScholarship,
  adminDeleteScholarship,
  adminUpdateScholarship,
  fetchScholarships,
  type CreateScholarshipPayload,
  type ScholarshipApiItem,
} from "@/services/scholarship";

type ScholarshipsAdminProps = {
  openCreateOnLoad?: boolean;
};

function LoadingRows() {
  return (
    <div role="status" aria-label="Loading scholarships" className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-18 animate-pulse rounded-xl border border-border bg-surface"
        />
      ))}
    </div>
  );
}

function destinationLabel(scholarship: ScholarshipApiItem): string {
  if (scholarship.scopeLabel) return scholarship.scopeLabel;
  if (scholarship.countries.length === 0) return "Not set";
  if (scholarship.countries.length === 1) return scholarship.countries[0].name;
  return `${scholarship.countries[0].name} +${scholarship.countries.length - 1}`;
}

function deadlineLabel(scholarship: ScholarshipApiItem): string {
  return scholarship.deadlines[0]?.displayText ?? "Not published";
}

function verificationLabel(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ScholarshipsAdmin({
  openCreateOnLoad = false,
}: ScholarshipsAdminProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(openCreateOnLoad);
  const [editingScholarship, setEditingScholarship] =
    useState<ScholarshipApiItem | null>(null);
  const [deletingScholarship, setDeletingScholarship] =
    useState<ScholarshipApiItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const scholarshipsQuery = useQuery({
    queryKey: ["admin", "scholarships"],
    queryFn: () => fetchScholarships(),
  });
  const countriesQuery = useQuery({
    queryKey: ["admin", "countries"],
    queryFn: () => fetchCountries(),
  });

  const scholarships = scholarshipsQuery.data ?? [];
  const countries = countriesQuery.data ?? [];
  const filteredScholarships = (() => {
    const term = search.trim().toLowerCase();
    if (!term) return scholarships;
    return scholarships.filter((scholarship) =>
      [
        scholarship.title,
        scholarship.slug,
        scholarship.provider,
        scholarship.scopeLabel,
        scholarship.level,
        scholarship.field,
        scholarship.funding,
        ...scholarship.countries.map((country) => country.name),
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(term)),
    );
  })();

  function openCreate() {
    setEditingScholarship(null);
    setFormError(null);
    setIsFormOpen(true);
  }

  function openEdit(scholarship: ScholarshipApiItem) {
    setEditingScholarship(scholarship);
    setFormError(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;
    setIsFormOpen(false);
    setEditingScholarship(null);
    setFormError(null);
  }

  async function saveScholarship(payload: CreateScholarshipPayload) {
    setIsSaving(true);
    setFormError(null);

    try {
      if (editingScholarship) {
        await adminUpdateScholarship(editingScholarship.slug, payload);
        setNotice(`${payload.title} was updated.`);
      } else {
        await adminCreateScholarship(payload);
        setNotice(`${payload.title} was added.`);
      }

      await queryClient.invalidateQueries({
        queryKey: ["admin", "scholarships"],
      });
      await queryClient.invalidateQueries({ queryKey: ["admin", "overview"] });
      setIsFormOpen(false);
      setEditingScholarship(null);
    } catch (error) {
      setFormError(
        getAdminApiErrorMessage(error, "Unable to save this scholarship."),
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deletingScholarship) return;
    setIsDeleting(true);

    try {
      await adminDeleteScholarship(deletingScholarship.slug);
      setNotice(`${deletingScholarship.title} was deleted.`);
      setDeletingScholarship(null);
      await queryClient.invalidateQueries({
        queryKey: ["admin", "scholarships"],
      });
      await queryClient.invalidateQueries({ queryKey: ["admin", "overview"] });
    } catch (error) {
      setNotice(
        getAdminApiErrorMessage(error, "Unable to delete this scholarship."),
      );
      setDeletingScholarship(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="Content management"
        title="Scholarships"
        description="Manage scholarship opportunities, destinations, funding, and public details."
        actions={
          <Button
            onClick={openCreate}
            className="w-full gap-2 rounded-xl px-4 py-2.5 text-sm sm:w-auto"
          >
            <Plus aria-hidden="true" size={18} />
            Add scholarship
          </Button>
        }
      />

      {notice && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-soft-blue-border bg-soft-blue px-4 py-3 text-sm text-primary"
        >
          <CheckCircle2 aria-hidden="true" size={18} className="shrink-0" />
          <span className="flex-1">{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="rounded-md p-1 hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {countriesQuery.isError && (
        <div className="rounded-xl border border-warning-border bg-soft-warning px-4 py-3 text-sm text-warning">
          Country options could not be loaded. Scholarship records are still available, but destination links cannot be changed until the connection recovers.
        </div>
      )}

      <section aria-label="Scholarship management" className="space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden="true"
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <label htmlFor="scholarship-search" className="sr-only">
              Search scholarships
            </label>
            <input
              id="scholarship-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search scholarships…"
              className="w-full rounded-xl border border-border bg-surface-subtle py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-primary focus:ring-3 focus:ring-focus-ring"
            />
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {filteredScholarships.length} of {scholarships.length}{" "}
            {scholarships.length === 1 ? "scholarship" : "scholarships"}
          </p>
        </div>

        {scholarshipsQuery.isPending ? (
          <LoadingRows />
        ) : scholarshipsQuery.isError ? (
          <div className="rounded-2xl border border-danger-border bg-soft-danger p-6 text-center">
            <h2 className="font-semibold text-heading">
              Unable to load scholarships
            </h2>
            <p className="mt-1 text-sm text-muted">
              Check the database connection and try again.
            </p>
            <button
              type="button"
              onClick={() => scholarshipsQuery.refetch()}
              className="mt-4 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-content hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Try again
            </button>
          </div>
        ) : filteredScholarships.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-soft-blue text-primary">
              <GraduationCap aria-hidden="true" size={22} />
            </div>
            <h2 className="mt-4 font-semibold text-heading">
              {scholarships.length === 0
                ? "No scholarships yet"
                : "No matches found"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {scholarships.length === 0
                ? "Add the first scholarship opportunity to get started."
                : "Try a different title, provider, destination, or field."}
            </p>
            {scholarships.length === 0 && (
              <button
                type="button"
                onClick={openCreate}
                className="mt-5 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Add a scholarship
              </button>
            )}
          </div>
        ) : (
          <>
            <DataTable label="Scholarships" minWidth="min-w-[1040px]">
              <thead className="bg-surface-subtle">
                <tr className="border-b border-border text-xs font-bold uppercase tracking-[0.06em] text-muted">
                  <th scope="col" className="px-5 py-3.5">Scholarship</th>
                  <th scope="col" className="px-5 py-3.5">Destination</th>
                  <th scope="col" className="px-5 py-3.5">Degree / field</th>
                  <th scope="col" className="px-5 py-3.5">Funding</th>
                  <th scope="col" className="px-5 py-3.5">Deadline</th>
                  <th scope="col" className="px-5 py-3.5">Status</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredScholarships.map((scholarship) => (
                  <tr key={scholarship.id} className="transition hover:bg-surface-hover">
                    <td className="max-w-72 px-5 py-4">
                      <p className="font-semibold text-heading">{scholarship.title}</p>
                      <p className="mt-1 truncate text-xs text-muted">
                        {scholarship.provider ?? "Provider not set"} · <span className="font-mono">/{scholarship.slug}</span>
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-content">
                      <span className="mr-1.5" aria-hidden="true">{scholarship.flag ?? scholarship.countries[0]?.flag ?? "🌍"}</span>
                      {destinationLabel(scholarship)}
                    </td>
                    <td className="max-w-48 px-5 py-4 text-sm">
                      <p className="font-medium text-content">{scholarship.level ?? "Not set"}</p>
                      <p className="mt-1 text-xs text-muted">{scholarship.field ?? "Field not set"}</p>
                    </td>
                    <td className="max-w-44 px-5 py-4 text-sm text-content">{scholarship.funding ?? "Not set"}</td>
                    <td className="max-w-48 px-5 py-4 text-sm text-content">{deadlineLabel(scholarship)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        scholarship.verificationStatus === "VERIFIED"
                          ? "bg-soft-success text-success"
                          : "bg-soft-warning text-warning"
                      }`}>
                        {verificationLabel(scholarship.verificationStatus)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button type="button" onClick={() => openEdit(scholarship)} aria-label={`Edit ${scholarship.title}`} className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-soft-blue hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Edit3 size={16} /></button>
                        <button type="button" onClick={() => setDeletingScholarship(scholarship)} aria-label={`Delete ${scholarship.title}`} className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-soft-danger hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>

            <div className="grid gap-3 md:hidden">
              {filteredScholarships.map((scholarship) => (
                <article key={scholarship.id} className="rounded-2xl border border-border bg-surface p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                  <div className="flex items-start gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-subtle text-xl">{scholarship.flag ?? scholarship.countries[0]?.flag ?? "🌍"}</span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold leading-5 text-heading">{scholarship.title}</h2>
                      <p className="mt-1 truncate text-xs text-muted">{scholarship.provider ?? "Provider not set"}</p>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => openEdit(scholarship)} aria-label={`Edit ${scholarship.title}`} className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-soft-blue hover:text-primary"><Edit3 size={16} /></button>
                      <button type="button" onClick={() => setDeletingScholarship(scholarship)} aria-label={`Delete ${scholarship.title}`} className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-soft-danger hover:text-danger"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border-subtle pt-4 text-sm">
                    <div><dt className="text-xs text-muted">Destination</dt><dd className="mt-1 font-medium text-content">{destinationLabel(scholarship)}</dd></div>
                    <div><dt className="text-xs text-muted">Degree</dt><dd className="mt-1 font-medium text-content">{scholarship.level ?? "Not set"}</dd></div>
                    <div><dt className="text-xs text-muted">Funding</dt><dd className="mt-1 font-medium text-content">{scholarship.funding ?? "Not set"}</dd></div>
                    <div><dt className="text-xs text-muted">Deadline</dt><dd className="mt-1 font-medium text-content">{deadlineLabel(scholarship)}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={
          editingScholarship
            ? `Edit ${editingScholarship.title}`
            : "Add scholarship"
        }
        size="xl"
      >
        <ScholarshipForm
          key={editingScholarship?.id ?? "new-scholarship"}
          scholarship={editingScholarship}
          countries={countries}
          isSaving={isSaving}
          submitError={formError}
          onSubmit={saveScholarship}
          onCancel={closeForm}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingScholarship)}
        title={`Delete ${deletingScholarship?.title ?? "scholarship"}?`}
        description="This action will permanently remove this scholarship and related records affected by the existing database rules. It cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => !isDeleting && setDeletingScholarship(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
