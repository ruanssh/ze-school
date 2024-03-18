
import { Modal as ModalAntd } from 'antd';

export default function Modal({isModalOpen, handleOk, handleCancel, Tittle, Text})
{
    return(
        <ModalAntd title={Tittle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>{Text}</p>
        </ModalAntd>
    )
}