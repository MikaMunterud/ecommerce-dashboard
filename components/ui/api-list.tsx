'use client';

import { ApiAlert } from '@/components/ui/api-alert';
import { useParams } from 'next/navigation';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export default function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();

  const baseUrl = `${window.location.origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}