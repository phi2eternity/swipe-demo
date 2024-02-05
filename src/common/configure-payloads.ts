import { HttpClientMockImpl } from '@common/http-client-mock.impl';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { DailyAvailableSlotMockGenerator } from '@domain/types/__mock__/daily-available-slot-generator';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { CreditCardDetailsMockGenerator } from '@domain/types/__mock__/credit-card-details-generator';
import { CreditCardRecordMockGenerator } from '@domain/types/__mock__/credit-card-record.generator';


export const configurePayloads = (client: HttpClientMockImpl) => {

  const clientLoginGenerator = new AuthenticationResponseMockGenerator();
  const appointmentGenerator = new AppointmentMockGenerator();
  const meGenerator = new MeMockGenerator();
  const petGenerator = new PetMockGenerator();
  const petDetailsGenerator = new PetDetailsMockGenerator();
  const branchGenerator = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();
  const availableSlotsGenerator = new DailyAvailableSlotMockGenerator();

  const branches = branchGenerator.generateMany(5);
  const appointments = appointmentGenerator.generateMany(60);
  const upcomingAppointments = appointments.filter((appointment) => appointment.start > new Date().toISOString());
  const pastAppointments = appointments.filter((appointment) => appointment.start < new Date().toISOString());
  const me = meGenerator.generateOne();
  const productGenerator = new ProductMockGenerator();
  const creditCardGenerator = new CreditCardRecordMockGenerator();


  const petDetails = petDetailsGenerator.generateMany(4);
  const groomers = employeeGenerator.generateMany(20);
  const authPayload = clientLoginGenerator.generateOne();
  const availableSlots = availableSlotsGenerator.generateMany(20,{
    branches: branches,
    employees: groomers
  });
  const products = productGenerator.generateMany(32);
  const creditCards = creditCardGenerator.generateMany(4);
  console.log(creditCards);

  client.configure('POST','/api/auth/customer/login', authPayload);
  client.configure('POST','/api/auth/customer/signup', authPayload);
  client.configure('GET','/api/auth/customer/verify', authPayload);


  const upcomingAppointmentsData = {
    count: upcomingAppointments.length,
    next: null,
    previous: null,
    results: upcomingAppointments
  }
  client.configure('GET','/api/customer/appointments/upcoming', upcomingAppointmentsData);

  const pastAppointmentsData = {
    count: pastAppointments.length,
    next: null,
    previous: null,
    results: pastAppointments
  }
  client.configure('GET','/api/customer/appointments/past', pastAppointmentsData);

  const allAppointmentsData = {
    count: appointments.length,
    next: null,
    previous: null,
    results: appointments
  }
  client.configure('GET','/api/customer/appointments/all', allAppointmentsData);

  client.configure('GET','/api/me', me);
  client.configure('GET','/api/customer/pets/all',petDetails);

  client.configure('GET','/api/branch/all',branches);
  client.configure('GET','/api/employees',groomers);
  client.configure('POST','/api/available/daily',availableSlots);
  client.configure('GET','/api/products/all',products);
  client.configure('GET','/payment/cards',creditCards);
}
