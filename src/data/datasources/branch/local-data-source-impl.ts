import { BranchEntity } from "@domain/types/common/branch";
import { BranchLocalDataSource } from "@data/datasources/branch/local-data-source";
import { injectable } from "inversify";

@injectable()
export class BranchLocalDataSourceImpl extends BranchLocalDataSource {
  getAllBranches(): BranchEntity[] | null {
    // Get from session storage
    const branches = localStorage.getItem("branches");

    if (branches && branches.length > 0) {
      return JSON.parse(branches) as BranchEntity[];
    } else {
      return null;
    }
  }

  setAllBranches(branches: BranchEntity[]): void {
    localStorage.setItem("branches", JSON.stringify(branches));
  }
}
