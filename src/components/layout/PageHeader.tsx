import Link from "next/link"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react"

interface Crumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
}

export function PageHeader({ eyebrow, title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-primary py-10 md:py-14">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList className="text-white/60">
              {breadcrumbs.map((crumb, i) => (
                <Fragment key={i}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink
                        render={<Link href={crumb.href} />}
                        className="text-white/60 hover:text-white text-[12px]"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-white/85 text-[12px]">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {i < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="text-white/30" />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {eyebrow && (
          <p className="flex items-center gap-2 text-[11px] font-semibold text-accent uppercase tracking-widest mb-3">
            <span className="block w-4 h-0.5 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        )}

        <h1 className="font-serif text-[30px] md:text-[38px] font-bold text-white leading-[1.15]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/70 text-[15px] leading-[1.6] mt-3 max-w-[640px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
