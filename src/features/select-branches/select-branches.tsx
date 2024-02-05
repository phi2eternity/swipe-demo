import React from 'react'
import useAllBranches from "@hooks/use-all-branches";
import {BranchEntity} from "@domain/types/common/branch";
import DropdownBottomDrawer,{DropdownBottomDrawerItem} from "@components/buttons/dropdown-bottom-drawer/dropdown-bottom-drawer";

interface SelectBranchProps {
  onSelect?: (branch: BranchEntity[]) => void;
}


const SelectBranches: React.FC<SelectBranchProps> = ({
                                                      onSelect
                                                   }) => {

  const [selectedBranches, setSelectedBranches] = React.useState<BranchEntity[]>([]);
  const allBranches: BranchEntity[] = useAllBranches();

  const handleSelect = (branches: BranchEntity[]) => {
    setSelectedBranches(branches);
    onSelect && onSelect(branches);
  }

  const label = "Select Store";

  const options = allBranches.map((branch) => {
    return {
      id: branch.id,
      title: branch.name,
      description: branch.address,
      value:branch
    } as DropdownBottomDrawerItem<BranchEntity>
  });

  return <DropdownBottomDrawer selectAll={false} clearAll={false} onSelect={handleSelect} label={label} options={options}/>

}

export default SelectBranches
