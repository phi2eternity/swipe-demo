import {RemoteDataSource} from "@data/datasources/remote-data-source";
import {injectable} from "inversify";
import {BranchEntity} from "@domain/types/common/branch";

@injectable()
export abstract class BranchRemoteDataSource extends RemoteDataSource {
  abstract getAllBranches(): Promise<BranchEntity[]>;
}

