import {injectable} from "inversify";
import {BranchEntity} from "@domain/types/common/branch";
import {LocalDataSource} from "@data/datasources/local-data-source";

@injectable()
export abstract class BranchLocalDataSource extends LocalDataSource {
  abstract getAllBranches(): BranchEntity[] | null;

  abstract setAllBranches(branches: BranchEntity[]): void;
}

