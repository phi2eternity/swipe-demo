import {injectable} from "inversify";

@injectable()
export abstract class UseCase<Params, Result> {
  abstract call(params: Params): Result;
}

@injectable()
export abstract class UseCaseWithNoParams<Result> {
  abstract call(): Promise<Result>;
}

