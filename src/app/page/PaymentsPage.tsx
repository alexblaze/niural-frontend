import CustomTableLayout from 'app/components/layout/CustomTableLayout';
import React, { ReactNode } from 'react';

interface PaymentsPageProps {
  children: ReactNode;
}

const PaymentsPage: React.FC<PaymentsPageProps> = ({ children }) => {
  return (
    <div className='container p-8 text-neutral-light-900'>
      <div className='pb-4'>
        <h1 className='text-3xl font-bold'>Payment</h1>
      </div>
      <div className='pb-8'>
        <div className='flex justify-between'>
          <div className='flex gap-x-4'>
            <div>
              <img key='image' src='assets/Vector.svg' />
            </div>
            <div>Filter By:</div>
          </div>
          <div>Dropdown Component</div>
        </div>
      </div>
      <CustomTableLayout>{children}</CustomTableLayout>
    </div>
  );
};

export default PaymentsPage;
