import { OffsetResponse } from '../../src/domain/types/responses/offset';
import { AppointmentEntity } from '../../src/domain/types/common/appointment';
import { PetDetailsMockGenerator } from '../../src/domain/types/__mock__/pet-details';
import { AppointmentMockGenerator } from '../../src/domain/types/__mock__/appointment';
import { BranchMockGenerator } from '../../src/domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '../../src/domain/types/__mock__/employee-generator';
import { DailyAvailableSlotMockGenerator } from '../../src/domain/types/__mock__/daily-available-slot-generator';
import ProductMockGenerator from '../../src/domain/types/__mock__/product-generator';
import { ResponsePool } from '../utils/response-pool';

export const injectResponses = (responsePool: ResponsePool) => {
  const petGenerator = new PetDetailsMockGenerator();
  const appointmentGenerator = new AppointmentMockGenerator();
  const branchGenerator = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();
  const dailyAvailableGenerator = new DailyAvailableSlotMockGenerator();
  const productGenerator = new ProductMockGenerator();

  const pets = petGenerator.generateMany(3);
  const products = productGenerator.generateMany(20);
  const branches = branchGenerator.generateMany(5);
  const employees = employeeGenerator.generateMany(15);
  // Appointment generator needs to know about the employees, branches, products and pets
  const appointments = appointmentGenerator.generateMany(50, { pets,branches,employees,products});
  const dailySlots = dailyAvailableGenerator.generateMany(25,{employees,branches});


  responsePool.addConstantResponse({
    endpoint: '/api/customer/pets/all', method: 'GET', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify(pets),
    },
  });

  responsePool.addConstantResponse({
    endpoint: '/api/customer/appointments/upcoming', method: 'GET', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify({
        count: appointments.length, next: null, previous: null, results: appointments,
      } as OffsetResponse<AppointmentEntity>),
    },
  });

  responsePool.addConstantResponse({
    endpoint: '/api/branch/all', method: 'GET', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify(branches),

    },
  });

  responsePool.addConstantResponse({
    endpoint: '/api/employees', method: 'GET', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify(employees),
    },
  });

  responsePool.addConstantResponse({
    endpoint: 'api/available/daily', method: 'POST', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify(dailySlots),
    },
  });

  responsePool.addConstantResponse({
    endpoint: '/api/products/all', method: 'GET', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify(products),
    },

  });

  responsePool.addConstantResponse({
    endpoint: '/api/customer/appointment/create', method: 'POST', payload: {
      contentType: 'application/json', status: 200, headers: {
        'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }, body: JSON.stringify(appointments[0]),
    }
  });
  return {
    pets,
    products,
    branches,
    employees,
    appointments,
    dailySlots,
  }
}
