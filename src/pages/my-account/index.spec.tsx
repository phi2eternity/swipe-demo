import MyAccountDumb from '@pages/my-account/index.dumb';
import { render } from '@testing-library/react';

describe('MyAccount', () => {
  const name = "John Doe";
  const email = "john.doe@gmail.com"
  it('should be defined.',()=>{
    expect(MyAccountDumb).toBeDefined();
  });

  it('should render correctly with props.',()=>{

    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper).toMatchSnapshot();

  });
  it('should name be equal to name prop.',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText(name)).toBeDefined();

  });
  it('should email be equal to email prop.',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText(email)).toBeDefined();
  });

  it('should have a button with text "Appointments".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("Appointments")).toBeDefined();
  });
  it('should have a button with text "My Pets".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("My Pets")).toBeDefined();
  });
  it('should have a button with text "Rewards".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("Rewards")).toBeDefined();
  });
  it('should have a button with text "Help".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("Help")).toBeDefined();
  });
  it('should have a button with text "Change Password".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("Change Password")).toBeDefined();
  });
  it('should have a button with text "My Payment Methods".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("My Payment Methods")).toBeDefined();
  });
  it('should have a button with text "Logout".',()=>{
    const wrapper = render(<MyAccountDumb name={name} email={email}/>);
    expect(wrapper.getByText("Logout")).toBeDefined();
  });
  it('when click on "Appointments" button should call onClickAppointments prop.',()=>{
    const onClickAppointments = jest.fn();
    const wrapper = render(<MyAccountDumb name={name} email={email} onClickAppointments={onClickAppointments}/>);
    wrapper.getByText("Appointments").click();
    expect(onClickAppointments).toHaveBeenCalled();
  });
  it('when click on "My Pets" button should call onClickMyPets prop.',()=>{
    const onClickMyPets = jest.fn();
    const wrapper = render(<MyAccountDumb name={name} email={email} onClickMyPets={onClickMyPets}/>);
    wrapper.getByText("My Pets").click();
    expect(onClickMyPets).toHaveBeenCalled();
  });
  it('when click on "Change Password" button should call onClickChangePassword prop.',()=>{
    const onClickChangePassword = jest.fn();
    const wrapper = render(<MyAccountDumb name={name} email={email} onClickChangePassword={onClickChangePassword}/>);
    wrapper.getByText("Change Password").click();
    expect(onClickChangePassword).toHaveBeenCalled();
  });
  it('when click on "My Payment Methods" button should call onClickPaymentMethods prop.',()=>{
    const onClickPaymentMethods = jest.fn();
    const wrapper = render(<MyAccountDumb name={name} email={email} onClickPaymentMethods={onClickPaymentMethods}/>);
    wrapper.getByText("My Payment Methods").click();
    expect(onClickPaymentMethods).toHaveBeenCalled();
  });
  it('when click on "Logout" button should call onClickLogout prop.',()=>{
    const onClickLogout = jest.fn();
    const wrapper = render(<MyAccountDumb name={name} email={email} onClickLogout={onClickLogout}/>);
    wrapper.getByText("Logout").click();
    expect(onClickLogout).toHaveBeenCalled();
  });

});
