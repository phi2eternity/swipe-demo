import {BranchEntity} from "@domain/types/common/branch";
import {NoParams} from "@quicker/common/no-params";
import {UseCase, UseCaseWithNoParams} from "@quicker/common/use-case";
import {inject, injectable} from "inversify";
import {BranchRepository} from "@domain/repositories/branch/repository";

@injectable()
export class GetAllBranchesUseCase implements UseCaseWithNoParams<BranchEntity[]> {
  constructor(@inject(BranchRepository) private readonly repository: BranchRepository) {
  }

  async call(): Promise<BranchEntity[]> {
    return await this.repository.getAllBranches();
  }
}
