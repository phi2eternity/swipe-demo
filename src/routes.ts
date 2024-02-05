import { lazy } from 'react';
import { LogoutPage } from '@pages/logout';
import { RouteNames } from '@quicker/route-names';
import { PaymentMethodsPage } from '@pages/payment-methods';
import { AddCreditCardPage } from '@pages/add-credit-card';

const AddPetPage = lazy(() => import("@pages/add-pet"));
const ThanksPage = lazy(() => import("@pages/thanks"));
const PolicyPage = lazy(() => import("./pages/policy"));
const BookPage = lazy(() => import("./pages/bookpage/bookpage"));
const HomePage = lazy(() => import("@pages/homepage"));
const AddOnsPage = lazy(() => import("./pages/addons/add-ons"));
const PaymentPage = lazy(() => import("./pages/payment"));
const MyAccountPage = lazy(() => import("./pages/my-account"));
const AppointmentsPage = lazy(() => import("./pages/appointments"));
const PetsPage = lazy(() => import("./pages/pets"));
const PetDetailsPage = lazy(() => import("./pages/pet-details"));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password'));
const SignUpPage = lazy(() => import('./pages/sign-up'));
const LoginPage = lazy(() => import('@pages/login'));
const NotFoundPage = lazy(() => import('@pages/error-page'));

export const routes = [
  { path: "/", component: HomePage },
  { path: "/book", component: BookPage },
  { path: "/add-ons", component: AddOnsPage },
  { path: "/payment", component: PaymentPage },
  { path: "/policy", component: PolicyPage },
  { path: "/thank-you", component: ThanksPage },
  { path: "/add-pet", component: AddPetPage },
  { path: "/my-account", component: MyAccountPage },
  { path: "/appointments", component: AppointmentsPage },
  { path: "/pets", component: PetsPage },
  { path: "/pet-details", component: PetDetailsPage },
  { path: "/logout", component: LogoutPage},
  { path: RouteNames.PAYMENT_METHODS, component: PaymentMethodsPage},
  { path: RouteNames.ADD_CARD, component: AddCreditCardPage},
  { path: "/login", component: LoginPage, publicRoute: true },
  { path: "/forgotpassword", component: ForgotPasswordPage, publicRoute: true },
  { path: "/signup", component: SignUpPage, publicRoute: true },
  { path: "*", component: NotFoundPage,publicRoute: true },
];

