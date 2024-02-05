import {useInjection} from "inversify-react";
import {useEffect, useState} from "react";
import {GetAllGroomersUseCase} from "@domain/usecases/employee/get-all-groomers-use-case";
import {EmployeeEntity} from "@domain/types/common/employee";


const useAllGroomers = () : EmployeeEntity[] => {
  const getAllGroomers = useInjection<GetAllGroomersUseCase>(GetAllGroomersUseCase);
  const [groomers, setGroomers] = useState<EmployeeEntity[]>([]);

  useEffect(() =>{
    getAllGroomers.call().then((response) => {
      setGroomers(response);
    });
  },[])
  groomers.sort((a, b) => a.name.localeCompare(b.name));

  return groomers;
}

export default useAllGroomers;
