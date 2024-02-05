import React from 'react'
import DropdownBottomDrawer, {
  DropdownBottomDrawerItem
} from "@components/buttons/dropdown-bottom-drawer/dropdown-bottom-drawer";

interface SelectTimeProps {
  onSelect?: (branch: string[]) => void;
  initialState?: string[];
}

const options = [{
  id: 1, title: "Morning (before noon)", value: "morning"
}, {
  id: 2, title: "Afternoon (noon - 5pm)", value: "afternoon"
}, {
  id: 3, title: "Evening (after 5pm)", value: "evening"
}] as DropdownBottomDrawerItem<string>[];


const SelectTime: React.FC<SelectTimeProps> = ({
                                                 onSelect, initialState
                                               }) => {

  const [selectedTimes, setSelectedTimes] = React.useState<string[]>(options.map((option) => option.value));


  const handleSelect = (times: string[]) => {
    setSelectedTimes(times);
    onSelect && onSelect(times);

  }
  const label = "Select Time";


  return <DropdownBottomDrawer clearAll={false} selectAll={false} initialState={options} onSelect={handleSelect} label={label} options={options}/>

}

export default SelectTime
