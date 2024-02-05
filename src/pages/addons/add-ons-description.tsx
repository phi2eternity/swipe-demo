import React from 'react'
import style from "./add-ons.module.scss";


export interface AddOnsDescriptionProps {
  text: string
}

const AddOnsDescription:React.FC<AddOnsDescriptionProps> = ({
  text
                                                            }) => {
    return (
        <div className={style.addOnsDescription}>
            <p >{text}</p>
        </div>
    )
}

export default AddOnsDescription
