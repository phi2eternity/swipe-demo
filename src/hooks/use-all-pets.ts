import { useEffect, useState } from 'react';
import { CustomerGetAllPetsUseCase } from '@domain/usecases/customer/get-all-pets';
import { useInjection } from 'inversify-react';
import { PetDetailsEntity } from '@domain/types/common/pet-details';

const useAllPets = () => {
  const [pets, setPets] = useState<PetDetailsEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getAllPets = useInjection<CustomerGetAllPetsUseCase>(CustomerGetAllPetsUseCase)

  useEffect(() => {
    getAllPets
      .call()
      .then(setPets)
      .catch(setError)
      .finally (() => setLoading(false)) ;
  }, []);

  return { pets, loading, error };
}

export default useAllPets;
