/**
 * Représente un segment du fil d'Ariane avec un libellé et, si besoin, un lien.
 */
export interface CrumbType {
  label: string;
  href?: string;
}

interface BreadcrumbsPropsType {
  items: CrumbType[];
}

/**
 * Affiche un fil d'Ariane accessible pour contextualiser la navigation dans la progression.
 */
export default function Breadcrumbs({ items }: BreadcrumbsPropsType) {
  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-blue-600 font-medium">
                  {item.label}
                </a>
              ) : (
                <span
                  className="text-gray-800 font-semibold"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="mx-2 text-gray-400">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
