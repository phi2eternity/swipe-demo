import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageCard from '@components/cards/page-card/page-card';
import AddPetDumb from '@pages/add-pet/index.dumb';
import { useInjection } from 'inversify-react';
import { CustomerCreatePetUseCase } from '@domain/usecases/customer/create-pet';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { useSelector } from 'react-redux';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';
import { QuickerFirebaseStorage } from '@data/datasources/firebase/storage';
import { UploadProofRequest } from '@domain/types/requests/firebase/upload-proof';
import useAllPets from '@hooks/use-all-pets';
import { RouteNames } from '@quicker/route-names';

export interface AddPetPageProps {

}


export const AddPetPage: React.FC<AddPetPageProps> = ({}: AddPetPageProps) => {


  const navigate = useNavigate();
  const createPet = useInjection<CustomerCreatePetUseCase>(CustomerCreatePetUseCase);
  const firebaseStorage = useInjection<QuickerFirebaseStorage>(QuickerFirebaseStorage);
  const [_, setLoading] = useLoadingOverlay();
  const {
    orderType
  } = useSelector((state: any) => state.order);

  const { pets } = useAllPets();
  const goBack = () => {
    navigate(RouteNames.HOME);
  };

  const handleSubmit = (request:CreatePetRequest) =>{
    setLoading(true);
    createPet.call(request).then((response) => {
      if(orderType && pets.length === 0) {
        navigate(RouteNames.BOOK);
      }else{
        navigate(RouteNames.HOME);
      }
    }).catch().finally(() => {
      setLoading(false);

    });
  }

  const handleProof = (request: UploadProofRequest) => {
    firebaseStorage.uploadProof(request).then((response) => {
    });
  }

  return <PageCard><AddPetDumb handleProof={handleProof} pets={pets} submit={handleSubmit}  goBack={goBack} /></PageCard>;
};

export default AddPetPage;
