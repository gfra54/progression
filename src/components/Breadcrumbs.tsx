export interface CrumbType {
  label: string;
  href?: string; // optional
}

interface BreadcrumbsPropsType {
  items: CrumbType[];
}

export default function Breadcrumbs({ items }: BreadcrumbsPropsType) {
  return (
    <nav className='text-sm text-gray-600 mb-4' aria-label='Breadcrumb'>
      <ol className='flex flex-wrap items-center space-x-2'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {item.href ? (
              <a href={item.href} className='hover:text-blue-600 font-medium'>
                {item.label}
              </a>
            ) : (
              <span className='text-gray-800 font-semibold'>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className='mx-2 text-gray-400'>›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
