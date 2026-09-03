"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Edit3,
  Globe2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import CountryForm from "@/components/admin/CountryForm";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { getAdminApiErrorMessage } from "@/components/admin/apiError";
import Button from "@/components/shared/Button";
import type { Country } from "@/interfaces/country";
import {
  adminCreateCountry,
  adminDeleteCountry,
  adminUpdateCountry,
  fetchCountries,
  type CreateCountryPayload,
} from "@/services/countryApi";

type CountriesAdminProps = {
  openCreateOnLoad?: boolean;
};

function DisplayValue({ children }: { children: string | null }) {
  return children ? (
    <span className="text-content">{children}</span>
  ) : (
    <span className="text-subtle">Not set</span>
  );
}

function LoadingRows() {
  return (
    <div role="status" aria-label="Loading countries" className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-18 animate-pulse rounded-xl border border-border bg-surface"
        />
      ))}
    </div>
  );
}

export default function CountriesAdmin({
  openCreateOnLoad = false,
}: CountriesAdminProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(openCreateOnLoad);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const countriesQuery = useQuery({
    queryKey: ["admin", "countries"],
    queryFn: () => fetchCountries(),
  });

  const countries = countriesQuery.data ?? [];
  const filteredCountries = (() => {
    const term = search.trim().toLowerCase();
    if (!term) return countries;
    return countries.filter((country) =>
      [country.name, country.slug, country.languages]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(term)),
    );
  })();

  function openCreate() {
    setEditingCountry(null);
    setFormError(null);
    setIsFormOpen(true);
  }

  function openEdit(country: Country) {
    setEditingCountry(country);
    setFormError(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;
    setIsFormOpen(false);
    setEditingCountry(null);
    setFormError(null);
  }

  async function saveCountry(payload: CreateCountryPayload) {
    setIsSaving(true);
    setFormError(null);

    try {
      if (editingCountry) {
        await adminUpdateCountry(editingCountry.slug, payload);
        setNotice(`${payload.name} was updated.`);
      } else {
        await adminCreateCountry(payload);
        setNotice(`${payload.name} was added.`);
      }

      await queryClient.invalidateQueries({ queryKey: ["admin", "countries"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "overview"] });
      setIsFormOpen(false);
      setEditingCountry(null);
    } catch (error) {
      setFormError(
        getAdminApiErrorMessage(error, "Unable to save this country."),
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deletingCountry) return;
    setIsDeleting(true);

    try {
      await adminDeleteCountry(deletingCountry.slug);
      setNotice(`${deletingCountry.name} was deleted.`);
      setDeletingCountry(null);
      await queryClient.invalidateQueries({ queryKey: ["admin", "countries"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "overview"] });
    } catch (error) {
      setNotice(
        getAdminApiErrorMessage(error, "Unable to delete this country."),
      );
      setDeletingCountry(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-7">
      <AdminPageHeader
        eyebrow="Content management"
        title="Countries"
        description="Manage the destinations and study information shown across Pathly."
        actions={
          <Button
            onClick={openCreate}
            className="w-full gap-2 rounded-xl px-4 py-2.5 text-sm sm:w-auto"
          >
            <Plus aria-hidden="true" size={18} />
            Add country
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

      <section aria-label="Country management" className="space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden="true"
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <label htmlFor="country-search" className="sr-only">
              Search countries
            </label>
            <input
              id="country-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search countries…"
              className="w-full rounded-xl border border-border bg-surface-subtle py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-primary focus:ring-3 focus:ring-focus-ring"
            />
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {filteredCountries.length} of {countries.length}{" "}
            {countries.length === 1 ? "country" : "countries"}
          </p>
        </div>

        {countriesQuery.isPending ? (
          <LoadingRows />
        ) : countriesQuery.isError ? (
          <div className="rounded-2xl border border-danger-border bg-soft-danger p-6 text-center">
            <h2 className="font-semibold text-heading">Unable to load countries</h2>
            <p className="mt-1 text-sm text-muted">
              Check the database connection and try again.
            </p>
            <button
              type="button"
              onClick={() => countriesQuery.refetch()}
              className="mt-4 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-content hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Try again
            </button>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-soft-blue text-primary">
              <Globe2 aria-hidden="true" size={22} />
            </div>
            <h2 className="mt-4 font-semibold text-heading">
              {countries.length === 0 ? "No countries yet" : "No matches found"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {countries.length === 0
                ? "Add the first destination to get started."
                : "Try a different name, slug, or language."}
            </p>
            {countries.length === 0 && (
              <button
                type="button"
                onClick={openCreate}
                className="mt-5 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Add a country
              </button>
            )}
          </div>
        ) : (
          <>
            <DataTable label="Countries">
              <thead className="bg-surface-subtle">
                <tr className="border-b border-border text-xs font-bold uppercase tracking-[0.06em] text-muted">
                  <th scope="col" className="px-5 py-3.5">Country</th>
                  <th scope="col" className="px-5 py-3.5">Languages</th>
                  <th scope="col" className="px-5 py-3.5">Tuition</th>
                  <th scope="col" className="px-5 py-3.5">Living cost</th>
                  <th scope="col" className="px-5 py-3.5">Study levels</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredCountries.map((country) => (
                  <tr key={country.id} className="transition hover:bg-surface-hover">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-subtle text-xl">
                          {country.flag ?? "🌍"}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-heading">{country.name}</p>
                          <p className="mt-0.5 font-mono text-xs text-muted">/{country.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-44 px-5 py-4 text-sm"><DisplayValue>{country.languages}</DisplayValue></td>
                    <td className="max-w-44 px-5 py-4 text-sm"><DisplayValue>{country.tuition ?? country.tuitionRange}</DisplayValue></td>
                    <td className="max-w-44 px-5 py-4 text-sm"><DisplayValue>{country.livingCost}</DisplayValue></td>
                    <td className="px-5 py-4">
                      <div className="flex max-w-52 flex-wrap gap-1.5">
                        {country.studyLevelOptions.length > 0 ? (
                          country.studyLevelOptions.slice(0, 3).map((level) => (
                            <span key={level} className="rounded-full bg-soft-blue px-2.5 py-1 text-xs font-medium text-primary">{level}</span>
                          ))
                        ) : (
                          <span className="text-sm text-subtle">Not set</span>
                        )}
                        {country.studyLevelOptions.length > 3 && (
                          <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted">+{country.studyLevelOptions.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button type="button" onClick={() => openEdit(country)} aria-label={`Edit ${country.name}`} className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-soft-blue hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Edit3 size={16} /></button>
                        <button type="button" onClick={() => setDeletingCountry(country)} aria-label={`Delete ${country.name}`} className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-soft-danger hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>

            <div className="grid gap-3 md:hidden">
              {filteredCountries.map((country) => (
                <article key={country.id} className="rounded-2xl border border-border bg-surface p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                  <div className="flex items-start gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-subtle text-xl">{country.flag ?? "🌍"}</span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-heading">{country.name}</h2>
                      <p className="mt-0.5 truncate font-mono text-xs text-muted">/{country.slug}</p>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => openEdit(country)} aria-label={`Edit ${country.name}`} className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-soft-blue hover:text-primary"><Edit3 size={16} /></button>
                      <button type="button" onClick={() => setDeletingCountry(country)} aria-label={`Delete ${country.name}`} className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-soft-danger hover:text-danger"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border-subtle pt-4 text-sm">
                    <div><dt className="text-xs text-muted">Languages</dt><dd className="mt-1 font-medium text-content">{country.languages ?? "Not set"}</dd></div>
                    <div><dt className="text-xs text-muted">Living cost</dt><dd className="mt-1 font-medium text-content">{country.livingCost ?? "Not set"}</dd></div>
                    <div className="col-span-2"><dt className="text-xs text-muted">Tuition</dt><dd className="mt-1 font-medium text-content">{country.tuition ?? country.tuitionRange ?? "Not set"}</dd></div>
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
        title={editingCountry ? `Edit ${editingCountry.name}` : "Add country"}
        size="xl"
      >
        <CountryForm
          key={editingCountry?.id ?? "new-country"}
          country={editingCountry}
          isSaving={isSaving}
          submitError={formError}
          onSubmit={saveCountry}
          onCancel={closeForm}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingCountry)}
        title={`Delete ${deletingCountry?.name ?? "country"}?`}
        description="This action will permanently remove this country and related records affected by the existing database rules. It cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => !isDeleting && setDeletingCountry(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
