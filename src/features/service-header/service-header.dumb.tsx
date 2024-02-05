import { BiLeftArrowAlt } from 'react-icons/bi';
import Dropdown from '@components/book/dropdown/dropdown';
import './service-header.scss';

export interface ServiceHeaderDumbProps {
  selectable?: boolean;
  type: string;
  goBack: () => void;
  petNames: string[];
  handleChange: (index: number) => void;
  title: string;
  selectedPet?: string;
}

const ServiceHeaderDumb = ({
  goBack,
  type,
  selectable = true,
  petNames,
  handleChange,
  title,
  selectedPet
                           }:ServiceHeaderDumbProps) => {



  return <div className={`service-pet-row ${type.toLowerCase().replace(' ', '')}-row`}>
    <div className={"clickable"}>
      <BiLeftArrowAlt onClick={goBack} size={'35px'} />
    </div>
    <div className='service-title'>
      <h3 className={`${type.toLowerCase().replace(' ', '')}-heading`}>{type}</h3>
      <h1>{title}</h1>
    </div>
    {selectable &&
      <div className='dropdown-wrapper'>
        <Dropdown
          width='100%'

          onChange={handleChange}
          dropdownTitle={selectedPet ?? petNames[0]}
          dropdownList={petNames as string[]}
        />
      </div>
    }
  </div>;
}

export default ServiceHeaderDumb;
