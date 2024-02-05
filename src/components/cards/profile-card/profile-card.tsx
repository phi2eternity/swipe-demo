import "./profile-card.scss";
import React from "react";
import PetCard from "../pet-card";
import bgSrc from "../../../assets/bgtop.png";
import CarouselSlider from "../../carousel-slider/carousel-slider";
import ProfileBtn from "../../buttons/profile-btn";
import AddBtn from "../../buttons/add-btn";
import { useNavigate } from 'react-router-dom';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { useDispatch } from 'react-redux';
import  { SelectedPetActions } from '@quicker/store/selected-pet-slice';

interface ProfileCardProps {
  pets?: PetDetailsEntity[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({pets = []}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddClick = () => {
    navigate("/add-pet");
  }
  const goToMyAccount = () => {
    navigate("/my-account");
  }

  const handlePetClick = (pet:PetDetailsEntity) => () => {
    dispatch(SelectedPetActions.setSelectedPet(pet));
    navigate("/pet-details");
  };

  const args = pets.map((pet) => {
    return {
      name: pet.name,
      age: pet.age,
      onClick:handlePetClick(pet)


    };
  });


  return (
    <div className="profile">
      <div className="row row1">
        <div className="icons">
          <ProfileBtn onClick={goToMyAccount} />
          <AddBtn onClick={handleAddClick}/>
        </div>
      </div>
      {pets.length === 0 && <div className={"text-column"}><p> You can add your dog by clicking + button.</p></div>}
      <div className="row pets-slider">
        <CarouselSlider
          args={args}
          Element={PetCard}
        />
      </div>
      <div className="bg-row row">
        <img alt={"bg"} src={bgSrc}></img>
      </div>
    </div>
  );
};

export default ProfileCard;
