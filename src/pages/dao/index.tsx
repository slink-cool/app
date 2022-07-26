import { DaoCard } from '@entities/dao';
import { NextPage } from 'next';

const DaosPage: NextPage = () => {
  return (
    <div className="py-16">
      <h1 className="mb-4">DAOs</h1>
      <div className="grid grid-cols-8 gap-6">
        <div className="col-span-4">
          <DaoCard
            title="Delink — Web3 Hiring Platform"
            description="Web3 platform for IT-specialists"
            tags={['DEX', 'Aggregator']}
          />
        </div>
        <div className="col-span-4">
          <DaoCard
            title="Delink — Web3 Hiring Platform"
            description="Web3 platform for IT-specialists"
            tags={['DEX', 'Aggregator']}
          />
        </div>
      </div>
    </div>
  );
};

export default DaosPage;
