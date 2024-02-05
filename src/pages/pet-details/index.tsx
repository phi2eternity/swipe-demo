import { useSelector } from 'react-redux';
import PageCard from '@components/cards/page-card/page-card';
import PetDetailsPageDumb from '@pages/pet-details/index.dumb';
import { useNavigate } from 'react-router-dom';


const PetDetailsPage = () => {
  const {selectedPet} = useSelector((state:any) => ({
    selectedPet: state.selectedPet.pet
  }));
  const navigate = useNavigate();
  const handleGoBack = () => {
    // If window history is empty, go to /
    if (window.history.length === 0) {
      navigate("/");
    }else{
      window.history.back();
    }
  }

  return <PageCard>
    <PetDetailsPageDumb goBack={handleGoBack} pet={selectedPet}/>
  </PageCard>

}

export default PetDetailsPage;
