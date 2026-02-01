import { MDXRemote } from "next-mdx-remote/rsc"
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { PizzaReview } from "./pizza-review"
import { PizzeriaTable } from "./pizzeria-table"
import { PizzeriaInfoCard } from "./pizzeria-info-card"
import { ImageGallery } from "./image-gallery"
import remarkGfm from "remark-gfm"

// Position mapping for object-position
const positionClasses = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const

type ImagePosition = keyof typeof positionClasses

// Custom image layout components
function ImageFull({ src, alt, caption, position = "center" }: { src: string; alt: string; caption?: string; position?: ImagePosition }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--color-sand)] shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5">
        <Image src={src} alt={alt} fill className={`object-cover ${positionClasses[position]}`} />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-dark-1)]/50">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function ImageRight({ src, alt, children, position = "center" }: { src: string; alt: string; children: React.ReactNode; position?: ImagePosition }) {
  return (
    <div className="my-8 flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="flex-1 [&>p]:mb-0">{children}</div>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[var(--color-sand)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ring-1 ring-[var(--color-dark-1)]/5 sm:w-[280px]">
        <Image src={src} alt={alt} fill className={`object-cover ${positionClasses[position]}`} />
      </div>
    </div>
  )
}

function ImageLeft({ src, alt, children, position = "center" }: { src: string; alt: string; children: React.ReactNode; position?: ImagePosition }) {
  return (
    <div className="my-8 flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[var(--color-sand)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ring-1 ring-[var(--color-dark-1)]/5 sm:w-[280px]">
        <Image src={src} alt={alt} fill className={`object-cover ${positionClasses[position]}`} />
      </div>
      <div className="flex-1 [&>p]:mb-0">{children}</div>
    </div>
  )
}

function Callout({ children, emoji = "💡" }: { children: React.ReactNode; emoji?: string }) {
  return (
    <div className="my-6 flex gap-4 rounded-xl bg-[var(--color-sand)]/60 p-5">
      <span className="text-xl">{emoji}</span>
      <div className="flex-1 [&>p]:mb-0">{children}</div>
    </div>
  )
}

// Beautiful Table Component
function Table({ children, className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5">
      <div className="overflow-x-auto">
        <table
          {...props}
          className={`w-full border-collapse text-left text-sm ${className ?? ""}`}
        >
          {children}
        </table>
      </div>
    </div>
  )
}

function TableHead({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className={`bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-left text-xs font-semibold uppercase tracking-wide text-white ${
        className ?? ""
      }`}
    >
      {children}
    </thead>
  )
}

function TableBody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      {...props}
      className={`divide-y divide-[var(--color-sand)]/80 bg-[var(--color-background)] ${className ?? ""}`}
    >
      {children}
    </tbody>
  )
}

function TableRow({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className={`transition-colors hover:bg-[var(--color-sand)]/50 ${className ?? ""}`}
    >
      {children}
    </tr>
  )
}

function TableHeader({ children, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={`px-4 py-3 text-[0.75rem] font-semibold tracking-wide first:pl-6 last:pr-6 ${
        className ?? ""
      }`}
    >
      {children}
    </th>
  )
}

function TableCell({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={`px-4 py-3.5 text-sm text-[var(--color-dark-1)]/80 first:pl-6 first:font-medium first:text-[var(--color-dark-1)] last:pr-6 ${
        className ?? ""
      }`}
    >
      {children}
    </td>
  )
}

// Extract grade from title like "Name — District (Voto 8.5)" or "(Voto 8–8.5)"
function extractGradeFromTitle(children: React.ReactNode): { title: string; grade: string | null } {
  const text = typeof children === "string" ? children : 
    Array.isArray(children) ? children.map(c => typeof c === "string" ? c : "").join("") :
    String(children || "")
  
  // Match patterns like "(Voto 8.5)" or "(Voto 8–8.5)" or "(Voto 9+)"
  const gradeMatch = text.match(/\(Voto\s+([0-9.+–-]+)\)\s*$/)
  
  if (gradeMatch) {
    const title = text.replace(/\s*\(Voto\s+[0-9.+–-]+\)\s*$/, "").trim()
    return { title, grade: gradeMatch[1] }
  }
  
  return { title: text, grade: null }
}

// H2 with optional grade pill
function H2WithGrade({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { title, grade } = extractGradeFromTitle(children)
  
  if (grade) {
    return (
      <h2 className="heading-3 mb-4 mt-8 flex items-center justify-between gap-4" {...props}>
        <span>{title}</span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6900] text-base font-bold text-white shadow-[0_4px_12px_rgba(255,105,0,0.4)]">
          {grade}
        </span>
      </h2>
    )
  }
  
  return <h2 className="heading-3 mb-4 mt-8" {...props}>{children}</h2>
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="heading-2 mb-6 mt-10 first:mt-0" {...props} />
  ),
  h2: H2WithGrade,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="heading-4 mb-3 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="body-l mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="body-l mb-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="body-l mb-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-2" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-[var(--color-accent)] bg-[var(--color-sand)]/50 py-4 pl-6 pr-4 italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-transparent px-0 py-0 font-mono text-sm text-inherit"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-[var(--color-sand)] p-4 text-sm text-dark-3 [&_code]:bg-transparent [&_code]:text-inherit"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    // Redirect external waitlist links to the in-page waitlist section
    const href = props.href || "#"
    const isWaitlistLink = href.includes("getcravit.com") || href.includes("waitlist")
    const finalHref = isWaitlistLink ? "#waitlist" : href
    
    return (
      <Link
        href={finalHref}
        className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-2 transition-colors hover:decoration-[var(--color-accent)]"
        {...props}
      />
    )
  },
  hr: () => (
    <hr className="my-8 border-t border-[var(--color-dark-1)]/10" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="my-6 block overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={typeof props.src === "string" ? props.src : ""}
        alt={props.alt || ""}
        className="w-full rounded-xl"
      />
    </span>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[var(--color-dark-1)]" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),
  // Table components
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => <Table {...props} />,
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <TableHead {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <TableBody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <TableRow {...props} />,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <TableHeader {...props} />,
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <TableCell {...props} />,
  // Custom components for rich layouts
  ImageFull,
  ImageRight,
  ImageLeft,
  Callout,
  PizzaReview,
  PizzeriaTable,
  PizzeriaInfoCard,
  ImageGallery,
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="prose-cravit">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  )
}
