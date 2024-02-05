import {injectable} from "inversify";
import {BranchEntity} from "@domain/types/common/branch";

@injectable()
export abstract class BranchRepository {

  abstract getAllBranches(): Promise<BranchEntity[]>;
}

