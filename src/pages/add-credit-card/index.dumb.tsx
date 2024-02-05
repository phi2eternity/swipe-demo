import React from 'react';
import { PageLayout } from '@components/layouts/page-layout';
import { ErrorMessage,  Form, Formik } from 'formik';
import { CreditCardInformation, CreditCardBrand } from '@domain/types/common/credit-card';
import * as Yup from 'yup';
import CtaSecondary from '@components/buttons/cta-secondary';
import { FormikHelpers } from 'formik/dist/types';
import style from '@pages/add-credit-card/index.module.scss';
import TextInputFormField from '@components/inputs/text-input-form-field';
import { ExpiryDate } from '@components/inputs/expiry-date';
import DropdownSelect from '@components/inputs/dropdown-select';

export interface AddCreditCardDumbProps {
  onClick?: () => void;
  onSubmit: (values: CreditCardInformation, formikHelpers: FormikHelpers<CreditCardInformation>) => void | Promise<any>;

}

const initialValues: CreditCardInformation = {
  cvv: '', card_number: '', exp_date: '', brand: CreditCardBrand.Visa, cardholder_name: '', address: {
    city: '', country: '', address_line_1: '', address_line_2: '', postal_code: '', state: '',
  },
};

const validationSchema = Yup.object({
  // cvv must be numeric. cvv must be 3 digits. cvv is required.
  cvv: Yup.string().matches(/^[0-9]{3}$/, 'CVV must be 3 digits').required('CVV is required'),
  card_number: Yup.string().matches(/^[0-9]{16}$/, 'Card Number must be 16 digits').required('Card Number is required'),
  exp_date: Yup.string().required('Expiry Date is required'),
  brand: Yup.string().required('Brand is required'),
  cardholder_name: Yup.string().matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Please enter your first name and last name').required('Cardholder Name is required'),
  address: Yup.object({
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    address_line_1: Yup.string().required('Address Line 1 is required'),
    address_line_2: Yup.string(),
    postal_code: Yup.string().required('Postal Code is required'),
    state: Yup.string().required('State is required'),
  }),
});

export const AddCreditCardDumb = ({
                                    onClick, onSubmit,
                                  }: AddCreditCardDumbProps) => {
  return <PageLayout name={'Add Credit Card'} onClick={onClick}>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit,errors, values, setFieldValue }) => (<Form className={style.addCreditCard}>
        <h3 className={style.subHeader}>Card Information</h3>
        <div style={{ height: '16px' }} />
        <div>
          <TextInputFormField label={'Cardholder Name'}
                              onChanged={(value) => setFieldValue('cardholder_name', value)}
          />
          <ErrorMessage className={style.errorMessage} name='cardholder_name' />
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <TextInputFormField label={'Card Number'}
                              validator={(value) => value.length <= 16}
                              onChanged={(value) => setFieldValue('card_number', value)}
          />
          <ErrorMessage className={style.errorMessage} name='card_number' />
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <DropdownSelect initialValue={{ label: CreditCardBrand.Visa, value: CreditCardBrand.Visa }}
                          toggleWhenSelected={true}
                          options={Object.values(CreditCardBrand).map(value => ({
                            label: value, value,
                          }))} label={'Brand'} onSelect={(value) => setFieldValue('brand', value)} />
          <ErrorMessage className={style.errorMessage} name='brand' />
        </div>
        <div className={style.addCreditCard__row}>
          <div>
            <ExpiryDate onChange={(value) => setFieldValue('exp_date', value)} />
            <ErrorMessage name='exp_date' />
          </div>
          <div>
            <TextInputFormField onChanged={(value) => setFieldValue('cvv', value)}
                                validator={(value) => value.length <= 3}
                                label={'CVV'}
                                type={'password'} />
            <ErrorMessage className={style.errorMessage} name='cvv' />
          </div>
        </div>
        <div style={{ height: '16px' }} />
        <h3 className={style.subHeader}>Address Information</h3>
        <div style={{ height: '16px' }} />
        <div>
          <TextInputFormField label={'Address Line 1'}
                              onChanged={(value) => setFieldValue('address.address_line_1', value)} />
          <ErrorMessage className={style.errorMessage} name={'address.address_line_1'}  />
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <TextInputFormField label={'Address Line 2'}
                              onChanged={(value) => setFieldValue('address.address_line_2', value)} />
          <ErrorMessage className={style.errorMessage} name={'address.address_line_2'} />
        </div>
        <div className={style.addCreditCard__row}>
          <div>
            <TextInputFormField label={'City'}
                                onChanged={(value) => setFieldValue('address.city', value)} />
            <ErrorMessage className={style.errorMessage} name={'address.city'} />
          </div>
          <div>
            <TextInputFormField label={'Country'}
                                onChanged={(value) => setFieldValue('address.country', value)} />
            <ErrorMessage className={style.errorMessage} name={'address.country'} />
          </div>

        </div>

        <div className={style.addCreditCard__row}>
          <div>
            <TextInputFormField label={'State'}
                                onChanged={(value) => setFieldValue('address.state', value)} />
            <ErrorMessage className={style.errorMessage} name={'address.state'} />
          </div>
          <div>
            <TextInputFormField label={'Postal Code'}
                                onChanged={(value) => setFieldValue('address.postal_code', value)} />
            <ErrorMessage className={style.errorMessage} name={'address.postal_code'} />
          </div>

        </div>
        <div style={{ height: '16px' }} />

        <CtaSecondary text={'Submit'} onClick={handleSubmit} />
      </Form>)}
    </Formik>
  </PageLayout>;
};
