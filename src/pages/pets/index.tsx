import useAllPets from '@hooks/use-all-pets';
import PageCard from '@components/cards/page-card/page-card';
import PetsPageDumb from '@pages/pets/index.dumb';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SelectedPetActions } from '@quicker/store/selected-pet-slice';


const PetsPage = () => {
  const { pets } = useAllPets();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickPet = (selectedPet: PetDetailsEntity) => {
    dispatch(SelectedPetActions.setSelectedPet(selectedPet));
    navigate('/pet-details');

  };

  const goBack = () => {
    // If window history is empty, go to /
    if (window.history.length === 0) {
      navigate('/');
    } else {
      window.history.back();
    }
  };

  return <PageCard>
    <PetsPageDumb pets={pets} onClickPet={handleClickPet} goBack={goBack} />
  </PageCard>;
};

export default PetsPage;
