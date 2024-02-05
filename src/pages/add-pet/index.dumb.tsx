import React from 'react';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import TextInputFormField from '@components/inputs/text-input-form-field';
import PetBreedSelect from '@pages/add-pet/pet-breed-select';
import PetGenderSelect from '@components/inputs/pet-gender-select';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import PetWeightSelect from '@pages/add-pet/pet-weight-select';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import PetBirthDateSelect from '@pages/add-pet/birth-date';
import { HealthInformation } from '@pages/add-pet/health-information';
import { UploadProofRequest } from '@domain/types/requests/firebase/upload-proof';
import { PetDetailsEntity } from '@domain/types/common/pet-details';

export interface AddPetPageProps {
  goBack?: () => void;
  submit?: (request: CreatePetRequest) => void;
  handleProof?: (request:UploadProofRequest) => void;
  pets?: PetDetailsEntity[];
}


export const AddPetDumb: React.FC<AddPetPageProps> = ({
                                                        goBack, submit,handleProof,pets = []
                                                      }: AddPetPageProps) => {
  const initialDate = new Date();
  const [breed, setBreed] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const [gender, setGender] = React.useState<string | null>(null);
  const [birthDate, setBirthDate] = React.useState<Date | null>(initialDate);
  const [weight, setWeight] = React.useState<number | null>(null);
  const [specialHandling, setSpecialHandling] = React.useState<string | null>(null);
  const [rabiesExp, setRabiesExp] = React.useState<Date | null>(initialDate);
  const [rabiesProof, setRabiesProof] = React.useState<File | null>(null);
  const [healthInformationError, setHealthInformationError] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [birthDateError, setBirthDateError] = React.useState<string | null>(null);

  const handleSubmit = () => {
    let flag = false;
    const petNameExists = pets.find((pet) => pet.name === name);
    if(petNameExists) {
      flag = true;
    }
    if (!flag && gender && breed && name && weight && birthDate && rabiesProof) {
      setError(false);
      setBirthDateError(null);
      setHealthInformationError(null);
      const request = {
        name,
        breed,
        gender,
        birth_date: birthDate.toISOString(),
        special_handling: specialHandling ?? '',
        weight,
        rabies_vaccination: rabiesExp?.toISOString() ?? '',
      };
      submit && submit(request);
      const handleProofRequest = {
        petName:name,
        file:rabiesProof,
        date: rabiesExp
      } as UploadProofRequest;
      handleProof && handleProof(handleProofRequest);
    } else {
      if (birthDate === null) {
        setBirthDateError('Birth date cannot be empty.');
      }
      if (rabiesProof === null) {
        setHealthInformationError('Proof should be available.');
      }
      if(petNameExists){
        setNameError('Pet with same name already exists.');
      }
      else if(!name) {
        setNameError('Name cannot be empty.');
      }
      console.log(nameError);

      setError(true);
    }
  };


  const handleGoBack = () => {
    goBack && goBack();
  };

  const handleBirthDateChange = (date: Date) => {
    setBirthDate(date);
    const now = new Date();

    if (date.getTime() > now.getTime()) {
      setBirthDateError('Birth date cannot be in the future.');
    } else if (date.getTime() < now.setFullYear(now.getFullYear() - 32)) {
      setBirthDateError('Birth date cannot be more than 32 years ago.');
    } else {
      setBirthDateError('');
    }
  };

  return <div className={style.addPetPage}>
    <div className={style.addPetPageTop}>
      <BiLeftArrow onClick={handleGoBack} />
      <h1>Add Pet</h1>
    </div>

    <div className={style.addPetPage__form}>
      <h3 className={style.addPetPage__formHeader}>
        Pet information
      </h3>
      <TextInputFormField label={'Name'} onChanged={setName} />
      {(error && nameError) ? <div className={style.addPetPageError}>{nameError}</div> :
        <div style={{ height: '16px' }} />}
      <PetBreedSelect onSelect={setBreed} />
      {(error && !breed) ? <div className={style.addPetPageError}>Breed cannot be empty.</div> :
        <div style={{ height: '16px' }} />}
      <PetGenderSelect onSelect={setGender} />
      {error && !gender ? <div className={style.addPetPageError}>Gender cannot be empty.</div> :
        <div style={{ height: '16px' }} />}

      <PetWeightSelect onSelect={setWeight} />
      {error && !weight ? <div className={style.addPetPageError}>Weight cannot be empty.</div> :
        <div style={{ height: '16px' }} />}
      <TextInputFormField label={'Special Handling'} multiline={true} onChanged={setSpecialHandling} />
      <div style={{ height: '32px' }} />
      <h3 className={style.addPetPage__formHeader}>Birth Date</h3>
      <div style={{
        height: '8px',
      }} />
      <PetBirthDateSelect onChange={handleBirthDateChange} />
      {(error && birthDateError !== '') ? <div className={style.addPetPageError}>{birthDateError}</div> :
        <div style={{ height: '16px' }} />}
      <div style={{
        height: '16px',
      }} />
      <h3 className={style.addPetPage__formHeader}>Health information</h3>

      <HealthInformation onExpirationChange={setRabiesExp} onProofChange={setRabiesProof} />
      {(error && healthInformationError !== '') ?
        <div className={style.addPetPageError}>{healthInformationError}</div> : <div style={{ height: '16px' }} />}
      <div style={{
        height: '24px',
      }} />

      <CtaPrimary onClick={handleSubmit} content={'Submit'} />
    </div>

  </div>;
};

export default AddPetDumb;
