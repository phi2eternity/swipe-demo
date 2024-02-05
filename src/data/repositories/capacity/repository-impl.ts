import { inject, injectable } from 'inversify';
import { CapacityRepository } from '@domain/repositories/capacity-repository';
import { MonthlyCapacityRequest } from '@domain/types/requests/monthly-capacity-request';
import { MonthlyCapacityResponse } from '@domain/types/responses/monthly-capacity-response';
import {
  CapacityRemoteDataSource,
} from '@data/datasources/capacity/capacity-remote-data-source';
import { CapacityLocalDataSource } from '@data/datasources/capacity/local-data-source';

@injectable()
export class CapacityRepositoryImpl implements CapacityRepository {

  constructor(
    @inject<CapacityRemoteDataSource>(CapacityRemoteDataSource) private remoteDataSource: CapacityRemoteDataSource,
    @inject<CapacityLocalDataSource>(CapacityLocalDataSource) private localDataSource: CapacityLocalDataSource) {
  }


  async getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse> {
    const {date} = monthlyCapacityRequest;
    const localResult = this.localDataSource.getMonthlyCapacity(date);
    if(localResult) {
      return Promise.resolve(localResult);
    }else{

      const remoteResult = await this.remoteDataSource.getMonthlyCapacity(monthlyCapacityRequest);
      this.localDataSource.setMonthlyCapacity(date,remoteResult);
      return Promise.resolve(remoteResult);
    }
  }

}
