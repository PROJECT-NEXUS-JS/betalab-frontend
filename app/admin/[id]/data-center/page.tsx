import DataCenterDetail from '@/components/admin/data-center/DataCenterDetail';

export default async function DataCenterPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  return <DataCenterDetail postId={id} />;
}
