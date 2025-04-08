import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from 'src/components/Breadcrumb/Breadcrumb';
import { appRoutes } from 'src/routes/appRoutes';
import { CategoryPathItem } from '../_dtos/getCategorypath.dto';

interface CategoryBreadcrumbProps {
  categoryPath: CategoryPathItem[];
}

export default function CategoryBreadcrumb({ categoryPath }: CategoryBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {categoryPath.map((path, idx) => (
          <Fragment key={path.code}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`${appRoutes.category.all}/${path.code}`}>{path.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {idx < categoryPath.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
