import React from 'react'
import useAllGroomers from "@hooks/use-all-groomers";
import {EmployeeEntity} from "@domain/types/common/employee";
import DropdownBottomDrawer, {
  DropdownBottomDrawerItem
} from "@components/buttons/dropdown-bottom-drawer/dropdown-bottom-drawer";

interface SelectGroomersProps {
  onSelect?: (branch: EmployeeEntity[]) => void;
}


const SelectGroomers: React.FC<SelectGroomersProps> = ({
                                                     onSelect
                                                   }) => {

  const [groomers, setGroomers] = React.useState<EmployeeEntity[]>([]);
  const allGroomers: EmployeeEntity[] = useAllGroomers();

  const handleSelect = (branches: EmployeeEntity[]) => {
    setGroomers(branches);
    onSelect && onSelect(branches);
  }

  const label = "Select Groomers";

  const options = allGroomers.map((groomer) => {
    return {
      id: groomer.id,
      title: groomer.name,
      value:groomer
    } as DropdownBottomDrawerItem<EmployeeEntity>
  });

  return <DropdownBottomDrawer onSelect={handleSelect} label={label} options={options}/>

}

export default SelectGroomers
