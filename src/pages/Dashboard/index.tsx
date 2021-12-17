import ContentHeader from 'components/ContentHeader';
import SelectInput from 'components/SelectInput';

export default function Dashboard() {
  const options = [
    {
      value: 'João',
      label: 'João',
    },
    {
      value: 'Pedro',
      label: 'Pedro',
    },
    {
      value: 'Ana',
      label: 'Ana',
    },
  ];

  return (
    <ContentHeader title="Dashboard" lineColor="#f7931B">
      <SelectInput options={options} />
      <SelectInput options={options} />
    </ContentHeader>
  );
}
