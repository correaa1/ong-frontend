import React from 'react';
import { useParams,} from 'react-router-dom';
import Form from '../register/userRegister';
import {toast} from "react-toastify"; // Certifique-se de que o caminho está correto

const AddFamilyMemberPage = () => {
    const { id } = useParams(); // ID do usuário principal
    const handleSubmitForm = (formData) => {
        console.log('Formulário enviado com sucesso:', formData);
        // Exibir mensagem de sucesso
        toast.success('Familiar adicionado com sucesso!', {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const mainParent = false
    const disabledFields = mainParent ? [] : ['name', 'age']; // Lista de campos a serem desabilitados

    return (
        <div>
            <Form
                mainParent={mainParent}
                idMainParent={id}
                handleSubmitForm={handleSubmitForm}
                disabledFields={disabledFields}

            />
        </div>
    );
};

export default AddFamilyMemberPage;





