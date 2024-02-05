import { useInjection } from "inversify-react";
import { GetAllBranchesUseCase } from "@domain/usecases/branch/get-all-branches";
import { useEffect, useState } from "react";
import { BranchEntity } from "@domain/types/common/branch";

const useAllBranches = (): BranchEntity[] => {
  const getAllBranches = useInjection<GetAllBranchesUseCase>(
    GetAllBranchesUseCase
  );
  const [branches, setBranches] = useState<BranchEntity[]>([]);

  useEffect(() => {
    getAllBranches.call().then((response) => {
      setBranches(response);
    });
  }, []);
  branches.sort((a, b) => a.name.localeCompare(b.name));

  return branches;
};

export default useAllBranches;
