import React from 'react';
import { DetalhesForm, DetalhesFormInput, DetalhesFormLabel, DetalhesFormOption, DetalhesFormSelect } from './input-boxes.styles';

const DetalhesInput = ({ value, label, type, dropdown, onChange }) => {

    const drawInput = () => {
        switch (type) {
            case "dropdown": {
                return(
                    <DetalhesFormSelect onChange={onChange} value={value}>
                        {
                            dropdown.map(_option => (
                                <DetalhesFormOption key={_option.toLowerCase()}>{_option}</DetalhesFormOption>
                            ))
                        }
                    </DetalhesFormSelect>
                )
            }
            default: {
                return <DetalhesFormInput onChange={onChange} value={value} type={type}></DetalhesFormInput>
            }
        }
    }

    return (
        <DetalhesForm>
            <DetalhesFormLabel>
                {label}
                {drawInput()}
            </DetalhesFormLabel>
        </DetalhesForm>
    )
};

export default DetalhesInput;