import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface SelectedPetState {
  pet?: PetDetailsEntity | null;
};

const initialState: SelectedPetState = {
  pet: null,
}

const selectedPetSlice = createSlice({
  name: "selectedPet",
  initialState,
  reducers: {
    setSelectedPet: (state, action: PayloadAction<PetDetailsEntity | null>) => {
      state.pet = action.payload;
    }
  }
});

export const SelectedPetActions = selectedPetSlice.actions;

export default selectedPetSlice;
